import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserRequestDto } from './create-user-request.dto';
import { CreateUserEvent } from './create-user.event';

@Injectable()
export class AppService {
  private readonly user: any[] = [];

  constructor(
    @Inject('communication') private readonly communicationClient: ClientProxy,
    @Inject('ANALYTICS') private readonly analyticsClient: ClientProxy,
  ) {}

  getHello(): string {
    return 'Hello World!';
  }

  createUser(createUserRequestDto: CreateUserRequestDto) {
    this.user.push(createUserRequestDto);
    this.communicationClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequestDto.email),
    );
    this.analyticsClient.emit(
      'user_created',
      new CreateUserEvent(createUserRequestDto.email),
    );
  }

  getAnalytics() {
    const data = this.analyticsClient.send({ cmd: 'get_analytics' }, {});
    const sub = data.subscribe((data) => {
      console.log('res data', data);
      sub.unsubscribe();
    });
    return data;
  }
}
