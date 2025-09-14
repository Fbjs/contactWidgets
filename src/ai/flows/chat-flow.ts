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

const ChatOutputSchema = z.object({
  message: ChatMessageSchema,
  logs: z.array(z.string()),
});
export type ChatOutput = z.infer<typeof ChatOutputSchema>;

const chatFlow = ai.defineFlow(
  {
    name: "chatFlow",
    inputSchema: ChatInputSchema,
    outputSchema: ChatOutputSchema,
  },
  async ({ history, newMessage }) => {
    const systemPrompt =
      process.env.NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT ||
      `Eres un amigable asistente virtual. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable.`;

    // The conversation history from the client already includes the initial "model" greeting.
    // We create the full history for the AI, starting with the system prompt,
    // followed by the existing conversation.
    const fullHistory: ChatHistory = [
      { role: "system", content: systemPrompt },
      ...history,
    ];
    
    const logs = [
      `System Prompt: ${systemPrompt}`,
      `Conversation History Sent to AI: ${JSON.stringify(fullHistory, null, 2)}`
    ];

    console.log("System Prompt:", systemPrompt);
    console.log("Conversation History Sent to AI:", JSON.stringify(fullHistory, null, 2));


    const response = await ai.generate({
      model: gpt4oMini,
      prompt: newMessage,
      history: fullHistory,
    });

    return {
      message: {
        role: "model",
        content: response.text,
      },
      logs: logs
    };
  }
);

export async function chat(input: ChatInput): Promise<ChatOutput> {
  return chatFlow(input);
}
