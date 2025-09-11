
import ClickToCallWidget from "@/components/click-to-call-widget";

export default function Home() {
  const isClickToCallEnabled =
    process.env.NEXT_PUBLIC_CLICK_TO_CALL_ENABLED === "true";
  const isChatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true";
  const isWhatsappEnabled =
    process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true";

  const enabledWidgets = [
    isClickToCallEnabled && "Click to Call",
    isChatbotEnabled && "Asistente de Chat",
    isWhatsappEnabled && "WhatsApp",
  ]
    .filter(Boolean)
    .join(", ");

  const embedCode = `<iframe src="${
    new URL(process.env.NEXT_PUBLIC_URL || "http://localhost:9002").origin
  }/embed" style="position: fixed; bottom: 0; right: 0; border: none; width: 400px; height: 600px; z-index: 9999;"></iframe>`;

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
              La configuración del widget se gestiona desde el archivo `.env`
              de este proyecto. Según tu configuración actual, los siguientes
              módulos están{" "}
              <span className="font-semibold text-primary">activados</span>:
            </p>
            <ul className="list-disc list-inside bg-card p-4 rounded-lg shadow">
              {enabledWidgets.split(", ").map((widget) => (
                <li key={widget}>{widget}</li>
              ))}
            </ul>
            <p className="mt-4 text-muted-foreground text-sm">
              Si deseas cambiar los botones que se muestran, modifica las
              variables `NEXT_PUBLIC_CLICK_TO_CALL_ENABLED`,
              `NEXT_PUBLIC_CHATBOT_ENABLED`, y `NEXT_PUBLIC_WHATSAPP_ENABLED`
              en el archivo `.env` a `'true'` o `'false'`.
            </p>
          </section>
        </div>
      </main>

      {/* El widget se muestra aquí para demostración en esta página */}
      <ClickToCallWidget />
    </>
  );
}
