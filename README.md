### 🎯 Objetivo

Desarrollar una aplicación Vue.js/React que cargue formularios dinámicamente a partir de un archivo JSON, con validaciones avanzadas y una interfaz limpia.

### 📋 Requisitos

##### Funcionalidades mínimas:
- Carga Dinámica del Formulario:
	- Leer las preguntas desde un archivo questions.json.
	- Soportar diferentes tipos de preguntas: texto, correo, contraseña, número, fecha, select, checkbox, radio.

##### Validaciones:
- Validar cada campo según sus reglas definidas en el JSON.
- Mostrar mensajes de error en tiempo real.
- Prevenir el envío del formulario si hay errores.

##### Estructura del Archivo JSON (db/questions.json):
````
 {
    "id": 1,
    "label": "Nombre completo",
    "type": "text",
    "placeholder": "Ingresa tu nombre completo",
    "validation": {
      "required": true,
      "minLength": 3,
      "pattern": "^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$"
    }
  },
````

### 💡 Bonus (no obligatorio pero suma puntos)
- Diseño limpio y responsive (Tailwind, Bootstrap o CSS puro).


### 📦 Entregables
 - Repositorio (GitHub, GitLab o ZIP).
 - README con instrucciones para ejecutar (npm install, npm run dev, etc.).

### 📝 Criterios de evaluación
- Manejo correcto del JSON para formularios dinámicos.
- Organización y claridad del código.
- Diseño y experiencia del usuario.
- Bonus: calidad visual y accesibilidad.