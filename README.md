# Widget Flotante de Contacto

Este es un proyecto Next.js que proporciona un widget flotante multifunción para sitios web, diseñado para mejorar la comunicación con los clientes.

## Características

- **Botón de Llamada (Click to Call)**: Permite a los usuarios ingresar su número de teléfono para solicitar una llamada inmediata.
- **Asistente de Chat IA**: Un chatbot, impulsado por OpenAI (ChatGPT), para responder preguntas de los usuarios en tiempo real.
- **Botón de WhatsApp**: Un enlace directo para que los usuarios inicien una conversación por WhatsApp.
- **Altamente Configurable**: El comportamiento del bot, los números de teléfono y los endpoints de la API se pueden configurar fácilmente a través de variables de entorno.
- **Fácil de Incrustar**: Se puede añadir a cualquier sitio web copiando y pegando un simple fragmento de código `<iframe>`.

## Cómo Empezar

Sigue estos pasos para configurar y ejecutar el proyecto en tu entorno local.

### 1. Prerrequisitos

- Node.js (v18 o superior)
- npm, pnpm, o yarn

### 2. Instalación

Clona el repositorio y luego instala las dependencias:

```bash
npm install
```

### 3. Configuración del Entorno

Crea un archivo llamado `.env` en la raíz del proyecto y añade las siguientes variables.

```plaintext
# === Clave de API ===
# Clave de la API de OpenAI para el asistente de chat.
OPENAI_API_KEY="sk-..."

# === Configuración General del Widget ===
# URL base de tu aplicación. Para desarrollo local, suele ser http://localhost:9002
# Esta URL se usa para generar el código de inserción (iframe).
NEXT_PUBLIC_URL="http://localhost:9002"

# === Habilitar/Deshabilitar Módulos ===
# Cambia a 'true' para mostrar un botón o a 'false' para ocultarlo.
NEXT_PUBLIC_CLICK_TO_CALL_ENABLED="true"
NEXT_PUBLIC_CHATBOT_ENABLED="true"
NEXT_PUBLIC_WHATSAPP_ENABLED="true"

# === Configuración del Asistente de Chat ===
# (Opcional) Instrucciones para el chatbot. Define su personalidad, contexto y cómo debe responder.
NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT="Eres un amigable asistente virtual. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable."

# === Configuración de Click to Call ===
# URL del servicio o endpoint que se encargará de realizar la llamada telefónica.
# La aplicación añadirá automáticamente el número de teléfono al final (ej: https://tu-api.com/call/569xxxxxxxx).
CLICK_TO_CALL_URL="https://tu-api.com/call"

# === Configuración de WhatsApp ===
# Número de teléfono para el botón de WhatsApp (incluyendo el código de país, sin el '+').
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER="1234567890"

# (Opcional) Mensaje pre-llenado para cuando un usuario haga clic en el botón de WhatsApp.
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola, estoy interesado en sus servicios."

```

### 4. Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias y configurado el archivo `.env`, puedes iniciar el servidor de desarrollo de Next.js y el servidor de Genkit en dos terminales separadas.

**Terminal 1 (Next.js):**
```bash
npm run dev
```

**Terminal 2 (Genkit):**
```bash
npm run genkit:watch
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la aplicación y las instrucciones de instalación.

## Cómo Incrustar el Widget

Ve a la página principal de la aplicación ([http://localhost:9002](http://localhost:9002)) y copia el código `<iframe>` que se proporciona. Pega este código en el HTML de tu sitio web, justo antes de la etiqueta de cierre `</body>`. El widget aparecerá en la esquina inferior derecha.
