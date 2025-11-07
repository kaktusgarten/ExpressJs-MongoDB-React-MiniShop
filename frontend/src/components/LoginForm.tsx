import { useNavigate } from "react-router";
import { useActionState, use } from "react";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

// einfache Hilfs-Validierung
function validateLogin(data: Record<string, string>) {
  const errors: Record<string, string> = {};

  if (!data.email) {
    errors.email = "E-Mail ist erforderlich.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Bitte gib eine gültige E-Mail-Adresse ein.";
  }

  if (!data.password) {
    errors.password = "Passwort ist erforderlich.";
  } else if (data.password.length < 6) {
    errors.password = "Passwort muss mindestens 6 Zeichen lang sein.";
  }

  return errors;
}

export default function LoginForm() {
  const { userData, setUserData } = use(GesamtseitenContext);
  const navigate = useNavigate();

  function goToRegister() {
    // Weiterleitung zur Registrierungsseite und Close Modal
    navigate("/registrierung");
    (
      document.getElementById("loginModal") as HTMLDialogElement | null
    )?.close();
  }

  // ACTION-FUNKTION (statt onSubmit)
  async function submitAction(_prevState: any, formData: FormData) {
    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      string
    >;
    const validationErrors = validateLogin(data);

    // Falls Validierung fehlschlägt → zurück an Formular
    if (Object.keys(validationErrors).length > 0) {
      return {
        errors: validationErrors,
        input: data,
      };
    }
    try {
      // Optional: Warten, um isPending zu testen
      // await new Promise((resolve) => setTimeout(resolve, 1000));

      const res = await fetch(`http://localhost:3000/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // <--- DAS FEHLTE
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        alert("Login leider fehlgeschlagen.");
        throw new Error("Login fehlgeschlagen");
      }

      const result = await res.json();

      // FETCH ME und schreibe in Gesamtseitencontext
      const fetchMe = async () => {
        try {
          const res = await fetch(`${import.meta.env.VITE_API_URL}/auth/me`, {
            credentials: "include", //  Weil Cookie genutzt wird
          });
          const data = await res.json();
          console.log(`User-Daten stehen jetzt im Gesamtseitencontext!`);
          setUserData(data.user);
        } catch (error) {
          console.log(error);
        }
      };
      await fetchMe();

      // Schließe Modal (wenn vorhanden)
      (
        document.getElementById("loginModal") as HTMLDialogElement | null
      )?.close();

      // Weiterleitung zur Startseite
      navigate("/");

      return {};
    } catch (error) {
      console.error(error);
      return {
        errors: {
          button: "Login fehlgeschlagen. Bitte überprüfe deine Daten.",
        },
        input: data,
      };
    }
  }

  // useActionState() Hook
  const [formState, formAction, isPending] = useActionState(submitAction, {});

  return (
    <form action={formAction}>
      <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
        <legend className="fieldset-legend">Login</legend>

        {/* EMAIL */}
        <label className="label">Email</label>
        <input
          defaultValue={formState.input?.email}
          name="email"
          type="email"
          placeholder="E-Mail"
          className="input w-[100%]"
          disabled={isPending}
          autoComplete="email"
        />
        {formState.errors?.email && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.email}</p>
        )}

        {/* PASSWORT */}
        <label className="label mt-3">Passwort</label>
        <input
          defaultValue={formState.input?.password}
          name="password"
          type="password"
          className="input w-[100%]"
          placeholder="Passwort"
          disabled={isPending}
          autoComplete="current-password"
        />
        {formState.errors?.password && (
          <p className="text-sm text-red-400 mt-1">
            {formState.errors.password}
          </p>
        )}

        <button
          type="submit"
          className="btn btn-primary mt-4"
          disabled={isPending}
        >
          {isPending ? "Anmelden..." : "Anmelden"}
        </button>
        {formState.errors?.button && (
          <p className="text-sm text-red-400 mt-1">{formState.errors.button}</p>
        )}

        <p className="text-lg m-3 pt-6">
          Du hast noch kein Konto?&nbsp; {"  "}
          <span
            className="underline cursor-context-menu"
            onClick={goToRegister}
          >
            Hier registrieren!
          </span>
        </p>
      </fieldset>
    </form>
  );
}
