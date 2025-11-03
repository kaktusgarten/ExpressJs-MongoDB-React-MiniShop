import { Types } from 'mongoose';
import { z } from 'zod';

export const userInputSchema = z
  .object({
    // Vorname (min. 2 Zeichen)
    firstName: z
      .string({ message: "Firstname must be a string" })
      .min(2, { message: "Firstname must have at least 2 characters" }),

    // Nachname (min. 2 Zeichen)
    lastName: z
      .string({ message: "Lastname must be a string" })
      .min(2, { message: "Lastname must have at least 2 characters" }),

    // E-Mail (gültiges E-Mail-Format + Pflichtfeld)
    email: z
      .string({ message: "Email must be a string" })
      .email({ message: "Invalid email format" }),

    // Straße (Pflicht)
    street: z
      .string({ message: "Street must be a string" })
      .min(1, { message: "Street is required" }),

    // Hausnummer (Pflichtfeld)
    houseNumber: z
      .string({ message: "House number must be a string" })
      .min(1, { message: "House number is required" }),

    // Postleitzahl (4-5 stellige Zahl muss validieren)
    postalCode: z
      .string({ message: "Postal code must be a string" })
      .regex(/^\d{4,5}$/, { message: "Postal code must be 4–5 digits" }),

    // Stadt (Pflicht)
    city: z
      .string({ message: "City must be a string" })
      .min(1, { message: "City is required" }),

    // Telefonnummer (optional, muss aber String sein)
    phone: z
      .string({ message: "Phone number must be a string" })
      .optional(),

    // Passwort (min. 6 Zeichen + Pflichtfeld)
    password: z
      .string({ message: "Password must be a string" })
      .min(6, { message: "Password must have at least 6 characters" }),
  })
  .strict();

export const postInputSchema = z
  .object({
    title: z
      .string({ error: 'title must be a string' })
      .min(5, { message: 'title must be at least 5 characters long' }),

    content: z
      .string({ error: 'Content must be a string' })
      .min(5, { message: 'content must be at least 5 characters long' }),

    author: z
      .string({ error: 'Author must be a string' })
      .min(24, { message: 'author (userId) is required' }),

    // createdAt: z.date().optional(),
    // updatedAt: z.date().optional(),
  })
  .strict();
