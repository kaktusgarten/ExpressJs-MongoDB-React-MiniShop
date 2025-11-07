import { useEffect, useState } from "react";
import { useParams } from "react-router";

export default function Products() {
  const { slug } = useParams<{ slug?: string }>();
  const [products, setProducts] = useState<object[] | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      const baseUrl = import.meta.env.VITE_API_URL;
      const url = slug
        ? `${baseUrl}/products/category/${slug}`
        : `${baseUrl}/products`;
      try {
        const res = await fetch(url, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.log("Fehler ist aufgetreten: " + error);
      }
    };

    getProducts();
  }, [slug]);

  return (
    <>
      <section className="pt-0">
        <h2 className="mb-2 text-3xl">
          {slug ? `Kategorie - ${products[0].categoryId?.name}` : "Produkte: "}
        </h2>
        <div className="grid md:grid-cols-4 gap-5 pt-3">
          {products?.map((product) => (
            <article
              key={product._id}
              className="border p-6 grid content-between"
            >
              <div className="pb-6">
                <h3 className="text-xl font-bold">{product.name}</h3>
                <p>{product.description}</p>
                <p className="font-semibold">Preis: {product.price} €</p>
                <p className="text-sm text-gray-500">
                  Kategorie: {product.categoryId?.name || "–"}
                </p>
              </div>
              <div className="flex gap-2">
                <input
                  min={1}
                  max={10}
                  defaultValue={1}
                  type="number"
                  placeholder="Stückzahl"
                  className="input max-w-5/12"
                />
                <button className="btn min-w-7/12">kaufen</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
