"use server";

import { ClickToCallSchema, ClickToCallValues } from "@/lib/schemas";

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
  const url = `https://app.neighbour.cl/api/clicktocall/${phoneNumber}`;

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
