import { useState } from "react";

export const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name) errs.name = "Name ist erforderlich.";
    if (!formData.description)
      errs.description = "Beschreibung ist erforderlich.";
    if (!formData.price) errs.price = "Preis ist erforderlich.";
    if (!formData.categoryId)
      errs.categoryId = "Kategorie-ID ist erforderlich.";
    return errs;
  };

  const submitForm = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess("");
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          description: formData.description,
          price: Number(formData.price),
          category: formData.categoryId,
        }),
      });

      if (!res.ok) throw new Error("Fehler beim Erstellen des Produkts");

      setSuccess("✅ Produkt erfolgreich erstellt!");
      setFormData({ name: "", description: "", price: "", categoryId: "" });
    } catch (err) {
      console.error(err);
      setSuccess("❌ Es gab ein Problem beim Erstellen des Produkts.");
    }
  };

  return (
    <section className="pt-6">
      <h2 className="mb-3 text-xl">Neues Produkt anlegen</h2>
      <form onSubmit={submitForm}>
        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box border p-4">
          <legend className="fieldset-legend">Produktdaten</legend>

          {/* Name */}
          <label className="label">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Produktname"
            className="input w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Beschreibung */}
          <label className="label mt-3">Beschreibung</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Produktbeschreibung"
            className="textarea w-full"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description}</p>
          )}

          {/* Preis */}
          <label className="label mt-3">Preis (€)</label>
          <input
            name="price"
            type="number"
            value={formData.price}
            onChange={handleChange}
            placeholder="Preis"
            className="input w-full"
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          {/* Kategorie-ID */}
          <label className="label mt-3">Kategorie-ID</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            placeholder="Kategorie ObjectId"
            className="input w-full"
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId}</p>
          )}

          {/* Submit */}
          <button type="submit" className="btn btn-primary mt-4 w-full">
            Produkt speichern
          </button>

          {success && <p className="mt-3 text-center">{success}</p>}
        </fieldset>
      </form>
    </section>
  );
};
