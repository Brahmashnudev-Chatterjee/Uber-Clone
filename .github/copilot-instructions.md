# AI Coding Assistant Instructions for Uber-Clone

This repository contains two decoupled sub‑projects: a **Node/Express backend** and a **React/Vite frontend**. Work on either side generally involves adding new API endpoints or pages, and the two halves communicate over simple REST/JSON. Below are the conventions and workflows that make the codebase consistent.

---

## Big Picture Architecture

1. **Backend (`Backend/`)**
   - Express application (`app.js`) wrapped by `server.js`.
   - Routes live under `routes/` and delegate to corresponding controllers in `controllers/`.
   - Business logic is minimal; controllers perform validation and call services in `services/`.
   - Data access is handled by Mongoose models in `models/` (e.g. `user.model.js`, `captain.model.js`).
   - Authentication uses JWTs stored in cookies or `Authorization` header. Tokens are created by model methods (`generateAuthToken`) and black‑listed on logout (see `blacklistToken.model.js`).
   - `middlewares/auth.middleware.js` exposes `authUser` and `authCaptain` which inspect the token, check the blacklist, verify it with `JWT_SECRET` and attach `req.user`/`req.captain`.
   - Environment variables are loaded with `dotenv` (look for `.env` in `Backend/` or workspace root):
     - `DB_CONNECT` – MongoDB connection string
     - `JWT_SECRET` – secret used by `jsonwebtoken`
     - `NODE_ENV` may toggle cookie `secure` flag
   - The detailed API documentation is in `Backend/README.md`; use it as a reference when creating or modifying endpoints.

2. **Frontend (`frontend/`)**
   - A Vite‑powered React application using ESM modules (`"type": "module"` in `package.json`).
   - Pages live in `src/pages/` and are routed via `react-router-dom` (currently only `Home`, login/signup placeholders).
   - Styling is done with Tailwind utility classes; configuration in `tailwind.config.js`.
   - No network layer yet; any new feature calling the backend should add a fetch/axios helper and call `http://localhost:3000/<route>` (or use relative URLs when proxying).
   - Run development server with `npm run dev` from `frontend/`.

3. **Cross‑component communication**
   - The front end will send/receive JSON objects shaped like the schemas in the backend models (e.g. `{ fullname: { firstname, lastname }, email, password }`).
   - Tokens are returned by login/register and set as cookies; front end should store/use them accordingly for authenticated requests.

---

## Developer Workflows & Commands

- **Backend startup**:
  ```bash
  cd Backend
  npm install            # fresh clone
  # create a .env file with DB_CONNECT and JWT_SECRET
  node server.js         # or nodemon server.js if added manually
  ```
- **Frontend startup**:
  ```bash
  cd frontend
  npm install
  npm run dev
  ```
- **Linting**: Only the frontend has ESLint configured (`npm run lint`).
- **Building**: `cd frontend && npm run build` generates static assets under `dist/`.
- There are no tests currently; do **not** assume a test framework when adding code unless you add one yourself.

---

## Coding Conventions & Patterns

- Use **CommonJS** (`require/module.exports`) in the backend; **ESM** (`import/export`) in the frontend.
- File names are lowercase with dashes, separated by role:
  - `*.route.js`, `*.controller.js`, `*.service.js`, `*.model.js`, `*.middleware.js`
- Controllers always:
  1. call `validationResult(req)` (see `express-validator` usage in routes).
  2. perform early `return res.status(...).json(...)` on validation or auth errors.
  3. call service functions for DB changes when available.
  4. set cookies on login (`res.cookie('token', token, { httpOnly: true, secure: ..., maxAge: 3600000 })`).
- Services are thin wrappers around models; when adding new entities stick to this pattern unless logic justifies collapsing into the controller.
- Models define Mongoose schemas with in‑line validation rules and add any helper methods (`hashPassword`, `comparePassword`, `generateAuthToken`). Use `statics` for class methods, `methods` for instance methods.
- Blacklist tokens expire automatically via a TTL index defined in the schema (`expires: 86400`). Do not manually clean them.
- Middlewares for auth expect a token in either `req.cookies.token` or `Authorization: Bearer <token>`; they check the blacklist then verify with `jwt.verify`.
- When extending user/captain schemas, update both the Mongoose schema and the corresponding route validation rules.
- Error responses follow these shapes:
  - Validation errors: `{ errors: [{ msg, path, ... }] }` from `express-validator`.
  - Authentication/authorization failures: `{ error: '...' }` with 401 or 400 statuses.

---

## Project‑specific Notes

- The backend does **not** currently include a start script or development tools like `nodemon`. Adding one is acceptable but update README accordingly.
- `socketId`/`SocketID` fields exist in models for future real‑time features; they are optional and unused today.
- Captain documents include a nested `vehicle` object and an optional `location` object. `vehicle.vehicleType` must be one of `'car'`, `'motocycle'`, or `'auto'`.
- The backend README file is the authoritative source for request/response formats; run `grep` there when unsure which fields an endpoint expects.
- The frontend currently uses absolute Tailwind classes; avoid global CSS unless necessary.
- There is **no shared workspace configuration** between backend and frontend; treat them as separate projects.

---

## When Editing or Adding Code

1. **Identify which side of the application** you're touching (backend vs frontend). Look for the relevant directory.
2. **Follow existing patterns**:
   - Add a new API route: create a new file or extend an existing one under `Backend/routes/`, write validations with `express-validator`, point to a controller.
   - Controller logic: replicate structure shown in existing controllers, handle validation results first, then call service/model.
   - Frontend page: create a new React component under `src/pages/` and add a route in `src/main.jsx` or wherever the router is configured.
3. **Test manually** by running both servers and using curl/Postman/your front end.
4. **Update documentation**: when adding or changing an API, edit `Backend/README.md` with request/response examples.
5. **Environment variables** must be referenced via `process.env` and documented in README; do not hard‑code secrets.

---

> ⚠️ There are no automated tests; regression prevention relies on manual testing and careful reading of related files.

If anything is unclear or if additional patterns emerge as you work, let me know so I can refine these instructions.