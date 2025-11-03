import express from "express";
import cors from "cors";
import "#db";
import { Animal } from "#models";
import { postRoutes, productRoutes, userRoutes } from "#routes";
import { errorHandler } from "#middlewares";

const app = express();
const port = 3000;

// body-parser
app.use(express.json());
app.use(
  cors({
    origin: process.env.FRONTEND_URL, // erlaubt nur mein Frontend
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/product", productRoutes);

app.get("/", async (require, res) => {
  res.json({ message: "Server läuft mit API Request über Präfix /api/..." });
});

// Samples mit Mongoose Models Abfrage, direkt:
const allAnimals = await Animal.find();
app.get("/api/animals", async (req, res) => {
  const animals = await Animal.find();
  res.json({ response: animals });
});

app.use(errorHandler);

app.listen(port, () =>
  console.log(`Server läuft auf: http://localhost:${port}`)
);
