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
  role: z.enum(["user", "model"]),
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
    const systemPrompt =
      process.env.CHATBOT_SYSTEM_PROMPT ||
      `Eres un amigable asistente virtual para el servicio Click2Call. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable.`;

    const response = await ai.generate({
      model: gpt4oMini,
      prompt: newMessage,
      history: [{ role: "system", content: systemPrompt }, ...history],
    });

    return {
      role: "model",
      content: response.text,
    };
  }
);

export async function chat(input: ChatInput): Promise<ChatMessage> {
  return chatFlow(input);
}
