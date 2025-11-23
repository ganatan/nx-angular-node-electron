# Nx Angular - Node - Electron Starter

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

# Architecture du projet

-   **Frontend Angular** : autonome ou embarqué dans Electron\
-   **Backend Node.js** : API REST seule ou lancée par Electron\
-   **Electron** : shell desktop qui assemble frontend + backend\
-   **Monorepo Nx** : trois apps séparées (frontend, backend, electron)\
-   Build, tests, lint, e2e : indépendants et combinables\
-   **Architecture DDD** : contexts métier isolés (libs **domain**,
    **application**, **infrastructure**, **contract**)

# 1. Installation

``` bash
git clone https://github.com/ganatan/nx-angular-node-electron.git
cd nx-angular-node-electron
npm install
```

# 2. Fichier de Configuration (.env) par défaut

``` env
FRONTEND_ENABLED=false
BACKEND_ENABLED=false
DEVTOOLS_ENABLED=false
```

### Signification

  ---------------------------------------------------------------------------------------------
  Variable                                  Effet
  ----------------------------------------- ---------------------------------------------------
  `FRONTEND_ENABLED=true`                   Electron charge Angular
                                            (`dist/apps/frontend-angular/browser/index.html`)

  `FRONTEND_ENABLED=false`                  Electron charge le mock HTML
                                            (`apps/electron/src/renderer/index.html`)

  `BACKEND_ENABLED=true`                    Electron lance le backend TypeScript

  `DEVTOOLS_ENABLED=true`                   DevTools ouverts (mode development)
  
  ---------------------------------------------------------------------------------------------

# 3. Tester Electron en mode HTML mock

``` env
FRONTEND_ENABLED=false
BACKEND_ENABLED=false
```

``` bash
npm run start:electron
```

Electron démarre avec le mock HTML.

# 4. Tester le frontend Angular (navigateur)

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=false
```

``` bash
npm run start:frontend
```

http://localhost:4200

# 5. Builder le frontend Angular pour Electron

``` bash
npm run build:frontend
```

Build généré dans :

    dist/apps/frontend-angular/browser/

Puis :

``` bash
npm run start:electron
```

# 6. Tester le backend Node/TypeScript

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=true
```

``` bash
npm run start:backend
```

Endpoints :

    http://localhost:3000/api/catalog/titles
    http://localhost:3000/api/inventory/items

# 7. Tester Angular + Backend (mode dev)

Backend :

``` bash
npm run start:backend
```

Frontend :

``` bash
npm run start:frontend
```

# 8. Builder le backend

``` bash
npm run build:backend
```

Généré dans :

    dist/apps/backend-typescript/

# 9. Build final : Packaging Electron

``` bash
npm run build:frontend
npm run build:backend
npm run build:electron
```

Executable :

    dist/apps/electron/win-unpacked/GanatanElectronApp.exe

# 🧱 Vue d'ensemble

Monorepo combinant : - Electron (CJS) - Angular 20 - Node TypeScript -
Nx

# 🧬 Structure du projet

    nx-angular-node-electron/
    ├── apps/
    │   ├── backend-typescript/
    │   ├── backend-typescript-e2e/
    │   ├── electron/
    │   ├── electron-e2e/
    │   ├── frontend-angular/
    │   └── frontend-angular-e2e/
    ├── tools/scripts/generate-project-structure.ts
    ├── mock/
    └── README.md

# 🧩 Applications

### Frontend --- Angular 20

    nx serve frontend-angular
    nx test frontend-angular
    nx e2e frontend-angular-e2e

### Backend --- Node TypeScript

    nx serve backend-typescript
    nx test backend-typescript
    nx e2e backend-typescript-e2e

### Electron --- Process Main CJS

    nx serve electron

# 🧪 Tests

    nx test <app>
    nx e2e <app>

# ⚙️ Développement

    nx run-many -t serve -p frontend-angular backend-typescript electron

# 🏗️ Build & Packaging

    nx build frontend-angular
    nx build backend-typescript
    nx build electron
    npx electron-builder

# PowerShell (Windows)

Lancer en mode administrateur :

``` bash
npx electron-builder
```

# 🔧 Scripts Nx

  Commande   Description
  ---------- ------------------
  nx serve   Démarrer une app
  nx build   Compiler
  nx test    Tests unitaires
  nx e2e     Tests end-to-end

# 🏛️ Architecture

Angular (renderer) → Backend TS (API) → Electron main (CJS)

# 👤 Auteur & Licence

Auteur : Danny --- https://www.ganatan.com\
Licence : MIT
