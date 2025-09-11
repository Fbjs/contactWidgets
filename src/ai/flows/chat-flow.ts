"use server";
/**
 * @fileOverview A simple chatbot flow that responds to user messages.
 *
 * - chat - A function that handles the chat conversation.
 * - ChatMessage - The type for a single chat message.
 * - ChatHistory - The type for the conversation history.
 */

import { ai } from "@/ai/genkit";
import { z } from "zod";
import { gpt4oMini } from "genkitx-openai";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "model", "system"]),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export type ChatHistory = ChatMessage[];

const ChatInputSchema = z.object({
  history: z.array(ChatMessageSchema),
  newMessage: z.string(),
});
export type ChatInput = z.infer<typeof ChatInputSchema>;

const chatFlow = ai.defineFlow(
  {
    name: "chatFlow",
    inputSchema: ChatInputSchema,
    outputSchema: ChatMessageSchema,
  },
  async ({ history, newMessage }) => {
    // 1. Define el prompt del sistema. Usa la variable de entorno o un valor por defecto.
    const systemPrompt =
      process.env.NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT ||
      `Eres un amigable asistente virtual para el servicio Click2Call. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable.`;

    // 2. Construye el historial completo para la IA.
    // El primer mensaje establece el comportamiento del bot (rol 'system').
    // Luego, se añade el historial de la conversación existente.
    const fullHistory: ChatHistory = [
      { role: "system", content: systemPrompt },
      ...history,
    ];

    // 3. Llama al modelo de IA.
    // 'prompt' es el nuevo mensaje del usuario.
    // 'history' contiene el contexto del sistema y la conversación pasada.
    const response = await ai.generate({
      model: gpt4oMini,
      prompt: newMessage,
      history: fullHistory,
    });

    // 4. Devuelve la respuesta del modelo.
    return {
      role: "model",
      content: response.text,
    };
  }
);

export async function chat(input: ChatInput): Promise<ChatMessage> {
  return chatFlow(input);
}
