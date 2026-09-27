# Juegoteka Frontend - Development Guide

## Objetivo

Frontend de la plataforma Juegoteka.

Proyecto final de Programación III.

La aplicación busca conectar jugadores, juegotekas y administradores mediante una plataforma web para gestión y descubrimiento de encuentros de juegos de mesa.

El desarrollo prioriza:

- código claro y explicable;
- buenas prácticas de React;
- uso consciente de herramientas;
- arquitectura simple antes que sobreingeniería.

---

# Filosofía de desarrollo

Este es un proyecto académico.

Cada decisión técnica debe poder ser explicada durante la defensa del proyecto.

Principios:

- Evitar soluciones mágicas o abstracciones innecesarias.
- Priorizar legibilidad sobre complejidad.
- Incorporar herramientas solamente cuando resuelvan un problema concreto.
- Mantener componentes pequeños y responsabilidades claras.
- Utilizar TypeScript para mejorar comprensión y seguridad del código.

---

# Stack tecnológico

## Frontend

- React
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Context API
- Fetch API
- React Leaflet

## Herramientas

- npm
- Git
- GitHub

---

# Gestión del código

## Ramas

Se utilizará una estrategia simple:

```
main
 |
develop
 |
feature/*
```

### main

Rama estable.

Contiene versiones consideradas entregables.

### develop

Rama de integración.

Recibe funcionalidades terminadas mediante Pull Requests.

### feature/*

Ramas de desarrollo de funcionalidades específicas.

Ejemplo:

```
feature/project-setup
feature/login
feature/map
feature/profile
```

---

# Commits

Se utiliza una variante de Conventional Commits.

Formato:

```
tipo: descripción
```

Tipos principales:

- feat: nueva funcionalidad
- fix: corrección de errores
- docs: documentación
- refactor: reorganización del código
- style: cambios de formato
- test: pruebas
- chore: configuración o mantenimiento

Ejemplos:

```
feat: create login page
fix: correct user validation
chore: configure Tailwind CSS
```

---

# Decisiones iniciales

## Tailwind CSS

Se utiliza Tailwind CSS 4 mediante el plugin oficial para Vite.

Motivo:

- facilita diseño responsive;
- reduce archivos CSS dispersos;
- mantiene los estilos cerca de los componentes.

El archivo `index.css` funciona como punto global de entrada.

---

## Axios

No se utilizará inicialmente.

Se utilizará Fetch API.

Motivo:

- menor cantidad de dependencias;
- permite comprender mejor la comunicación HTTP;
- suficiente para el alcance inicial.

Axios podrá evaluarse si aparecen necesidades concretas.

---

## Manejo de estado

Se utilizará Context API para la sesión.

No se incorporarán Redux, Zustand u otras soluciones hasta que exista una necesidad real.

---

## Diseño

La aplicación será:

- Mobile first.
- Responsive.
- Orientada principalmente a jugadores móviles.

La interfaz tendrá una identidad visual basada en juegos de mesa:

- cartas;
- mazo;
- mesa de juego;
- medallas;
- encuentros.

---

# Arquitectura prevista

```
src/

components/
pages/
context/
services/
types/
hooks/
routes/
assets/
```

La estructura definitiva se definirá durante el desarrollo.

---

# Roadmap inicial

## Infraestructura

[x] Crear proyecto Vite  
[x] Configurar Git  
[x] Crear ramas principales  
[x] Configurar Tailwind CSS  
[x] Crear estructura de carpetas  


---
## Estructura del proyecto

El código fuente se organiza por responsabilidad.

- `pages/`: pantallas de la aplicación.
- `components/`: componentes reutilizables.
- `layouts/`: estructuras compartidas entre páginas.
- `routes/`: configuración de React Router.
- `services/`: comunicación con el backend.
- `types/`: tipos TypeScript del dominio.
- `assets/`: recursos estáticos.



### Criterios

- Las páginas pueden tener subcarpetas cuando su complejidad lo requiera.
- Los tipos específicos de una página pueden mantenerse junto a ella.
- Solo se crean nuevas carpetas cuando resuelven una necesidad real del proyecto.

## Aplicación

[ ] Layout principal  
[ ] Navegación inferior  
[ ] Autenticación  
[ ] Mazo  
[ ] Mapa  
[ ] Libreta  
[ ] Perfil  
[ ] Integración con backend  


# Bitácora

## 2026-07-20

- Creación del repositorio frontend.
- Configuración inicial de Git.
- Creación de ramas main, develop y feature.
- Creación del tablero Kanban.
- Configuración inicial de Tailwind CSS.
- Definición de criterios de desarrollo.

## Estado del desarrollo (Julio 2026)

### Arquitectura

Se consolidó una arquitectura basada en componentes reutilizables.

```
pages/
    Orquestan cada pantalla.

components/
    Contienen los componentes reutilizables de cada página.

components/ui/
    Componentes completamente reutilizables para toda la aplicación.
```

Las páginas actúan como coordinadoras del contenido, mientras que la lógica visual reutilizable se mantiene dentro de `components`.

### Maquetado actual

Se encuentra implementada una primera maqueta funcional de las pantallas principales:

* Home
* Mazo
* Mapa
* Libreta
* Perfil

El objetivo de esta etapa no fue implementar la lógica de negocio sino validar:

* navegación
* jerarquía visual
* organización de componentes
* experiencia de usuario general

### Componentes UI disponibles

