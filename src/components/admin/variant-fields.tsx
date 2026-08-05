"use client";

import { useFieldArray, type Control, type UseFormRegister, type FieldErrors } from "react-hook-form";
import { Plus, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { ProductFormValues } from "@/lib/validations";

export function VariantFields({
  control,
  register,
  errors,
}: {
  control: Control<ProductFormValues>;
  register: UseFormRegister<ProductFormValues>;
  errors: FieldErrors<ProductFormValues>;
}) {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "variants",
  });

  return (
    <div className="flex flex-col gap-4">
      {fields.map((field, index) => (
        <div
          key={field.id}
          className="grid grid-cols-2 items-end gap-3 md:grid-cols-[1fr_1fr_1fr_auto]"
        >
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Size (ml)</Label>
            <Input
              type="number"
              {...register(`variants.${index}.sizeMl`, { valueAsNumber: true })}
              placeholder="50"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Price (EGP)</Label>
            <Input
              type="number"
              step="0.01"
              {...register(`variants.${index}.price`, { valueAsNumber: true })}
              placeholder="1500"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <Label className="text-xs">Stock</Label>
            <Input
              type="number"
              {...register(`variants.${index}.stockQuantity`, { valueAsNumber: true })}
              placeholder="20"
            />
          </div>
          <Button
            type="button"
            variant="outline"
            size="icon"
            onClick={() => remove(index)}
            disabled={fields.length === 1}
            aria-label="Remove size"
          >
            <Trash2 className="size-4" />
          </Button>
        </div>
      ))}

      {errors.variants?.message && (
        <p className="text-destructive text-xs">{errors.variants.message}</p>
      )}

      <Button
        type="button"
        variant="outline"
        size="sm"
        className="w-fit"
        onClick={() => append({ sizeMl: 50, price: 0, stockQuantity: 0 })}
      >
        <Plus className="size-4" /> Add Size
      </Button>
    </div>
  );
}
