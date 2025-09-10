import * as z from "zod";

export const ClickToCallSchema = z.object({
  phone: z
    .string()
    .min(1, { message: "El teléfono es requerido." })
    .regex(
      /^[0-9\s-]{7,15}$/,
      "Por favor, introduce un número de teléfono válido."
    ),
});

export type ClickToCallValues = z.infer<typeof ClickToCallSchema>;
