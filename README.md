# Widget Flotante de Click2Call y Asistente de Chat

Este es un proyecto Next.js que proporciona un widget flotante multi-función para sitios web, diseñado para mejorar la comunicación con los clientes.

## Características

- **Botón de Llamada (Click to Call)**: Permite a los usuarios ingresar su número de teléfono para solicitar una llamada inmediata.
- **Asistente de Chat IA**: Un chatbot, impulsado por OpenAI (ChatGPT), para responder preguntas de los usuarios en tiempo real.
- **Botón de WhatsApp**: Un enlace directo para que los usuarios inicien una conversación por WhatsApp.
- **Altamente Configurable**: El comportamiento del bot, los números de teléfono y los endpoints de la API se pueden configurar fácilmente a través de variables de entorno.

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

Crea un archivo llamado `.env` en la raíz del proyecto y añade las siguientes variables. Puedes usar el archivo `.env.example` como guía.

```plaintext
# === Configuración de OpenAI ===
# Clave de la API de OpenAI para el asistente de chat
OPENAI_API_KEY="sk-..."

# === Configuración del Widget ===
# Habilita ('true') o deshabilita ('false') cada botón del widget flotante.
NEXT_PUBLIC_CLICK_TO_CALL_ENABLED="true"
NEXT_PUBLIC_CHATBOT_ENABLED="true"
NEXT_PUBLIC_WHATSAPP_ENABLED="true"

# === Configuración del Asistente de Chat ===
# (Opcional) Instrucciones personalizadas para el chatbot. Define su personalidad y contexto.
NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT="Eres un amigable asistente virtual. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable."

# === Configuración de Click to Call ===
# URL del servicio o endpoint que se encargará de realizar la llamada telefónica.
CLICK_TO_CALL_URL="https://tu-api.com/call"

# === Configuración de WhatsApp ===
# Número de teléfono para el botón de WhatsApp (incluyendo el código de país, sin el '+').
NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER="1234567890"

# (Opcional) Mensaje pre-llenado para cuando un usuario haga clic en el botón de WhatsApp.
NEXT_PUBLIC_WHATSAPP_MESSAGE="Hola, estoy interesado en sus servicios."

```

### 4. Ejecutar el Servidor de Desarrollo

Una vez instaladas las dependencias y configurado el archivo `.env`, puedes iniciar el servidor de desarrollo:

```bash
npm run dev
```

Esto iniciará la aplicación de Next.js. Adicionalmente, necesitas iniciar el servidor de Genkit para los flujos de IA en una terminal separada:

```bash
npm run genkit:watch
```

Abre [http://localhost:9002](http://localhost:9002) en tu navegador para ver la aplicación en funcionamiento.

## Scripts Disponibles

- `npm run dev`: Inicia el servidor de desarrollo de Next.js.
- `npm run genkit:dev`: Inicia el servidor de Genkit una vez.
- `npm run genkit:watch`: Inicia el servidor de Genkit y lo reinicia automáticamente al detectar cambios en los flujos.
- `npm run build`: Compila la aplicación para producción.
- `npm run start`: Inicia un servidor de producción de Next.js.
- `npm run lint`: Ejecuta el linter de ESLint para analizar el código.
