import { z } from "zod";
export const productSchema = z
  .object({
    categoryId: z
      .string({ message: "ZOD sagt: Kategorie-ID must be a string" })
      .min(1),
    name: z
      .string({ message: "ZOD sagt: Name must be a string" })
      .min(2, { message: "ZOD sage: Mindestens 2 Zeichen länge" }),
    description: z
      .string({ message: "Beschreibung muss ein string sein" })
      .min(3, { message: "Beschreibungstext etwas länger bitte" }),
    price: z.number({ message: "Preis muss als Zahl angegeben werden" }),
  })
  .strict();
