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

    image_url: z.array(z.url()).optional(),
  })
  .strict();


export const authLoginSchema = z
  .object({
    email: z
      .string({ error: 'email must me a string' })
      .email({ message: 'email must be a valid email address' }),
    password: z
      .string({ error: 'password must be a string' })
      .min(1, { message: 'password is required' }),
  })
  .strict();

export const authRegisterSchema = z
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

    // Passwort (Vorraussetzungen + Pflichtfeld)
    password: z
      .string({ error: 'password must be a string' })
      .min(8, { message: 'password must be at least 8 characters long' })
      .max(64, { message: 'password must be at most 64 characters long' })
      .regex(/[a-z]/, { message: 'password must include a lowercase letter' })
      .regex(/[A-Z]/, { message: 'password must include an uppercase letter' })
      .regex(/\d/, { message: 'password must include a number' })
      .regex(/[^A-Za-z0-9\s]/, {
        message: 'password must include a special character',
      }),
  })
  .strict();

export const changePasswordSchema = z
  .object({
    currentPassword: z
      .string({ error: 'password must be a string' })
      .min(1, { message: 'current password is required' }),
    newPassword: z
      .string({ error: 'password must be a string' })
      .min(8, { message: 'password must be at least 8 characters long' })
      .max(64, { message: 'password must be at most 64 characters long' })
      .regex(/[a-z]/, { message: 'password must include a lowercase letter' })
      .regex(/[A-Z]/, { message: 'password must include an uppercase letter' })
      .regex(/\d/, { message: 'password must include a number' })
      .regex(/[^A-Za-z0-9\s]/, {
        message: 'password must include a special character',
      }),
    confirmNewPassword: z
      .string({ error: 'password must be a string' })
      .min(1, { message: 'confirm new password is required' }),
  })
  .refine((d) => d.newPassword === d.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'passwords must match',
  })
  .strict();
  
