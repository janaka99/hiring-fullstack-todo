import dotenv from "dotenv";

dotenv.config();

interface Config {
  port: number;
  nodeEnv: string;
  database_url: string;
  origins: string[];
}

const config: Config = {
  port: Number(process.env.PORT) || 3000,
  nodeEnv: process.env.NODE_ENV || "development",
  database_url: process.env.DATABASE_URI!,
  origins: process.env.ORIGINS ? process.env.ORIGINS.split(",") : [],
};

export default config;
