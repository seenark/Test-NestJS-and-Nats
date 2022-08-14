import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestController } from './test/test.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'Test',
        transport: Transport.NATS,
        options: {
          servers: ['nats://localhost:4222'],
        },
      },
    ]),
  ],
  controllers: [AppController, TestController],
  providers: [AppService],
})
export class AppModule {}
