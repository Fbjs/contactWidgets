"use client";

import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, PhoneOutgoing, Loader2, MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { clickToCall } from "@/app/actions";
import { cn } from "@/lib/utils";
import { ClickToCallSchema, type ClickToCallValues } from "@/lib/schemas";
import ChatWidget from "./chat-widget";

function WhatsAppIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
      {...props}
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.894 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.371-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.626.712.227 1.36.195 1.871-.118.571-.355 1.016-.935 1.165-1.805.149-.87.149-1.631.104-1.805z" />
    </svg>
  );
}

interface ClickToCallWidgetProps {
  onNewLog?: (logs: string[]) => void;
}

export default function ClickToCallWidget({ onNewLog }: ClickToCallWidgetProps) {
  const [isCallInputOpen, setIsCallInputOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const { toast } = useToast();
  const widgetRef = useRef<HTMLDivElement>(null);

  const form = useForm<ClickToCallValues>({
    resolver: zodResolver(ClickToCallSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        widgetRef.current &&
        !widgetRef.current.contains(event.target as Node)
      ) {
        setIsCallInputOpen(false);
        setIsChatOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [widgetRef]);

  const onSubmit = async (values: ClickToCallValues) => {
    const result = await clickToCall(values);

    if (result.success) {
      toast({
        title: "Llamada en curso",
        description: "Te estamos llamando...",
      });
      setIsCallInputOpen(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo iniciar la llamada.",
      });
    }
  };

  const handleCallButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    // This prevents the form from submitting when we just want to open the input
    if (!isCallInputOpen) {
      e.preventDefault();
      setIsCallInputOpen(true);
      setIsChatOpen(false);
    }
    // If the input is already open, the default form submission will proceed.
  };

  const handleChatButtonClick = () => {
    setIsChatOpen((prev) => !prev);
    if (isCallInputOpen) setIsCallInputOpen(false);
  };

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_PHONE_NUMBER;
  const whatsappMessage = process.env.NEXT_PUBLIC_WHATSAPP_MESSAGE;
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
    whatsappMessage || ""
  )}`;

  const isClickToCallEnabled =
    process.env.NEXT_PUBLIC_CLICK_TO_CALL_ENABLED === "true";
  const isChatbotEnabled = process.env.NEXT_PUBLIC_CHATBOT_ENABLED === "true";
  const isWhatsappEnabled =
    process.env.NEXT_PUBLIC_WHATSAPP_ENABLED === "true";

  if (!isClickToCallEnabled && !isChatbotEnabled && !isWhatsappEnabled) {
    return null;
  }

  return (
    <div
      ref={widgetRef}
      className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3"
    >
      {isChatbotEnabled && isChatOpen && <ChatWidget onNewLog={onNewLog} />}

      {isWhatsappEnabled && (
        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
          <Button
            size="icon"
            className="rounded-full w-14 h-14 bg-[#25D366] hover:bg-[#1DA851] shadow-lg"
            aria-label="Contactar por WhatsApp"
          >
            <WhatsAppIcon className="h-7 w-7 text-white" />
          </Button>
        </a>
      )}

      {isChatbotEnabled && (
        <Button
          size="icon"
          className="rounded-full w-14 h-14 bg-primary hover:bg-accent shadow-lg"
          aria-label="Abrir chat"
          onClick={handleChatButtonClick}
        >
          <MessageCircle className="h-7 w-7" />
        </Button>
      )}

      {isClickToCallEnabled && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex items-start gap-3"
          >
            <div
              className={cn(
                "transition-all duration-300 ease-in-out flex flex-col",
                isCallInputOpen ? "w-48 opacity-100" : "w-0 opacity-0"
              )}
              aria-hidden={!isCallInputOpen}
            >
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Tu número de teléfono"
                        {...field}
                        className={cn(
                          "bg-card/90 backdrop-blur-sm border-primary/50 focus-visible:ring-primary shadow-lg",
                          !isCallInputOpen && "hidden"
                        )}
                        aria-label="Phone number input"
                        autoComplete="tel"
                      />
                    </FormControl>
                    <FormMessage className="text-xs text-destructive-foreground bg-destructive/90 rounded px-2 py-1 mt-1" />
                  </FormItem>
                )}
              />
            </div>

            <Button
              type="submit"
              size="icon"
              className="rounded-full w-14 h-14 bg-primary hover:bg-accent shadow-lg flex-shrink-0"
              onClick={handleCallButtonClick}
              disabled={isSubmitting}
              aria-label={
                isCallInputOpen ? "Iniciar llamada" : "Abrir campo de teléfono"
              }
            >
              {isSubmitting ? (
                <Loader2 className="h-7 w-7 animate-spin" />
              ) : isCallInputOpen ? (
                <PhoneOutgoing className="h-6 w-6" />
              ) : (
                <Phone className="h-7 w-7" />
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  );
}
