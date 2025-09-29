"use client";

import { useState, useRef, useEffect, useTransition } from "react";
import { Send, User, Bot, Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { sendChatMessage } from "@/app/actions";
import type { ChatHistory, ChatMessage } from "@/ai/flows/chat-flow";
import { cn } from "@/lib/utils";

interface ChatWidgetProps {
  onNewLog?: (logs: string[]) => void;
}

export default function ChatWidget({ onNewLog }: ChatWidgetProps) {
  const [history, setHistory] = useState<ChatHistory>([]);
  const [inputValue, setInputValue] = useState("");
  const [isPending, startTransition] = useTransition();
  const viewportRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (viewportRef.current) {
      viewportRef.current.scrollTo({
        top: viewportRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  useEffect(() => {
    scrollToBottom();
    if (!isPending) {
      inputRef.current?.focus();
    }
  }, [history, isPending]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = { role: "user", content: inputValue };
    const newHistory: ChatHistory = [...history, userMessage];

    setHistory(newHistory);
    setInputValue("");

    startTransition(async () => {
      try {
        const { message: botResponse, logs } = await sendChatMessage(newHistory);
        setHistory((prevHistory) => [...prevHistory, botResponse]);
        if (onNewLog) {
          onNewLog(logs);
        }
      } catch (error) {
        console.error("Error sending message:", error);
        // Optionally, show an error message to the user
      }
    });
  };

  return (
    <div className="w-80 h-96 bg-card rounded-lg shadow-lg flex flex-col">
      <div className="bg-primary text-primary-foreground p-4 rounded-t-lg">
        <h3 className="font-semibold text-lg">Asistente Virtual</h3>
      </div>
      <ScrollArea className="flex-1 p-4" viewportRef={viewportRef}>
        <div className="space-y-4">
          {history.map((msg, index) => (
            <div
              key={index}
              className={cn(
                "flex items-start gap-3",
                msg.role === "user" ? "justify-end" : "justify-start"
              )}
            >
              {msg.role === "model" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <Bot />
                  </AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  "p-3 rounded-lg max-w-xs",
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                )}
              >
                <p className="text-sm">{msg.content}</p>
              </div>
              {msg.role === "user" && (
                <Avatar className="w-8 h-8">
                  <AvatarFallback>
                    <User />
                  </AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
            <div className="flex items-start gap-3 justify-start">
              <Avatar className="w-8 h-8">
                <AvatarFallback>
                  <Bot />
                </AvatarFallback>
              </Avatar>
              <div className="p-3 rounded-lg bg-muted">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="p-4 border-t">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            ref={inputRef}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Escribe un mensaje..."
            disabled={isPending}
            autoFocus
          />
          <Button type="submit" size="icon" disabled={isPending}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
