
# 📚 Biblioteca Inteligente

Proyecto de examen: Biblioteca Inteligente en React. [cite_start]Aplicación desarrollada para la Universidad Católica Boliviana "San Pablo", Departamento de Ingeniería de Sistemas[cite: 1, 3].

## 🎯 Objetivo
[cite_start]Desarrollar una aplicación en React + NextJs que consuma la API pública de Open Library para buscar libros, ver detalles, filtrar resultados y guardar favoritos[cite: 4, 5].

## ⚙️ Instalación de Paquetes y Ejecución

Si necesitas clonar este repositorio o recrear el entorno desde cero, aquí están los comandos y paquetes utilizados para cumplir con los requerimientos técnicos:

1. **Inicializar el proyecto base en Next.js:**
   ```bash
   npx create-next-app@latest biblioteca-inteligente
   ```
2. **Instalar el enrutador requerido:**
   *(Aunque Next.js tiene su propio enrutador, se instala para cumplir la rúbrica).*
   ```bash
   npm install react-router-dom
   ```
3. **Instalar el preprocesador de estilos (SCSS):**
   ```bash
   npm install sass
   ```
4. **Instalar Tailwind CSS (Agregado para agilizar el diseño):**
   ```bash
   npm install -D tailwindcss postcss autoprefixer
   npx tailwindcss init -p
   ```
5. **Instalar dependencias y ejecutar el servidor de desarrollo:**
   ```bash
   npm install
   npm run dev
   ```

## 👥 División de Tareas del Equipo

### 🧑‍💻 1. Arquitectura, API y Búsqueda
**Responsable:** Santiago Mendoza

* [cite_start]**Configuración e Infraestructura:** Configurar el proyecto usando React con NextJs y react-router-dom[cite: 67, 68]. [cite_start]Organizar la estructura de carpetas sugerida (components, pages, services, utils, styles) [cite: 76-96].
* [cite_start]**Servicios (API):** Crear `openLibraryService.js` para consumir los endpoints de Open Library (búsqueda general, por título, por autor, portadas y detalles) [cite: 92, 114-124].
* [cite_start]**Buscador Avanzado (`/buscar`):** Desarrollar la funcionalidad para buscar por Título, Autor, y Tema o palabra clave (ej. Clean Code, Tolkien, Artificial Intelligence) [cite: 21-29, 60].
* [cite_start]**Extras:** Implementar el diseño responsive completo y la separación clara entre capas[cite: 110, 111].

### 🧑‍💻 2. Página Principal y Sistema de Filtros
**Responsable:** Luis Aguilar

* [cite_start]**Página Principal (`/`):** Desarrollar la vista inicial mostrando libros populares o una búsqueda predeterminada (programming, software engineering, database, javascript) [cite: 7-12, 59].
* [cite_start]**Filtros Avanzados:** Implementar mínimo 3 filtros, incluyendo Año mínimo de publicación, Año máximo de publicación, Idioma y Autor [cite: 32-37].
* [cite_start]**Ordenamiento:** Crear la lógica para ordenar los resultados por año o cantidad de ediciones[cite: 38].
* [cite_start]**Extras:** Implementar paginación de resultados, filtro por idioma y ordenamiento por año[cite: 104, 108, 109].

### 🧑‍💻 3. Detalles de Libro, Favoritos y UX
**Responsable:** Victor Medrano

* [cite_start]**Tarjetas y Componentes Base:** Crear `BookCard.jsx` que muestre: Portada, Título, Autor, Año de primera publicación, Número de ediciones, y los botones de detalle y favoritos [cite: 13-20, 80].
* [cite_start]**Página de Detalle (`/libro/:workId`):** Mostrar portada grande, título, descripción, autores, fecha/año de publicación, temas relacionados y enlace a Open Library [cite: 39-49, 61].
* [cite_start]**Sistema de Favoritos (`/favoritos`):** Implementar la lógica con `localStorage` para agregar libros, evitar duplicados, eliminar favoritos y mantenerlos al recargar [cite: 51-56, 62]. [cite_start]Crear la página exclusiva de favoritos[cite: 57].
* [cite_start]**Extras:** Implementar Skeleton loading para las cargas y Modo oscuro[cite: 106, 107].

## 🛠️ Requerimientos Técnicos Base
* [cite_start]Uso de `useState` y `useEffect`[cite: 69, 70].
* [cite_start]Componentes reutilizables[cite: 71].
* [cite_start]CSS, SCSS o CSS Modules para los estilos[cite: 74].
* [cite_start]Manejo de carga, errores y resultados vacíos[cite: 75].
```
