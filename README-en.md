# Nx Angular - Node - Electron Starter

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

# Project Architecture

-   **Frontend Angular**: standalone or embedded inside Electron
-   **Backend Node.js**: standalone REST API or launched by Electron
-   **Electron**: desktop shell assembling frontend + backend
-   **Nx monorepo**: three separate apps (frontend, backend, electron)
-   **DDD Architecture**: isolated business contexts (libs **domain**,
    **application**, **infrastructure**, **contract**)
- **Tooling**: ESLint for code quality, esbuild for Angular builds, Playwright for end-to-end testing  
- **Scripts**: `generate:structure` (via ts-node) to automatically build and update the project directory tree  


---

**👉 Version française disponible ici** : [Français](./README.md)

---

# 1. Installation

``` bash
git clone https://github.com/ganatan/nx-angular-node-electron.git
cd nx-angular-node-electron
npm install
```

------------------------------------------------------------------------

# 2. Default Configuration (.env)

``` env
FRONTEND_ENABLED=false
BACKEND_ENABLED=false
DEVTOOLS_ENABLED=false
```

### Meaning

  `FRONTEND_ENABLED=true`                         Electron loads Angular
                                                  (`dist/apps/frontend-angular/browser/index.html`)

  `FRONTEND_ENABLED=false`                        Electron loads the HTML mock
                                                  (`apps/electron/src/renderer/index.html`)

  `BACKEND_ENABLED=true`                          Electron launches the TypeScript backend

  `DEVTOOLS_ENABLED=true`                         DevTools enabled

------------------------------------------------------------------------

# 3. Test Electron with HTML Mock

``` env
FRONTEND_ENABLED=false
BACKEND_ENABLED=false
```

``` bash
npm run start:electron
```

------------------------------------------------------------------------

# 4. Test Angular in Browser

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=false
```

``` bash
npm run start:frontend
```

Open:

    http://localhost:4200

------------------------------------------------------------------------

# 5. Build Angular for Electron

``` bash
npm run build:frontend
```

Generated in:

    dist/apps/frontend-angular/browser/

Test:

``` bash
npm run start:electron
```

------------------------------------------------------------------------

# 6. Test the Backend

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=true
```

``` bash
npm run start:backend
```

Endpoints:

    http://localhost:3000/api/catalog/titles
    http://localhost:3000/api/inventory/items

------------------------------------------------------------------------

# 7. Test Angular + Backend (dev mode)

``` bash
npm run start:backend
npm run start:frontend
```

------------------------------------------------------------------------

# 8. Build Backend

``` bash
npm run build:backend
```

Output:

    dist/apps/backend-typescript/

------------------------------------------------------------------------

# 9. Final Build: Electron Packaging

``` bash
npm run build:frontend
npm run build:backend
npm run build:electron
```

Executable:

    dist/apps/electron/win-unpacked/GanatanElectronApp.exe

------------------------------------------------------------------------

## 🧱 Overview

-   Electron (CJS)\
-   Angular 20\
-   Node TypeScript API\
-   Nx orchestration

## 🧬 Structure

    nx-angular-node-electron/
    ├── apps/
    │   ├── backend-typescript/
    │   ├── backend-typescript-e2e/
    │   ├── electron/
    │   ├── electron-e2e/
    │   ├── frontend-angular/
    │   └── frontend-angular-e2e/
    ├── tools/scripts/
    ├── mock/
    └── README.md

## 🧩 Applications

### Angular

Serve :

    nx serve frontend-angular

Tests :

    nx test frontend-angular

  # ⚠️ Playwright e2e prerequisite
    # Playwright requires installed browsers (Chromium/Firefox/WebKit)
    # Run this once before the first test:
    #     npx playwright install
    # or lighter:
    #     npx playwright install chromium

    nx e2e frontend-angular-e2e


### Backend --- Node TypeScript

Serve :

    nx serve backend-typescript

Tests :

    nx test backend-typescript
    nx e2e backend-typescript-e2e

### Electron --- Process Main CJS

    nx build frontend-angular --base-href ./
    nx build backend-typescript

Serve :

    npx electron apps/electron/src/main.js


## 🏗️ Build & Packaging

    nx build frontend-angular --base-href ./    
    nx build backend-typescript
    npx electron-builder

------------------------------------------------------------------------

## Windows PowerShell (Admin)

1.  Press **Win**\
2.  Type **powershell**\
3.  Right‑click → Run as Administrator

Then:

``` bash
npx electron-builder
```

---

## 👤 Author

- **Danny** – [www.ganatan.com](https://www.ganatan.com)

---
