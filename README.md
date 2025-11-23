# Nx Angular -- Node -- Electron Starter

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">

## Objectifs du projet

-   Frontend Angular 20 intégré dans une app Desktop Electron
-   Backend Node.js (TypeScript) exposant une API REST
-   Monorepo Nx
-   Build Angular + Backend + Electron
-   Tests, lint, e2e, packaging final

------------------------------------------------------------------------

# 1. Installation

``` bash
git clone https://github.com/ganatan/nx-angular-node-electron.git
cd nx-angular-node-electron
npm install
```

------------------------------------------------------------------------

# 2. Configuration (.env)

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=true
DEVTOOLS_ENABLED=false
```

### Signification

  -------------------------------------------------------------------------------------------
  Variable                                Effet
  --------------------------------------- ---------------------------------------------------
  `FRONTEND_ENABLED=true`                 Electron charge Angular
                                          (`dist/apps/frontend-angular/browser/index.html`)

  `FRONTEND_ENABLED=false`                Electron charge le mock HTML
                                          (`apps/electron/src/renderer/index.html`)

  `BACKEND_ENABLED=true`                  Electron lance le backend TypeScript

  `DEVTOOLS_ENABLED=true`                 DevTools ouverts (uniquement en
                                          `NODE_ENV=development`)

------------------------------------------------------------------------

# 3. Tester Electron en mode HTML mock

Placer :

``` env
FRONTEND_ENABLED=false
BACKEND_ENABLED=false
```

Lancer :

``` bash
npm run start:electron
```

Electron démarre avec le mock HTML.

------------------------------------------------------------------------

# 4. Tester le frontend Angular (navigateur)

Placer :

``` env
FRONTEND_ENABLED=true
BACKEND_ENABLED=false
```

Démarrer Angular :

``` bash
npm run start:frontend
```

Ouvrir :

    http://localhost:4200

------------------------------------------------------------------------

# 5. Builder le frontend Angular pour Electron

``` bash
npm run build:frontend
```

Le build est généré dans :

    dist/apps/frontend-angular/browser/

Tester dans Electron :

``` bash
npm run start:electron
```

------------------------------------------------------------------------

# 6. Tester le backend Node/TypeScript

``` bash
npm run start:backend
```

Endpoints :

    http://localhost:3000/api/catalog/titles
    http://localhost:3000/api/inventory/items

------------------------------------------------------------------------

# 7. Tester Angular + Backend (mode dev)

Backend :

``` bash
npm run start:backend
```

Frontend :

``` bash
npm run start:frontend
```

Angular appelle l'API backend en local.

------------------------------------------------------------------------

# 8. Builder le backend

``` bash
npm run build:backend
```

Build généré dans :

    dist/apps/backend-typescript/

------------------------------------------------------------------------

# 9. Build final : Packaging Electron

Builder Angular :

``` bash
npm run build:frontend
```

Builder backend :

``` bash
npm run build:backend
```

Builder Electron :

``` bash
npm run build:electron
```

Exécutable généré :

    dist/apps/electron/win-unpacked/GanatanElectronApp.exe

L'application charge Angular dans Electron et utilise l'API backend
locale.


------------------------------------------------------------------------

## 🧱 Vue d’ensemble

Monorepo combinant:
- Desktop : Electron (CommonJS)
- Web : Angular 20
- API locale : Node TypeScript
- Orchestration Nx

## 🧬 Structure du projet

```
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
```

## 🧩 Applications

### Frontend — Angular 20
Serve:
```
nx serve frontend-angular
```

Tests:
```
nx test frontend-angular
nx e2e frontend-angular-e2e
```

### Backend — Node TypeScript
Serve:
```
nx serve backend-typescript
```

Tests:
```
nx test backend-typescript
nx e2e backend-typescript-e2e
```

### Electron — Process Main CJS
Serve:
```
nx serve electron
```

## 🧪 Tests

```
nx test <app>
nx e2e <app>
```

## ⚙️ Développement

```
nx run-many -t serve -p frontend-angular backend-typescript electron
```

## 🏗️ Build & Packaging

```
nx build frontend-angular
nx build backend-typescript
nx build electron
npx electron-builder
```

---

## Exécuter PowerShell en mode Administrateur (Windows)

Certaines opérations (symlinks, build Electron, accès système) nécessitent un terminal avec élévation de privilèges.  
Pour ouvrir PowerShell avec les droits administrateur :

1. Appuyer sur **Win**
2. Taper **powershell**
3. Faire un clic droit sur **Windows PowerShell**
4. Sélectionner **Exécuter en tant qu’administrateur**

Puis exécuter :

```bash
npx electron-builder
```

---

## 🔧 Scripts Nx

| Commande | Description |
|----------|-------------|
| nx serve | Démarrer une app |
| nx build | Compiler |
| nx test | Tests unitaires |
| nx e2e | Tests end-to-end |

## 🏛️ Architecture

Angular (renderer) → Backend TS (API) → Electron main (CJS)

## 👤 Auteur & Licence

Auteur : Danny — https://www.ganatan.com  
Licence : MIT
