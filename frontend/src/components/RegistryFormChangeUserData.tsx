import { useActionState, useEffect, use, useState } from "react";
import { useNavigate } from "react-router";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

// Validierungsfunktion
function validateRegistration(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.firstName) errors.firstName = "Vorname ist erforderlich.";
  if (!data.lastName) errors.lastName = "Nachname ist erforderlich.";

  if (!data.email) {
    errors.email = "E-Mail ist erforderlich.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  if (!data.street) errors.street = "Straße ist erforderlich.";
  if (!data.houseNumber) errors.houseNumber = "Hausnummer ist erforderlich.";
  if (!data.postalCode) errors.postalCode = "PLZ ist erforderlich.";
  else if (!/^\d{4,5}$/.test(data.postalCode))
    errors.postalCode = "PLZ muss 4–5 Ziffern enthalten.";
  if (!data.city) errors.city = "Stadt ist erforderlich.";

  if (data.phone && !/^[0-9+\s()-]{6,}$/.test(data.phone)) {
    errors.phone = "Bitte gib eine gültige Telefonnummer ein.";
  }

  if (!data.password) {
    errors.password = "Passwort ist erforderlich.";
  } else if (data.password.length < 6) {
    errors.password = "Passwort muss mindestens 6 Zeichen lang sein.";
  }

  if (!data.password2) {
    errors.password2 = "Bitte wiederhole dein Passwort.";
  } else if (data.password !== data.password2) {
    errors.password2 = "Die Passwörter stimmen nicht überein.";
  }

  return errors;
}

// FORM #######################################
export default function RegistrationFormChangeUserData() {
  const { userData } = use(GesamtseitenContext);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true); // initial disabled

  // Formular aktivieren
  function enableInputForm() {
    if (disabled === true) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }

  // Submit Action
  async function submitAction(_prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;

    const validationErrors = validateRegistration(data);
    if (Object.keys(validationErrors).length > 0) {
      return { errors: validationErrors, input: data };
    }

    try {
      console.log("Registriere Benutzer:", data);

      const { password2, ...sendData } = data; // password2 nicht speichern
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(sendData),
      });

      if (!res.ok) throw new Error("Registrierung fehlgeschlagen");

      const result = await res.json();
      console.log("Registrierung erfolgreich:", result);

      await new Promise((resolve) => setTimeout(resolve, 500));
      navigate("/");
      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button:
            "Registrierung fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: data,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  useEffect(() => {
    console.log("UserDaten aus me im Login Form request");
    console.log("userDATA: ", userData);
  }, []);

  return (
    <form action={formAction} className="userDataForm">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">Deine Kontodaten</legend>

        <button
          type="button"
          className="btn btn-primary mb-4"
          onClick={enableInputForm}
        >
          Bearbeiten
        </button>

        {/* Vorname */}
        <label className="label">Vorname</label>
        <input
          defaultValue={formState.input?.firstName ?? userData.firstName}
          name="firstName"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Vorname"
          disabled={isPending || disabled}
        />
        {formState.errors?.firstName && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.firstName}
          </p>
        )}

        {/* Nachname */}
        <label className="label mt-2">Nachname</label>
        <input
          defaultValue={formState.input?.lastName ?? userData.lastName}
          name="lastName"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Nachname"
          disabled={isPending || disabled}
        />
        {formState.errors?.lastName && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.lastName}
          </p>
        )}

        {/* E-Mail */}
        <label className="label mt-2">E-Mail</label>
        <input
          defaultValue={formState.input?.email ?? userData.email}
          name="email"
          type="email"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="E-Mail-Adresse"
          disabled={isPending || disabled}
          autoComplete="email"
        />
        {formState.errors?.email && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.email}</p>
        )}

        {/* Straße */}
        <label className="label mt-2">Straße</label>
        <input
          defaultValue={formState.input?.street ?? userData.street}
          name="street"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Straße"
          disabled={isPending || disabled}
        />
        {formState.errors?.street && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.street}</p>
        )}

        {/* Hausnummer */}
        <label className="label mt-2">Hausnummer</label>
        <input
          defaultValue={formState.input?.houseNumber ?? userData.houseNumber}
          name="houseNumber"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Hausnummer"
          disabled={isPending || disabled}
        />
        {formState.errors?.houseNumber && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.houseNumber}
          </p>
        )}

        {/* PLZ */}
        <label className="label mt-2">PLZ</label>
        <input
          defaultValue={formState.input?.postalCode ?? userData.postalCode}
          name="postalCode"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="PLZ"
          disabled={isPending || disabled}
        />
        {formState.errors?.postalCode && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.postalCode}
          </p>
        )}

        {/* Stadt */}
        <label className="label mt-2">Stadt</label>
        <input
          defaultValue={formState.input?.city ?? userData.city}
          name="city"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Stadt"
          disabled={isPending || disabled}
        />
        {formState.errors?.city && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.city}</p>
        )}

        {/* Telefonnummer */}
        <label className="label mt-2">Telefonnummer (optional)</label>
        <input
          defaultValue={formState.input?.phone ?? userData.phone}
          name="phone"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Telefonnummer"
          disabled={isPending || disabled}
        />
        {formState.errors?.phone && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.phone}</p>
        )}

        {/* Passwort */}
        <label className="label mt-2">Passwort</label>
        <input
          defaultValue={formState.input?.password}
          name="password"
          type="password"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Passwort"
          disabled={isPending || disabled}
          autoComplete="new-password"
        />
        {formState.errors?.password && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.password}
          </p>
        )}

        <label className="label mt-2">Passwort wiederholen</label>
        <input
          defaultValue={formState.input?.password2}
          name="password2"
          type="password"
          className="input w-full"
          style={{
            border: isPending || disabled ? "1px solid gray" : "1px solid blue",
          }}
          placeholder="Passwort wiederholen"
          disabled={isPending || disabled}
          autoComplete="new-password"
        />
        {formState.errors?.password2 && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.password2}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
          disabled={isPending || disabled}
        >
          {isPending ? "wird gespeichert..." : "Speichern"}
        </button>
        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.button}</p>
        )}
      </fieldset>
    </form>
  );
}
