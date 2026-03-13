// Redis connection singleton
import { env } from "@/shared/env";
import { Redis } from "@upstash/redis";

// Input and output types for redis

export type TempUser = {
  email:string;
  otp:number;
  name:string;
  password:string
}

// factory
function redisClient() {
  return new Redis({
    url: env.UPSTASH_REDIS_REST_URL,
    token: env.UPSTASH_REDIS_REST_TOKEN,
  });
}

type RedisClientSingleton = ReturnType<typeof redisClient>

const globalForRedis = global as unknown as {
  redis:RedisClientSingleton | undefined
}

const redis = globalForRedis.redis ? globalForRedis.redis : redisClient()

if(env.NODE_ENV !== 'production') globalForRedis.redis = redis

export default redis;