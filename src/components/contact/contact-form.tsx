"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, type ContactFormValues } from "@/lib/validations";
import { submitContactMessage } from "@/lib/actions/contact";

export function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  async function onSubmit(values: ContactFormValues) {
    const result = await submitContactMessage(values);
    if (result.success) {
      toast.success("Message sent — we'll be in touch soon.");
      reset();
    } else {
      toast.error(result.error);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
      <div className="flex flex-col gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" {...register("name")} placeholder="Your name" />
        {errors.name && (
          <p className="text-destructive text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email")}
          placeholder="you@example.com"
        />
        {errors.email && (
          <p className="text-destructive text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          rows={5}
          {...register("message")}
          placeholder="How can we help?"
        />
        {errors.message && (
          <p className="text-destructive text-xs">{errors.message.message}</p>
        )}
      </div>

      <Button type="submit" size="lg" disabled={isSubmitting}>
        {isSubmitting && <Loader2 className="size-4 animate-spin" />}
        Send Message
      </Button>
    </form>
  );
}
