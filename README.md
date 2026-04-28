```markdown
# 📚 Biblioteca Inteligente

[cite_start]Proyecto de examen: Biblioteca Inteligente en React para la asignatura de Ingeniería de Sistemas en la Universidad Católica Boliviana "San Pablo"[cite: 1, 3]. [cite_start]Esta aplicación web consumirá la API pública de Open Library para buscar libros, ver detalles, filtrar resultados y guardar favoritos[cite: 5].

## 🚀 Tecnologías Utilizadas

* [cite_start]**Framework Base:** React con NextJs[cite: 67].
* [cite_start]**Enrutamiento:** `react-router-dom`[cite: 68].
* [cite_start]**Estilos:** CSS, SCSS o CSS Modules (con soporte para diseño responsive completo)[cite: 74, 110].
* [cite_start]**Estado y Ciclo de vida:** `useState` y `useEffect`[cite: 69, 70].
* [cite_start]**Almacenamiento Local:** `localStorage`[cite: 73].
* [cite_start]**Consumo de API:** Endpoints oficiales de Open Library y Covers API[cite: 112, 113].

---

## ⚙️ Instalación y Ejecución Local

Para correr este proyecto en tu entorno local, sigue estos pasos:

1. **Clonar el repositorio:**
   ```bash
   git clone [https://github.com/TU_USUARIO/biblioteca-inteligente.git](https://github.com/TU_USUARIO/biblioteca-inteligente.git)
   cd biblioteca-inteligente
   ```
2. **Instalar dependencias:**
   ```bash
   npm install
   ```
3. **Ejecutar el servidor de desarrollo:**
   ```bash
   npm run dev
   ```

---

## 👥 División de Tareas y Responsabilidades

Para asegurar el éxito del proyecto y cumplir con todos los requerimientos obligatorios y extras, el trabajo se ha dividido en tres módulos. 

### 🧑‍💻 1. Arquitectura, Conexión API y Estado Global
**Responsable:** Santiago Mendoza

[cite_start]**Descripción:** Encargado de la estructura base, servicios separados para API y manejo de carga, errores y resultados vacíos[cite: 72, 75].

**Tareas específicas:**
* [cite_start]**Configuración del Entorno:** Creación de componentes reutilizables y separación clara entre services, pages, components y utils[cite: 71, 111].
* [cite_start]**Capa de Servicios (`openLibraryService.js`):** Crear funciones asíncronas para buscar libros (`q=harry+potter`), por título (`title=clean+code`), por autor (`author=tolkien`), obtener detalle de obra y obtener portada[cite: 92, 115, 116, 118, 120, 122, 124].
* [cite_start]**Manejo de Estados Globales:** Desarrollar los componentes `Loading.jsx` y `ErrorMessage.jsx`[cite: 83, 84].
* [cite_start]**Extra - Paginación:** Implementar lógica de paginación de resultados[cite: 104].
* [cite_start]**Extra - Skeleton Loading:** Desarrollar la carga tipo esqueleto para mejorar la UX[cite: 107].

### 🧑‍💻 2. Buscador Avanzado, Filtros y Página Principal
**Responsable:** Luis Aguilar

[cite_start]**Descripción:** Encargado de las rutas principales `/` y `/buscar`[cite: 59, 60].

**Tareas específicas:**
* [cite_start]**Página Principal (`Home.jsx`):** Mostrar libros populares o una búsqueda inicial predeterminada (ej. programming, software engineering, database o javascript)[cite: 7, 8, 9, 10, 11, 12, 86].
* [cite_start]**Buscador Avanzado (`Search.jsx` & `SearchBar.jsx`):** Implementar la búsqueda por Título, Autor o Tema/palabra clave (Ejemplo: Clean Code, Tolkien, Artificial Intelligence, Databases)[cite: 21, 22, 23, 24, 25, 26, 27, 28, 29, 31, 81, 87].
* [cite_start]**Sistema de Filtros (`FilterPanel.jsx`):** Incluir mínimo 3 filtros, permitiendo buscar por Año mínimo de publicación, Año máximo de publicación, Idioma y Autor[cite: 32, 33, 34, 35, 36, 37, 82].
* [cite_start]**Extras - Filtros y Ordenamiento:** Implementar el filtro por idioma y el ordenamiento por año o cantidad de ediciones[cite: 38, 108, 109].

### 🧑‍💻 3. Detalles de Obra, Favoritos y Experiencia de Usuario
**Responsable:** Victor Medrano

[cite_start]**Descripción:** Encargado de las rutas `/libro/:workld`, `/favoritos` y `/acerca`[cite: 61, 62, 63].

**Tareas específicas:**
* [cite_start]**Componente de Tarjeta (`BookCard.jsx`):** Cada tarjeta debe mostrar: Portada, Título, Autor, Año de primera publicación, Número de ediciones, Botón "Ver detalle" y Botón "Agregar a favoritos"[cite: 13, 14, 15, 16, 17, 18, 19, 20, 80].
* [cite_start]**Página de Detalle (`BookDetail.jsx`):** Al entrar a un libro debe mostrar: Portada grande, Título, Descripción (si existe), Autores (si existen), Fecha o año de publicación, Temas relacionados, Enlace a Open Library, Botón para volver y Botón para agregar/quitar favoritos[cite: 39, 40, 41, 42, 43, 44, 45, 46, 47, 48, 49, 88].
* [cite_start]**Lógica de Favoritos (`storage.js` & `Favorites.jsx`):** Usar localStorage para agregar libro a favoritos, evitar duplicados, eliminar favoritos, mantener favoritos al recargar y mostrar una página exclusiva de favoritos[cite: 50, 51, 52, 53, 54, 55, 56, 57, 89, 94].
* [cite_start]**Navegación e Información:** Desarrollar `Navbar.jsx` y la vista de `About.jsx`[cite: 79, 90].
* [cite_start]**Extra - Modo Oscuro:** Implementar la lógica y estilos para el modo oscuro en toda la aplicación[cite: 106].

---

## 📂 Estructura Sugerida del Proyecto

```text
src/
 ├── components/
 [cite_start]│    ├── Navbar.jsx [cite: 79]
 [cite_start]│    ├── BookCard.jsx [cite: 80]
 [cite_start]│    ├── SearchBar.jsx [cite: 81]
 [cite_start]│    ├── FilterPanel.jsx [cite: 82]
 [cite_start]│    ├── Loading.jsx [cite: 83]
 [cite_start]│    └── ErrorMessage.jsx [cite: 84]
 ├── pages/
 [cite_start]│    ├── Home.jsx [cite: 86]
 [cite_start]│    ├── Search.jsx [cite: 87]
 [cite_start]│    ├── BookDetail.jsx [cite: 88]
 [cite_start]│    ├── Favorites.jsx [cite: 89]
 [cite_start]│    └── About.jsx [cite: 90]
 ├── services/
 [cite_start]│    └── openLibraryService.js [cite: 92]
 ├── utils/
 [cite_start]│    └── storage.js [cite: 94]
 ├── styles/
 [cite_start]│    └── main.scss [cite: 96]
 [cite_start]└── App.jsx [cite: 97]
```
```
