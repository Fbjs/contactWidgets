"use server";

import { ClickToCallSchema, ClickToCallValues } from "@/lib/schemas";

export async function clickToCall(data: ClickToCallValues) {
  const validatedFields = ClickToCallSchema.safeParse(data);

  if (!validatedFields.success) {
    // This case should ideally not be hit if client-side validation is working
    return {
      success: false,
      error: "Número de teléfono inválido.",
    };
  }

  console.log(`Iniciando llamada a: ${validatedFields.data.phone}`);

  // Simulate network delay for an API call
  await new Promise((resolve) => setTimeout(resolve, 1500));

  // In a real application, you would have logic here to handle the success or failure of the call API.
  // For this demonstration, we'll assume it's always successful.
  return { success: true };
}
