import { useEffect, useState } from "react";

export default function Products() {
  const [products, setProducts] = useState<object[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/products/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        console.log(data);
        setProducts(data);
      } catch (error) {
        console.log("Fehler ist aufgetreten: " + error);
      }
    };

    getProducts();
  }, []);

  return (
    <>
      <section className="pt-6">
        <h2 className="mb-2 text-3xl">Produkte:</h2>
        <div className="grid md:grid-cols-4 gap-5">
          {products?.map((product) => (
            <article key={product._id} className="border p-10">
              <h3 className="text-xl font-bold">{product.name}</h3>
              <p>{product.description}</p>
              <p className="font-semibold">Preis: {product.price} €</p>
              <p className="text-sm text-gray-500">
                Kategorie: {product.categoryId?.name || "–"}
              </p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
