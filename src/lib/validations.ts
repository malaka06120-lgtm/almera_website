import { z } from "zod";

export const checkoutSchema = z.object({
  fullName: z.string().trim().min(3, "Please enter your full name"),
  phone: z
    .string()
    .trim()
    .regex(/^01[0125][0-9]{8}$/, "Enter a valid Egyptian phone number (e.g. 01012345678)"),
  governorate: z.string().min(1, "Please select your governorate"),
  city: z.string().trim().min(2, "Please enter your city"),
  address: z.string().trim().min(8, "Please enter your full address"),
  notes: z.string().trim().max(500).optional().or(z.literal("")),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your name"),
  email: z.string().trim().email("Enter a valid email address"),
  message: z.string().trim().min(10, "Message must be at least 10 characters"),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const loginSchema = z.object({
  email: z.string().trim().email("Enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginFormValues = z.infer<typeof loginSchema>;

export const productVariantSchema = z.object({
  id: z.string().optional(),
  sizeMl: z.number().int().positive("Size must be a positive number"),
  price: z.number().positive("Price must be greater than 0"),
  stockQuantity: z.number().int().min(0, "Stock can't be negative"),
});

export const productSchema = z.object({
  name: z.string().trim().min(2, "Name is required"),
  slug: z.string().trim().min(2, "Slug is required"),
  description: z.string().trim().min(10, "Description is required"),
  gender: z.enum(["men", "women", "unisex"]),
  categoryId: z.string().uuid("Select a category").nullable(),
  images: z.array(z.string().url()).min(1, "Add at least one image"),
  topNotes: z.array(z.string()),
  middleNotes: z.array(z.string()),
  baseNotes: z.array(z.string()),
  isFeatured: z.boolean(),
  isBestSeller: z.boolean(),
  isActive: z.boolean(),
  variants: z.array(productVariantSchema).min(1, "Add at least one size"),
});

export type ProductFormValues = z.infer<typeof productSchema>;
