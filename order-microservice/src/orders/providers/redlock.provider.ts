import Redlock from 'redlock';

export const redlock = {
  provide: 'REDLOCK',
  useFactory: (redisProvider) => {
    return new Redlock([redisProvider],
      {
        // Redlock options
        driftFactor: 0.01,
        retryCount: 5,
        retryDelay: 200,
        retryJitter: 200,
      })
  },
  inject: ['REDIS_CONNECTION'],
};