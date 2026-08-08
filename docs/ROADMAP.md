# Roadmap

## Objetivo

Desarrollar un MVP funcional de Juegoteka que permita conectar jugadores, juegotekas y administradores mediante una plataforma web para la organización de comunidades y encuentros de juegos de mesa.

El objetivo académico es llegar a la defensa con un sistema completo, estable y cuya arquitectura pueda explicarse claramente.

---

# Estado actual

## Finalizado

### Infraestructura

- [x] Configuración del proyecto con Vite + React + TypeScript.
- [x] Configuración de Tailwind CSS.
- [x] Estructura inicial del proyecto.
- [x] Layout principal.
- [x] Navegación responsive.
- [x] Componentes UI reutilizables.

### Diseño

- [x] Identidad visual inicial.
- [x] Maquetado de las pantallas principales.
- [x] Arquitectura basada en componentes.

### Backend

- [x] API REST funcional.
- [x] MongoDB local para desarrollo.
- [x] Comunicación Frontend → Backend.
- [x] Login mediante JWT.

---

# Próximos Issues

---

## Issue 1
### Integración completa de autenticación

Objetivo:

Completar el flujo de autenticación iniciado.

### Tareas

- [ ] Persistir JWT en localStorage.
- [ ] Restaurar sesión.
- [ ] Logout.
- [ ] Mostrar usuario autenticado.
- [ ] Cerrar automáticamente AuthOffCanvas.
- [ ] Manejo de expiración del token.
- [ ] Enviar Authorization Bearer automáticamente.

Entrega esperada:

Sistema completo de autenticación reutilizable.

---

## Issue 2
### Perfil del jugador

Objetivo:

Conectar la pantalla Perfil con la API.

### Tareas

- [ ] Obtener usuario autenticado.
- [ ] Mostrar datos reales.
- [ ] Editar perfil.
- [ ] Actualizar información.
- [ ] Mostrar estadísticas.

Entrega:

Perfil completamente funcional.

---

## Issue 3
### Home y catálogo de juegos

Objetivo:

Consumir los endpoints de Juegos.

### Tareas

- [ ] Listar juegos.
- [ ] Mostrar detalle.
- [ ] Buscar juegos.
- [ ] Filtrar.
- [ ] Componentes reutilizables.

Entrega:

Exploración completa del catálogo.

---

## Issue 4
### Mapa de juegotekas

Objetivo:

Conectar React Leaflet con la API.

### Tareas

- [ ] Obtener juegotekas.
- [ ] Mostrar marcadores.
- [ ] Popup con información.
- [ ] Navegar al perfil.

Entrega:

Mapa completamente funcional.

---

## Issue 5
### Mazo (mensajes)

Objetivo:

Implementar el sistema de mensajes.

### Tareas

- [ ] Obtener mensajes.
- [ ] Mostrar cartas.
- [ ] Marcar como leído.
- [ ] Navegar desde mensajes.

Entrega:

Mazo conectado al backend.

---

## Issue 6
### Libreta y desafíos

Objetivo:

Implementar la interacción entre jugadores.

### Tareas

- [ ] Mostrar contactos.
- [ ] Enviar desafío.
- [ ] Recibir desafío.
- [ ] Aceptar desafío.
- [ ] Rechazar desafío.

Entrega:

Sistema de desafíos funcional.

---

## Issue 7
### Jornadas y encuentros

Objetivo:

Implementar las funcionalidades exclusivas de las Juegotekas.

### Tareas

- [ ] Crear jornada.
- [ ] Editar jornada.
- [ ] Eliminar jornada.
- [ ] Gestionar participantes.
- [ ] Consultar encuentros.

Entrega:

Gestión completa de jornadas.

---

## Issue 8
### Consola de administración

Objetivo:

Implementar herramientas administrativas.

### Tareas

- [ ] Gestión de usuarios.
- [ ] Gestión de juegos.
- [ ] Gestión de juegotekas.
- [ ] Gestión de jornadas.
- [ ] Moderación de mensajes.

Entrega:

Panel administrativo funcional.

---

## Issue 9
### Pulido final

Objetivo:

Preparar el proyecto para la entrega.

### Tareas

- [ ] Responsive final.
- [ ] Corrección de errores.
- [ ] Optimización visual.
- [ ] Documentación.
- [ ] Revisión de código.
- [ ] Preparación de defensa.

Entrega:

Versión candidata para la entrega.

---

# Cronograma

## Agosto

### Semana 1

- Issue 1
- Issue 2

---

### Semana 2

- Issue 3
- Issue 4

---

### Semana 3

- Issue 5
- Issue 6

---

### Semana 4

- Issue 7

---

## Septiembre

### Semana 1

- Issue 8

---

### Semana 2

- Issue 9

---

### Semana 3

Correcciones finales.

---

### Semana 4

Preparación de la defensa.

- repaso de arquitectura
- pruebas funcionales
- limpieza del repositorio
- documentación definitiva

---

# Hitos

## MVP

✔ Autenticación

✔ Perfil

✔ Juegos

✔ Mapa

✔ Mensajes

---

## Beta

✔ Desafíos

✔ Jornadas

---

## Release Candidate

✔ Administración

✔ Responsive

✔ Documentación

✔ Defensa