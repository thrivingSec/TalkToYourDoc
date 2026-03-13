import { z } from "zod";

const envSchema = z.object({
  NODE_ENV:z.string().min(1, 'ENV info is missing'),
  NEXT_AUTH_SECRET: z.string().min(1, "Next auth secret key is missing."),
  UPSTASH_REDIS_REST_URL: z.string().min(1, "Updtash_redis url is missing!"),
  UPSTASH_REDIS_REST_TOKEN: z
    .string()
    .min(1, "Upstash_redis api key is required."),
  COMPANY_EMAIL: z.string().min(1, "Company email is required."),
  COMAPNY_EMAIL_PASS: z.string().min(1, "Company email pass is required."),
  GOOGLE_API_KEY: z.string().min(1, "Google api key is required."),
  GOOGLE_MODEL: z.string().min(1, "Google model is required."),
  MONGO_DB: z.string().min(1, "Mongodb database url is missing"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.log("Error in env configuration!");
  process.exit(1);
}

export const env = Object.freeze(parsed.data);
