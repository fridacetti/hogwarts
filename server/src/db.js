import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  host: process.env.PGHOST, // henter adressen til database gennem .env
  database: process.env.PGDATABASE, // henter navnet på database gennem .env
  user: process.env.PGUSER, // brugernavn i postgreSQL hentet gennem .env
  password: process.env.PGPASSWORD, // password til brugeren hentet gennem .env
});

export default pool;
