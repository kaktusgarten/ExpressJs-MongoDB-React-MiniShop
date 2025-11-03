import mongoose from 'mongoose';

const MONGO_URI = process.env.MONGO_URI!;

try {
  const db = await mongoose.connect(MONGO_URI);
  console.log('Verbunden mit MongoDB');
  console.log(`Datenbankverbindung, DB: ${db.connection.name}`);
} catch (error) {
  console.error(' MongoDB Verbindungsfehler:', error);
  process.exit(1);
}