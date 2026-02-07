import dotenv from "dotenv";
dotenv.config();

import { z } from "zod";

export const env = z
  .object({
    PORT: z.coerce.number().default(3000),
    // MONGODB_URI: z.string().min(1),
    // MONGODB_DATABASE_NAME: z.string().min(1),
    DATABASE_HOST: z.string(),
    DATABASE_USER: z.string(),
    DATABASE_PASSWORD: z.string(),
    DATABASE_NAME: z.string(),
    // JWT_SECRET: z.string().min(1),
    // BASE_URL: z.string().url(),
  })
  .parse(process.env);
