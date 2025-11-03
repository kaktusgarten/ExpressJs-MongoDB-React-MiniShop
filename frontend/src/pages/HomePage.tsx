import { useEffect, useState } from "react";
import Products from "../components/Products";

export default function HomePage() {
  const [animalData, setAnimalData] = useState();

  useEffect(() => {
    const getAnimals = async () => {
      try {
        console.log("GET ANIMALS:");
        const res = await fetch("http://localhost:3000/api/animals", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const resData = await res.json();
        console.log(resData);
        setAnimalData(resData.response);
      } catch (error) {
        console.log("Error: " + error);
      }
    };
    getAnimals();
  }, []);

  return (
    <>
      <main className="p-4">
        <div className="p-5">
          <Products />

          <section className="pt-10">
            Animals:
            {animalData?.map((animal: any, index: number) => (
              <p key={index}>
                {animal.name} : Tierart: {animal.art} : {animal.beschreibung}
              </p>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}
