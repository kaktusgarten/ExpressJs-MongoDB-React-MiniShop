import { useActionState, useState, useEffect } from "react";

// Validierungsfunktion
function validateRegistration(data: Record<string, any>) {
  const errors: Record<string, string> = {};

  if (!data.firstName) errors.firstName = "Vorname ist erforderlich.";
  if (!data.lastName) errors.lastName = "Nachname ist erforderlich.";
  if (!data.email) errors.email = "E-Mail ist erforderlich.";
  if (!data.street) errors.street = "Straße ist erforderlich.";
  if (!data.houseNumber) errors.houseNumber = "Hausnummer ist erforderlich.";
  if (!data.postalCode) errors.postalCode = "PLZ ist erforderlich.";
  if (!data.city) errors.city = "Stadt ist erforderlich.";
  if (data.phone && !/^[0-9+\s()-]{6,}$/.test(data.phone))
    errors.phone = "Bitte gib eine gültige Telefonnummer ein.";

  return errors;
}

export default function FormChangeUserDataAdmin({ user, updateLocalUser }) {
  const [formValues, setFormValues] = useState({
    ...user,
    roles: user.roles ?? [],
  });

  // Immer, wenn user Prop sich ändert → FormState aktualisieren
  useEffect(() => {
    setFormValues((prev) => ({
      ...user,
      roles: user.roles ?? prev.roles ?? [],
    }));
  }, [user]);

  async function submitAction(_prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Record<string, any>;

    // Sicherstellen, dass roles aus formValues verwendet werden
    data.roles = formValues.roles ?? [];

    const validationErrors = validateRegistration(data);
    if (Object.keys(validationErrors).length > 0)
      return { errors: validationErrors, input: data };

    try {
      const res = await fetch(`http://localhost:3000/api/users/${user._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(data),
      });

      if (!res.ok) throw new Error("Update fehlgeschlagen");

      const updatedUser = await res.json();
      updateLocalUser(updatedUser); // User in Übersicht aktualisieren
      setFormValues({ ...updatedUser, roles: updatedUser.roles ?? [] }); // FormState direkt aktualisieren

      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button: "Update fehlgeschlagen. Bitte überprüfe deine Eingaben.",
        },
        input: data,
      };
    }
  }

  const [formState, formAction, isPending] = useActionState(submitAction, {});

  const possibleRoles = ["user", "admin", "moderator"];

  const fieldLabels: Record<string, string> = {
    firstName: "Vorname",
    lastName: "Nachname",
    email: "E-Mail",
    street: "Straße",
    houseNumber: "Hausnummer",
    postalCode: "PLZ",
    city: "Stadt",
    phone: "Telefonnummer",
  };

  return (
    <form action={formAction} className="userDataForm">
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">Benutzer bearbeiten</legend>

        {Object.entries(fieldLabels).map(([field, label]) => (
          <div key={field} className="mb-2">
            <label className="label mt-2">{label}</label>
            <input
              value={formValues[field] ?? ""}
              name={field}
              className="input w-full"
              disabled={isPending}
              onChange={(e) =>
                setFormValues({ ...formValues, [field]: e.target.value })
              }
            />
            {formState.errors?.[field] && (
              <p className="text-sm text-red-400">{formState.errors[field]}</p>
            )}
          </div>
        ))}

        {/* Rollen als Checkboxen */}
        <div className="mt-4">
          <span className="label mb-2 block">Rollen</span>
          <div className="flex gap-4">
            {possibleRoles.map((role) => (
              <label
                key={role}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  className="checkbox checkbox-primary"
                  checked={formValues.roles?.includes(role) ?? false}
                  disabled={isPending}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setFormValues({
                        ...formValues,
                        roles: [...(formValues.roles ?? []), role],
                      });
                    } else {
                      setFormValues({
                        ...formValues,
                        roles: (formValues.roles ?? []).filter(
                          (r) => r !== role
                        ),
                      });
                    }
                  }}
                  name="roles"
                />
                {role}
              </label>
            ))}
          </div>
          {formState.errors?.roles && (
            <p className="text-sm text-red-400 mt-1">
              {formState.errors.roles}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="btn btn-primary mt-4 w-full"
          disabled={isPending}
        >
          {isPending ? "wird gespeichert..." : "Speichern"}
        </button>

        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-2">{formState.errors.button}</p>
        )}
      </fieldset>
    </form>
  );
}
