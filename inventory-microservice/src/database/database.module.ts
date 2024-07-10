import { Global, Module } from '@nestjs/common';
import { mongodbProviders } from './mongo/mongodb.provider';
import { redisProviders } from './redis/redisdb.provider';

@Global()
@Module({
  providers: [...mongodbProviders, ...redisProviders],
  exports: [...mongodbProviders, ...redisProviders],
})
export class DatabaseModule {}