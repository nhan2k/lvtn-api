import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private readonly logger = new Logger();
  getHello(): string {
    return 'Hello World!';
  }
}
