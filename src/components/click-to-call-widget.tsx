"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Phone, Send, Loader2 } from "lucide-react";

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

export default function ClickToCallWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();

  const form = useForm<ClickToCallValues>({
    resolver: zodResolver(ClickToCallSchema),
    defaultValues: {
      phone: "",
    },
  });

  const { isSubmitting } = form.formState;

  const onSubmit = async (values: ClickToCallValues) => {
    const result = await clickToCall(values);

    if (result.success) {
      toast({
        title: "Llamada en curso",
        description: "Te estamos llamando...",
      });
      setIsOpen(false);
      form.reset();
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error || "No se pudo iniciar la llamada.",
      });
    }
  };

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!isOpen) {
      e.preventDefault();
      setIsOpen(true);
    }
    // If it's open, the default form submission is handled by the form's onSubmit
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-start gap-3"
        >
          <div
            className={cn(
              "transition-all duration-300 ease-in-out flex flex-col",
              isOpen ? "w-48 opacity-100" : "w-0 opacity-0"
            )}
            aria-hidden={!isOpen}
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
                        !isOpen && "hidden" // Ensure it's not tabbable when hidden
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
            onClick={handleButtonClick}
            disabled={isSubmitting}
            aria-label={isOpen ? "Iniciar llamada" : "Abrir campo de teléfono"}
          >
            {isSubmitting ? (
              <Loader2 className="h-7 w-7 animate-spin" />
            ) : isOpen ? (
              <Send className="h-6 w-6" />
            ) : (
              <Phone className="h-7 w-7" />
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}