Actualmente existen componentes reutilizables como:

* Button
* Panel
* Container
* Header
* PageTitle
* SectionTitle
* Card (base)

La Card se utilizará como base visual para diferentes especializaciones (cartas del mazo, juegos, etc.) mediante composición.

### Diseño

La interfaz adopta un enfoque mobile-first.

El proyecto busca transmitir una identidad inspirada en los juegos de mesa físicos evitando una estética excesivamente "gamificada".

Conceptos visuales que guían el diseño:

* caja de juego
* cartas
* tablero
* comunidad
* encuentro

### Próximas etapas

* implementar navegación inferior definitiva
* mejorar el Layout principal
* integrar consumo del backend
* comenzar el flujo de autenticación
* reemplazar datos de prueba por datos reales

### Auth / login
 *"La URL del backend se maneja mediante variables de entorno de Vite para desacoplar el frontend del ambiente de ejecución. Durante desarrollo apunta al servidor local y en producción al backend desplegado en Render."
 //
 # Estado del desarrollo (31/07/2026)

## Arquitectura actual

El frontend ya dispone de una arquitectura completa para autenticación basada en JWT.

La comunicación sigue el siguiente flujo:

```text
Header
    ↓
AuthOffCanvas
    ↓
LoginForm
    ↓
useAuth()
    ↓
AuthContext.login()
    ↓
authService.login()
    ↓
POST /usuarios/login
    ↓
Backend (Express)
    ↓
MongoDB
```

La responsabilidad de cada capa es la siguiente:

* **Header**

  * Abre el panel lateral de autenticación.

* **AuthOffCanvas**

  * Contenedor visual del proceso de autenticación.
  * No conoce la API.
  * No conoce JWT.
  * Solo organiza Header, LoginForm y Footer.

* **LoginForm**

  * Administra el estado local del formulario (`userName` y `pass`).
  * Al enviar el formulario ejecuta `onLogin(credentials)`.

* **useAuth()**

  * Hook personalizado que encapsula el acceso al contexto.
  * Evita importar `useContext(AuthContext)` en toda la aplicación.

* **AuthContext**

  * Responsable del estado global de autenticación.
  * Ejecuta el login.
  * Guarda el usuario autenticado.
  * (Pendiente) persistir sesión mediante localStorage.

* **authService**

  * Responsable exclusivo de comunicarse con la API.
  * No conoce React ni componentes.
  * Solo realiza peticiones HTTP y devuelve objetos tipados.

---

# Estado actual

## Funciona

* Apertura y cierre del AuthOffCanvas.
* Envío del formulario.
* Comunicación con la API.
* CORS correctamente configurado.
* Login exitoso.
* Recepción del JWT.
* Recepción del objeto Usuario.
* Tipado TypeScript de la respuesta.

Se confirmó que el backend responde con:

```json
{
  "message": "Login exitoso :)",
  "token": "...",
  "usuario": { ... }
}
```

---

# Backend de desarrollo

Durante el desarrollo local se utiliza:

* Backend Express en `http://localhost:3000`
* MongoDB local
* Base de datos:

```
juegotekas_dev
```

Variables de entorno utilizadas:

```
PORT=3000
DB_URL=mongodb://127.0.0.1:27017/juegotekas_dev
JWT_SECRET=...
```

---

# Próxima etapa

## Integración completa con la API

Pendientes:

* Guardar JWT en localStorage.
* Restaurar sesión al recargar la aplicación.
* Configurar `http.ts` para enviar automáticamente el header:

```
Authorization: Bearer <token>
```

* Implementar logout.
* Mostrar estado autenticado en Header.
* Proteger rutas privadas mediante React Router.
* Manejar expiración del token.
* Mostrar información del usuario autenticado.

---

# Decisiones de arquitectura

Se decidió mantener una separación estricta entre capas.

```
Componentes
        │
        ▼
Hooks
        │
        ▼
Context
        │
        ▼
Services
        │
        ▼
API REST
```

Los componentes nunca deben realizar llamadas HTTP directamente.

Toda comunicación con el backend debe pasar por los servicios.

El Context no conoce detalles de la implementación HTTP.

Los Services no conocen React.

Esta separación busca facilitar el mantenimiento, las pruebas y la explicación oral del proyecto final.

---

# Próximo Issue

**feat: integrar frontend con API REST**

Objetivo:

Completar el flujo de autenticación incorporando persistencia de sesión, autorización mediante JWT y consumo progresivo del resto de los endpoints del backend.
/////////////////////////////////
## Integración con API

### Autenticación
- [x] Login mediante JWT
- [x] AuthContext
- [x] Persistencia del token
- [x] Recuperación del perfil del usuario autenticado

### Perfil
- [x] Perfil conectado al backend
- [x] `aboutMe`
- [x] Separación entre datos públicos y privados mediante respuesta personalizada

### Juegos
- [x] Obtener catálogo desde API
- [x] Mostrar juegos mediante `GameCard`
- [x] Agregar juego a `misJuegos`
- [x] Eliminar juego de `misJuegos`
- [x] Actualizar la colección visualmente sin recargar la página

### Pendiente
- [ ] Mejorar estados visuales del catálogo
- [ ] Indicar si un juego ya pertenece a `misJuegos`
- [ ] Edición del perfil
- [ ] Estadísticas reales del jugador
- [ ] Integración de encuentros/jornadas
- [ ] Manejo más completo de errores y expiración del JWT