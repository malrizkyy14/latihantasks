import express from "express";
import taskRoutes from "./routes/taskroutes";

const app = express();
const PORT = 3000;

app.use(express.json());
app.use("/api/v1", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});