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
