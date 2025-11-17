import { useState } from "react";

export const NewProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    categoryId: "",
    images: [] as File[],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      // mehrere Files übernehmen
      setFormData({ ...formData, images: Array.from(e.target.files) });
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!formData.name) errs.name = "Name ist erforderlich.";
    if (!formData.description)
      errs.description = "Beschreibung ist erforderlich.";
    if (!formData.price) errs.price = "Preis ist erforderlich.";
    if (!formData.categoryId) errs.categoryId = "Kategorie ist erforderlich.";
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

    const fd = new FormData();
    fd.append("name", formData.name);
    fd.append("description", formData.description);
    fd.append("price", formData.price);
    fd.append("category", formData.categoryId);

    // mehrere Bilder anhängen
    formData.images.forEach((img) => {
      fd.append("image", img); // "image" MUSS mit Multer übereinstimmen
    });

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/products`, {
        method: "POST",
        body: fd,
        credentials: "include",
      });

      if (!res.ok) throw new Error("Product creation failed");

      setSuccess("✅ Produkt erfolgreich erstellt!");

      setFormData({
        name: "",
        description: "",
        price: "",
        categoryId: "",
        images: [],
      });
    } catch (err) {
      console.error(err);
      setSuccess("❌ Fehler beim Erstellen des Produkts.");
    }
  };

  return (
    <section className="pt-6">
      <h2 className="mb-3 text-xl">Neues Produkt anlegen</h2>

      <form onSubmit={submitForm}>
        <fieldset className="fieldset bg-base-200 border border-base-300 rounded-box p-4">
          <legend className="fieldset-legend">Produktdaten</legend>

          {/* Name */}
          <label className="label">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input w-full"
          />
          {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}

          {/* Beschreibung */}
          <label className="label mt-3">Beschreibung</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
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
            className="input w-full"
            min="0"
            step="0.01"
          />
          {errors.price && (
            <p className="text-red-500 text-sm">{errors.price}</p>
          )}

          {/* Kategorie */}
          <label className="label mt-3">Kategorie</label>
          <input
            name="categoryId"
            value={formData.categoryId}
            onChange={handleChange}
            className="input w-full"
          />
          {errors.categoryId && (
            <p className="text-red-500 text-sm">{errors.categoryId}</p>
          )}

          {/* Bild Upload: mehrere Bilder */}
          <fieldset className="fieldset mt-5">
            <legend className="fieldset-legend">Bilder hochladen</legend>

            <input
              type="file"
              name="image"
              className="file-input"
              accept="image/*"
              multiple
              onChange={handleFileChange}
            />

            {/* Vorschau */}
            {formData.images.length > 0 && (
              <div className="mt-3 flex gap-2 flex-wrap">
                {formData.images.map((img, idx) => (
                  <img
                    key={idx}
                    src={URL.createObjectURL(img)}
                    alt="preview"
                    className="w-24 h-24 object-cover rounded"
                  />
                ))}
              </div>
            )}
          </fieldset>

          <button type="submit" className="btn btn-primary mt-4 w-full">
            Produkt speichern
          </button>

          {success && <p className="mt-3 text-center">{success}</p>}
        </fieldset>
      </form>
    </section>
  );
};
