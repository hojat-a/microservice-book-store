import { Global, Module } from '@nestjs/common';
import { redisProviders } from './redis/redisdb.provider';

@Global()
@Module({
  providers: [...redisProviders],
  exports: [...redisProviders],
})
export class DatabaseModule {}