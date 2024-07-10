import Redlock from 'redlock';

export const redlockProvider = {
  provide: 'REDLOCK',
  useFactory: (redisClient) => {
    return new Redlock([redisClient], {
      // Redlock options
      driftFactor: 0.01,
      retryCount: 5,
      retryDelay: 200,
      retryJitter: 200,
    });
  },
  inject: ['REDIS_CONNECTION'],
};
