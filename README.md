# Gerard Alba — Portfolio

Web: **https://gerardalbadp.com**

Vue 3 + Vue CLI. Publicado con **GitHub Pages** (rama `gh-pages`).

---

## 🚀 Subir a producción

```bash
git checkout main
git pull
npm install          # solo la primera vez o si cambian dependencias
npm run deploy
```

Y ya está. En 1–2 minutos los cambios se ven en gerardalbadp.com
(si no los ves, recarga sin caché: `Cmd + Shift + R`).

### Qué hace `npm run deploy`
1. Compila la web en la carpeta `dist/`.
2. Sube `dist/` a la rama `gh-pages` de GitHub.
3. GitHub Pages publica esa rama en el dominio.

> ⚠️ `git push` **no publica** la web: solo guarda el código.
> Para publicar siempre hay que ejecutar `npm run deploy`.

### Antes de publicar (recomendado)
```bash
npm run serve        # abre http://localhost:8080 y revisa que todo va bien
npm run lint         # comprueba errores en el código
```

---

## ✏️ Cambios habituales

| Quiero… | Dónde |
|---|---|
| Añadir / quitar un vídeo | `src/data/projects.js` → lista `PROJECTS` (ID de Vimeo + categorías) |
| Cambiar el showreel de la portada | `src/data/projects.js` → `REEL_ID` |
| Cambiar email, teléfono, redes | `src/data/projects.js` → `CONTACT` |
| Cambiar el CV | Sustituir `public/gerardalba_cv.pdf` (mismo nombre) |
| Cambiar portadas de categorías | `src/assets/img/*.jpg` |
| Textos de "About" | `src/components/home/AboutBlock.vue` |

El título, la duración y la miniatura de cada vídeo se cargan solos desde Vimeo.

---

## 🧩 Notas técnicas

- **Dominio:** lo define `public/CNAME`. No lo borres o GitHub Pages perderá `gerardalbadp.com`.
- **Ramas de diseño:** `design-1` (original), `design-2` (pulido), `design-3` (actual, en `main`).
  Para volver a un diseño anterior: `git checkout design-1 && npm run deploy`
  (y después `git checkout main` para seguir trabajando).
- **Si `npm run deploy` falla por permisos:** hay que estar logueado en GitHub con una cuenta
  con acceso al repo `guillemalba/gerardalbadp`.
