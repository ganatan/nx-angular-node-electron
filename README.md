# Nx Angular - Node - Electron Starter

<img src="./ui/ganatan-about-github.png" align="right" width="140" height="140" alt="ganatan logo">


## Objectifs du projet

-   Frontend Angular 20, Backend Node.js (TypeScript) et Desktop Electron
-   Monorepo Nx 
-   Intégration Angular → Electron
-   Backend TypeScript servant une API REST
-   Lint, tests unitaires, e2e, build, packaging Electron

---

**👉 English version available here** : [English](./README-en.md)

---

# 1. Installation

``` bash
git clone https://github.com/ganatan/nx-angular-node-electron.git
cd nx-angular-node-electron
npm install
```

------------------------------------------------------------------------

# 2. Configuration (.env)

    # FRONTEND
    MODE=html        # angular | html
    DEVTOOLS=false

-   MODE=html → Electron charge le mock HTML
-   MODE=angular → Electron charge le build Angular

------------------------------------------------------------------------

# 3. Tester Electron seul (frontend HTML mock)

Vérifier dans `.env` :

    MODE=html

Lancer Electron :

``` bash
npm run start:electron
```

Electron démarre avec le frontend HTML.

------------------------------------------------------------------------

# 4. Tester Frontend Angular seul (navigateur)

Mettre dans `.env` :

    MODE=angular

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

-   Le build Angular est généré dans `dist/frontend-angular/`.

Tester dans Electron :

``` bash
npm run start:electron
```

Electron charge maintenant Angular en local.

------------------------------------------------------------------------

# 6. Tester le backend Node/TypeScript

Démarrer le backend :

``` bash
npm run start:backend
```

Endpoints accessibles :

    http://localhost:3000/api/catalog/titles
    http://localhost:3000/api/inventory/items

------------------------------------------------------------------------

# 7. Tester Angular + Backend (mode dev)

Backend :

``` bash
npm run start:backend
```

Frontend Angular :

``` bash
npm run start:frontend
```

Angular (4200) consomme l'API backend (3000).

------------------------------------------------------------------------

# 8. Builder le backend

``` bash
npm run build:backend
```

Build généré dans :

    dist/backend-typescript/

------------------------------------------------------------------------

# 9. Build final : Packaging Electron

Builder le frontend :

``` bash
npm run build:frontend
```

Builder le backend :

``` bash
npm run build:backend
```

Builder Electron :

``` bash
npm run build:electron
```

Le binaire est généré dans :

    dist/electron/win-unpacked/GanatanElectronApp.exe

Lancement : l'app charge Angular dans Electron et appelle l'API backend
sur localhost:3000.

------------------------------------------------------------------------

# 10. Résumé rapide

  -----------------------------------------------------------------------
  Scénario                        Commandes
  ------------------------------- ---------------------------------------
  Electron + HTML mock            MODE=html → `npm run start:electron`

  Angular seul                    MODE=angular → `npm run start:frontend`

  Backend seul                    `npm run start:backend`

  Electron + Angular (build)      `npm run build:frontend` →
                                  `npm run start:electron`

  Version finale packagée         build front + build back +
                                  `npm run build:electron`
  -----------------------------------------------------------------------

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
