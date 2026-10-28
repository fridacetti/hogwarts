import "dotenv/config";
import express from "express";
import housesRoutes from "./routes/houses.routes";
import teachersRoutes from "./routes/teachers.routes";
import studentsRoutes from "./routes/students.routes";
import coursesRoutes from "./routes/courses.routes";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/houses", housesRoutes);
app.use("/teachers", teachersRoutes);
app.use("/students", studentsRoutes);
app.use("/courses", coursesRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server kører på http://localhost:${PORT}`);
});
