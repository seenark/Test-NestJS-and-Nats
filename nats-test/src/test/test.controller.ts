import { Controller, Logger } from '@nestjs/common';
import { MessagePattern, Transport } from '@nestjs/microservices';

@Controller('test')
export class TestController {
  private logger = new Logger(TestController.name);

  @MessagePattern('test', Transport.NATS)
  test(text: string) {
    this.logger.log(text);
  }
}
