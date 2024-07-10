import { Module } from '@nestjs/common';
import { OrdersModule } from './orders/orders.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'config.dev',
    }), OrdersModule, DatabaseModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
