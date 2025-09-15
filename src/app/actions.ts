"use server";

import { ClickToCallSchema, ClickToCallValues } from "@/lib/schemas";
import { chatFlow, type ChatHistory, type ChatOutput } from "@/ai/flows/chat-flow";

export async function clickToCall(data: ClickToCallValues) {
  const validatedFields = ClickToCallSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      success: false,
      error: "Número de teléfono inválido.",
    };
  }

  const { phone } = validatedFields.data;
  // Remove spaces and hyphens from the phone number
  const sanitizedPhone = phone.replace(/[\s-]/g, "");
  const phoneNumber = `56${sanitizedPhone}`;
  
  const baseUrl = process.env.CLICK_TO_CALL_URL;
  if (!baseUrl) {
    console.error("La variable de entorno CLICK_TO_CALL_URL no está definida.");
    return {
      success: false,
      error: "La configuración del servidor está incompleta.",
    };
  }
  
  const url = `${baseUrl}/${phoneNumber}`;

  try {
    console.log(`Iniciando llamada a: ${phoneNumber} via ${url}`);

    const response = await fetch(url);

    if (response.ok) {
      console.log("Llamada iniciada con éxito");
      return { success: true };
    } else {
      console.error(`Error en la API: ${response.status} ${response.statusText}`);
      const errorBody = await response.text();
      console.error("Cuerpo del error:", errorBody);
      return {
        success: false,
        error: `Error de la API: ${response.statusText}`,
      };
    }
  } catch (error) {
    console.error("Error al realizar la llamada fetch:", error);
    if (error instanceof Error) {
      return { success: false, error: error.message };
    }
    return {
      success: false,
      error: "Ocurrió un error desconocido al iniciar la llamada.",
    };
  }
}

export async function sendChatMessage(
  history: ChatHistory
): Promise<ChatOutput> {
  return await chatFlow({ history });
}
