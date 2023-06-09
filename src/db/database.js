import mongoose from "mongoose";

const connectionString =
  "mongodb+srv://ezequielM:admin@cluster0.rbgchkc.mongodb.net/ecommerce?retryWrites=true&w=majority";

mongodb: try {
  await mongoose.connect(connectionString);
  console.log("Conectado a la base de datos de MongoDB");
} catch (error) {
  console.log(error);
}