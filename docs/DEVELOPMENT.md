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