# Ada Video (useRef) — International README (EN/ES)

> **Goal / Objetivo**: Implement a simple React video player that toggles **Play/Pause** using `useRef` and `useState`, passing tests with Vitest and the ADA client.
>
> **Repo destino**: `https://github.com/AlejoCNYT/Ada-video`

---

## 1) What you will build / Qué vas a construir

- A React component **`App`** (named export) that:
  - Imports the video file from `public/ada-video.mp4`.
  - Uses `useRef` to control the `<video>` element.
  - Uses `useState` to show a button whose text toggles between **Play** and **Pause**.
  - Calls `.play()` and `.pause()` via the ref.
  - Updates state on `onPlay`/`onPause`.
- Tests are provided by ADA and run with `vitest`.

---

## 2) Prerequisites / Prerrequisitos

- **Node.js** 18.x o 20.x recomendado (Node 22 también funciona; verás un *warning* deprecado `DEP0180` que no afecta).
- **Git**.
- **Package manager**: `npm` (viene con Node).
- Windows/macOS/Linux.
- En Windows, se recomienda **PowerShell** para `ada-client.exe`.

---

## 3) Project setup / Configuración del proyecto

### Clone the assignments repository (original ADA) / Clonar el repositorio de asignaciones (ADA)
```bash
# Git Bash (Windows), macOS, Linux
cd "$HOME/Downloads"
git clone https://github.com/ada-school/assignments-micro-course-hooks-intermediate.git
cd assignments-micro-course-hooks-intermediate
git checkout useRef
npm install
```

### Run dev server / Levantar el servidor de desarrollo
```bash
npm run dev
# Abre la URL que aparece en la consola
```

### Start ADA client session (login) / Iniciar sesión con ADA client
> **Windows (PowerShell)** recomendado para `ada-client.exe`:
```powershell
.\ada-client.exe start "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```
> **macOS**:
```bash
./ada-client start "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```
> **Linux**:
```bash
./ada-client-linux start "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```

### Run tests / Ejecutar pruebas
```bash
npm run ada-test
```

---

## 4) Implementation (App.jsx) / Implementación (App.jsx)

> **Important / Importante**: The tests import `App` as a **named export**: `import { App } from '../App'`. Do **not** default-export here.
>
> **Also** keep the `data-testid="video"` attribute.

```jsx
// src/App.jsx
import { useRef, useState } from "react";
import adaVideo from "../public/ada-video.mp4";

export function App() {
  const ref = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    const nextIsPlaying = !isPlaying;
    setIsPlaying(nextIsPlaying);
    if (!ref.current) return;

    if (nextIsPlaying) {
      const p = ref.current.play();
      if (p && typeof p.catch === "function") p.catch(() => {}); // silence autoplay error
    } else {
      ref.current.pause();
    }
  };

  return (
    <div style={{ display: "grid", gap: 12, placeItems: "start", padding: 16 }}>
      <video
        ref={ref}
        data-testid="video"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        width="480"
      >
        <source src={adaVideo} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <button onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"}
      </button>
    </div>
  );
}
```

---

## 5) Submit to ADA / Enviar a ADA

- **Windows (PowerShell)**:
```powershell
.\ada-client.exe submit "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```
- **macOS**:
```bash
./ada-client submit "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```
- **Linux**:
```bash
./ada-client-linux submit "https://eci.learn.ada-school.org/cohorts/6899f26ac3afb25ec7ead6ca/assignments/66bd6e6f20f6021890af1a84"
```

---

## 6) Publish to your GitHub repo / Publicar en tu repo GitHub

**Target repo / Repo destino**: `https://github.com/AlejoCNYT/Ada-video`

### Option A (recommended): push a feature branch and open a PR / Empuja una rama y abre PR
> Esto evita conflictos si el remoto ya tiene un commit inicial (README).

```bash
# From the project root / Desde la raíz del proyecto
# (If coming from an existing clone, keep its Git history or re-init as you prefer)

# Ensure Git trusts this directory on Windows (optional fix for "dubious ownership")
git config --global --add safe.directory "$PWD"

# Initialize (only if this folder is not a git repo)
# git init

# Create a clean branch with your solution
git checkout -b feature/useRef-video

# Stage and commit
git add -A
git commit -m "feat: video player with useRef (Play/Pause) + tests green + README"

# Point to your repo
git remote remove origin 2>/dev/null || true
git remote add origin https://github.com/AlejoCNYT/Ada-video.git

# Push the branch
git push -u origin feature/useRef-video

# Open a Pull Request on GitHub UI and merge it into main
# (or use gh cli if you have it installed)
```

### Option B: push directly to main / Empujar directo a main
> Si el remoto está **vacío** o si aceptas forzar (¡con cuidado!).

```bash
# Ensure branch is main and up to date
git checkout -B main

# If the remote has commits (like a README created online), first try to integrate:
git pull --rebase origin main || git pull origin main --allow-unrelated-histories

# Then push normally
git push -u origin main

# If you want to force overwrite remote (dangerous):
# git push -u origin main --force
```

### Local merge via CLI (after pushing a feature branch) / Unir localmente por CLI
```bash
# Make sure main is updated / Asegúrate de tener main actualizado
git checkout main
git pull --ff-only origin main

# Merge the feature branch with fast-forward if possible
git merge --ff-only feature/useRef-video

# Push the merged result
git push origin main
```

---

## 7) Troubleshooting / Solución de problemas

- **Warning DEP0180 (fs.Stats deprecado)**: solo es un *warning* de Node 22 y **no afecta** las pruebas.
- **Element type is invalid (undefined)**:
  - Asegúrate de **exportar con nombre**: `export function App() { ... }` (no `export default`).
  - El test importa `import { App } from '../App'` y `main.jsx` hace `import { App } from './App.jsx'`.
- **Transform failed / Unexpected "..."**:
  - Elimina cualquier placeholder `...` (por ejemplo en `<source src={...} />`).
  - Debe ser `src={adaVideo}`.
- **Limpiar cachés de Vite/Vitest**:
```bash
rm -rf node_modules/.vite .vite .vitest 2>/dev/null || true
npm install
```
- **Windows PowerShell (equivalente limpiar cachés)**:
```powershell
Remove-Item -Recurse -Force .\node_modules\.vite, .\.vite, .\.vitest -ErrorAction SilentlyContinue
npm install
```

---

## 8) Project scripts / Scripts del proyecto

- `npm run dev` — inicia Vite dev server.
- `npm run ada-test` — corre las pruebas de ADA (Vitest).
- `npm run build` — build de Vite (si se requiere).

---

## 9) License / Licencia

- Uso académico/educativo ligado al curso ADA. Ver términos del curso y/o repositorio original.
