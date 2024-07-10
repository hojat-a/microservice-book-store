import Redis from 'ioredis';
export const redisProviders = [
  {
    provide: 'REDIS_CONNECTION',
    useFactory: () =>
      new Redis(process.env["REDIS_PORT"]),
  },
];