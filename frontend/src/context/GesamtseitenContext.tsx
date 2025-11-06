// React Context API
// Daten die auf der ganzen Seite zur verfügung stehen
import { useState, createContext } from "react";

type KontextType = {
  sampleText: string;
  setSampleText: any; // jaja ..
  myToken: string | null;
  setMyToken: any; // jajaja ..
  role: string | null;
  setRole: any;
};

export const GesamtseitenContext = createContext<KontextType | null>(null);

export default function GesamtseitenContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  // Global vergügbare Daten hier erstellen:
  const [sampleText, setSampleText] = useState<string>(
    "Ich bin ein Sample Text. Juhe!"
  );
  const [myToken, setMyToken] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);

  // Global verfügbare Daten hier nochmal eintragen:
  const values = {
    sampleText,
    setSampleText,
    myToken,
    setMyToken,
    role,
    setRole,
  };

  return (
    <GesamtseitenContext.Provider value={values}>
      {children}
    </GesamtseitenContext.Provider>
  );
}
