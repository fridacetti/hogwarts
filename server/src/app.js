import "dotenv/config";
import express from "express";
import housesRoutes from "./routes/houses.routes.js";
import teachersRoutes from "./routes/teachers.routes.js";
import studentsRoutes from "./routes/students.routes.js";
import coursesRoutes from "./routes/courses.routes.js";
import errorhandler from "./errorhandling/errorhandler.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Server kører på http://localhost:3000");

  app.use("/houses", housesRoutes); // sender alle requests med /houses, videre til housesRoutes
  app.use("/teachers", teachersRoutes); // sender alle requests med /teachers, videre til teachersRoutes
  app.use("/students", studentsRoutes); // sender alle requests med /students, videre til studentsRoutes
  app.use("/courses", coursesRoutes); // sender alle requests med /courses, videre til coursesRoutes

  app.use(errorhandler);
});
