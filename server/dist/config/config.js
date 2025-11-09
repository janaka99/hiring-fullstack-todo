import dotenv from "dotenv";
dotenv.config();
const config = {
    port: Number(process.env.PORT) || 3000,
    nodeEnv: process.env.NODE_ENV || "development",
    database_url: process.env.DATABASE_URI,
    origins: ["http://localhost:5173"],
};
export default config;
//# sourceMappingURL=config.js.map