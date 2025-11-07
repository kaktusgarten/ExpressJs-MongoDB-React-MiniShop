import { use } from "react";
import Products from "../components/Products";
import { GesamtseitenContext } from "../context/GesamtseitenContext";

export default function HomePage() {
  const { userData } = use(GesamtseitenContext);

  return (
    <>
      <main className="p-4">
        <h2 className="text-xl mb-6 text-[orange]">
          Hallo{" "}
          {userData?.firstName ?? "lieber Gastbesucher - Bitte melde dich an"}!
        </h2>
        <Products />
      </main>
    </>
  );
}
