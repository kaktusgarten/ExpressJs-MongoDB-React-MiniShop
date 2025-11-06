import { z } from "zod";
export const productSchema = z
  .object({
    categoryId: z
      .string({ message: "ZOD sagt: Kategorie-ID must be a string" }),
    name: z
      .string({ message: "ZOD sagt: Name must be a string" })
      .min(2, { message: "ZOD sage: Mindestens 2 Zeichen länge" }),
    description: z
      .string({ message: "ZOD sagt: Beschreibung muss ein string sein" })
      .min(3, { message: "ZOD sagt: Beschreibungstext etwas länger bitte" }),
    price: z
      .number({ message: "ZOD sagt: Preis muss als Zahl angegeben werden" })
      .min(1, { message: "ZOD sagt: Der Preis ist min. 1"}),
  })
  .strict();
