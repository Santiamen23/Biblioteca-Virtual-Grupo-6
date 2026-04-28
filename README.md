# 📚 Biblioteca Inteligente

Proyecto de examen: Biblioteca Inteligente en React. Aplicación desarrollada para la Universidad Católica Boliviana "San Pablo", Departamento de Ingeniería de Sistemas.

## 🎯 Objetivo
Desarrollar una aplicación en React + NextJs que consuma la API pública de Open Library para buscar libros, ver detalles, filtrar resultados y guardar favoritos.

## ⚙️ Instalación y Ejecución

1. **Inicializar el proyecto base en Next.js:**
   ```bash
   npx create-next-app@latest biblioteca-inteligente
   ```
2. **Instalar dependencias necesarias:**
   ```bash
   npm install react-router-dom sass
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
3. **Ejecutar el servidor local:**
   ```bash
   npm install
   npm run dev
   ```

## 👥 División de Tareas (Por Funcionalidades Independientes)

Para maximizar la eficiencia y evitar bloqueos entre los miembros, el proyecto se ha dividido de forma vertical. Cada integrante es responsable del diseño, la lógica y el consumo de API **exclusivo** de sus rutas asignadas.

### 🧑‍💻 1. Módulo de Búsqueda y Filtros
**Responsable:** Santiago Mendoza

**Ruta asignada:** `/buscar`
**Funciones principales:**
* **Buscador Avanzado:** Desarrollar `Search.jsx` y `SearchBar.jsx` permitiendo buscar por Título, Autor y Tema/Palabra clave.
* **Sistema de Filtros (`FilterPanel.jsx`):** Implementar filtros por Año mínimo/máximo de publicación, Idioma y Autor.
* **API Propia:** Consumir de forma independiente los endpoints de búsqueda (`search.json?title=...`, `search.json?author=...`).
* **Extras de esta sección:** Ordenamiento por año o ediciones y paginación de resultados.

### 🧑‍💻 2. Módulo Core y Página Principal
**Responsable:** Luis Aguilar

**Rutas asignadas:** `/` y `/acerca`
**Funciones principales:**
* **Interfaz Base:** Desarrollar el `Navbar.jsx` y el layout principal que envolverá la aplicación.
* **Componente Compartido (`BookCard.jsx`):** Construir la tarjeta que mostrará la portada, título, autor, año y ediciones. *(Nota: Santiago y Victor usarán este componente en sus listas).*
* **Página de Inicio (`Home.jsx`):** Consumir la API (`search.json?q=...`) para mostrar libros populares o predeterminados (programming, database, etc.).
* **Manejo de Estados:** Crear los componentes universales `Loading.jsx` (Skeleton) y `ErrorMessage.jsx`.

### 🧑‍💻 3. Módulo de Detalles y Persistencia (Favoritos)
**Responsable:** Victor Medrano

**Rutas asignadas:** `/libro/:workId` y `/favoritos`
**Funciones principales:**
* **Detalle de Obra (`BookDetail.jsx`):** Consumir independientemente la API de obras (`/works/OL...json`) y Covers API para mostrar toda la información detallada del libro y temas relacionados.
* **Motor de Favoritos (`storage.js`):** Desarrollar la lógica de `localStorage` para guardar, eliminar, evitar duplicados y persistir datos.
* **Vista de Favoritos (`Favorites.jsx`):** Mostrar la lista de libros guardados leyendo el almacenamiento local.
* **Extras de esta sección:** Implementar la lógica general del Modo Oscuro de la aplicación.

## 🛠️ Requerimientos Técnicos Base
* Uso estricto de `useState` y `useEffect`.
* Componentes funcionales y reutilizables.
* CSS, SCSS o CSS Modules / Tailwind para estilos (Diseño responsivo).
* Control de estados de carga, errores y resultados vacíos en todas las pantallas.
```
