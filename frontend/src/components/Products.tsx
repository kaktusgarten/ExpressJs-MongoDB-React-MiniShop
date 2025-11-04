import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<object[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/product/`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      console.log(data);
    };
  }, []);

  return (
    <>
      <section className="pt-6">
        <h2 className="mb-2 text-3xl">Produkte:</h2>
        <div className="grid md:grid-cols-4 gap-5">
          <article className="border p-10">Ich bin ein Produkt</article>
          <article className="border p-10">Ich bin ein Produkt</article>
          <article className="border p-10">Ich bin ein Produkt</article>
          <article className="border p-10">Ich bin ein Produkt</article>
        </div>
      </section>
    </>
  );
}
