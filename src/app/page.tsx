
"use client";

import { useState, useEffect } from 'react';
import ClickToCallWidget from '@/components/click-to-call-widget';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const [clickToCallUrl, setClickToCallUrl] = useState<string | null>(null);
  
  const isClickToCallEnabled =
    process.env.NEXT_PUBLIC_CLICK_TO_CALL_ENABLED === 'true';
  const isChatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === 'true';
  const isWhatsappEnabled =
    process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === 'true';

  const chatbotPrompt = process.env.NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT;
  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER;
  const whatsappMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE;
  
  useEffect(() => {
    // Esto se ejecuta solo en el cliente, después de la hidratación
    setClickToCallUrl(process.env.CLICK_TO_CALL_URL || 'No configurado');
  }, []);


  const embedCode = `<iframe src="${
    new URL(process.env.NEXT_PUBLIC_URL || 'http://localhost:9002').origin
  }/embed" style="position: fixed; bottom: 0; right: 0; border: none; width: 400px; height: 600px; z-index: 9999;"></iframe>`;

  const handleNewLog = (newLogs: string[]) => {
    setLogs(newLogs);
  };

  return (
    <>
      <main className="container mx-auto p-8 min-h-screen">
        <header className="text-center my-12 md:my-20">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-primary mb-4">
            Contact Widget
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Este widget flotante te permite añadir funciones de contacto a tu
            sitio web de forma sencilla.
          </p>
        </header>

        <div className="space-y-12 max-w-4xl mx-auto leading-relaxed">
          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Cómo Instalar el Widget en tu Sitio Web
            </h2>
            <p className="mb-4">
              Para agregar el widget de contacto a tu página web, simplemente
              copia y pega el siguiente código HTML justo antes de la etiqueta
              de cierre `{'</body>'}` en tu archivo HTML.
            </p>
            <div className="bg-card p-4 rounded-lg shadow">
              <pre className="text-sm bg-muted/50 p-4 rounded-md overflow-x-auto">
                <code>{embedCode}</code>
              </pre>
            </div>
            <p className="mt-4 text-muted-foreground text-sm">
              El widget se cargará en una ventana flotante (iframe) en la
              esquina inferior derecha de tu página, sin interferir con el
              contenido existente.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4 border-b pb-2">
              Configuración Actual
            </h2>
            <p className="mb-4">
              La configuración del widget se gestiona desde el archivo `.env` de
              este proyecto. A continuación se muestra la configuración activa:
            </p>
            <div className="grid gap-6">
              {isClickToCallEnabled && (
                <Card>
                  <CardHeader>
                    <CardTitle>Click to Call</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      El módulo de llamada está{' '}
                      <span className="font-semibold text-primary">
                        activado
                      </span>
                      .
                    </p>
                    <div className="text-sm">
                      <p className="font-semibold">URL del Endpoint:</p>
                      <p className="text-muted-foreground">
                        {clickToCallUrl !== null ? clickToCallUrl : 'Cargando...'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
              {isChatbotEnabled && (
                <Card>
                  <CardHeader>
                    <CardTitle>Asistente de Chat (Bot)</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      El módulo de chat está{' '}
                      <span className="font-semibold text-primary">
                        activado
                      </span>
                      .
                    </p>
                    <p className="text-sm font-semibold">
                      Instrucción del sistema (Prompt):
                    </p>
                    <blockquote className="border-l-4 pl-4 italic text-sm text-muted-foreground bg-muted/50 p-2 rounded-md">
                      {chatbotPrompt ||
                        'No se ha definido un prompt de sistema.'}
                    </blockquote>
                  </CardContent>
                </Card>
              )}
              {isWhatsappEnabled && (
                <Card>
                  <CardHeader>
                    <CardTitle>WhatsApp</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <p className="text-sm text-muted-foreground">
                      El módulo de WhatsApp está{' '}
                      <span className="font-semibold text-primary">
                        activado
                      </span>
                      .
                    </p>
                    <div className="text-sm">
                      <p className="font-semibold">Número de teléfono:</p>
                      <p className="text-muted-foreground">
                        {whatsappNumber || 'No configurado'}
                      </p>
                    </div>
                    <div className="text-sm">
                      <p className="font-semibold">Mensaje por defecto:</p>
                      <p className="text-muted-foreground">
                        {whatsappMessage || 'No configurado'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
            <p className="mt-4 text-muted-foreground text-sm">
              Si deseas cambiar qué módulos se muestran, modifica las variables{' '}
              <code className="bg-muted/50 p-1 rounded">
                NEXT_PUBLIC_CLICK_TO_CALL_ENABLED
              </code>
              ,{' '}
              <code className="bg-muted/50 p-1 rounded">
                NEXT_PUBLIC_CHATBOT_ENABLED
              </code>
              , y{' '}
              <code className="bg-muted/50 p-1 rounded">
                NEXT_PUBLIC_WHATSAPP_ENABLED
              </code>{' '}
              en el archivo `.env` a `'true'` o `'false'`.
            </p>
          </section>

          {isChatbotEnabled && (
            <section>
              <h2 className="text-2xl font-bold mb-4 border-b pb-2">
                Consola de Depuración del Chat
              </h2>
              <p className="mb-4 text-sm text-muted-foreground">
                A continuación se muestra el contexto exacto (prompt del
                sistema e historial) que se envió a la API de OpenAI en el
                último mensaje.
              </p>
              <div className="bg-gray-900 text-white font-mono p-4 rounded-lg shadow-inner">
                <pre className="text-xs whitespace-pre-wrap">
                  {logs.length > 0
                    ? logs.join('\n\n' + '-'.repeat(50) + '\n\n')
                    : 'Aún no se han enviado mensajes...'}
                </pre>
              </div>
            </section>
          )}
        </div>
      </main>

      {/* El widget se muestra aquí para demostración en esta página */}
      <ClickToCallWidget onNewLog={handleNewLog} />
    </>
  );
}
