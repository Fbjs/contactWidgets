"use server";
/**
 * @fileOverview A simple chatbot flow that responds to user messages.
 *
 * - chatFlow - A function that handles the chat conversation.
 * - ChatMessage - The type for a single chat message.
 * - ChatHistory - The type for the conversation history.
 */

import { ai } from "@/ai/genkit";
import { gpt4oMini } from "genkitx-openai";
import { z } from "zod";

const ChatMessageSchema = z.object({
  role: z.enum(["user", "model"]),
  content: z.string(),
});
export type ChatMessage = z.infer<typeof ChatMessageSchema>;

export type ChatHistory = ChatMessage[];

export type ChatOutput = {
  message: ChatMessage;
  logs: string[];
};

export async function chatFlow(history: ChatHistory): Promise<ChatOutput> {
  const systemPrompt =
    process.env.NEXT_PUBLIC_CHATBOT_SYSTEM_PROMPT ||
    `Eres un amigable asistente virtual. Tu objetivo es ayudar a los usuarios con sus preguntas. Sé conciso y amable.`;

  if (!history || history.length === 0) {
    throw new Error("Chat history cannot be empty.");
  }
  
  if (!history.some(m => m.role === 'user')) {
    throw new Error("Chat history must contain at least one user message.");
  }


  const fullHistory = [
    { role: "system", content: systemPrompt },
    ...history,
  ] as { role: "system" | "user" | "model", content: string }[];

  const logs = [
    `System Prompt: ${systemPrompt}`,
    `Conversation History Sent to AI: ${JSON.stringify(fullHistory, null, 2)}`,
  ];

  console.log("System Prompt:", systemPrompt);
  console.log(
    "Conversation History Sent to AI:",
    JSON.stringify(fullHistory, null, 2)
  );

  const response = await ai.generate({
    model: gpt4oMini,
    history: fullHistory,
  });

  const responseText = response.text;
  if (!responseText) {
    throw new Error("AI response was empty. The request may have been blocked.");
  }

  return {
    message: {
      role: "model",
      content: responseText,
    },
    logs: logs,
  };
}
