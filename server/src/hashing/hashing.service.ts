import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class HashingService {
  async hash(data: string, salt: number = 10): Promise<string> {
    return bcrypt.hash(data, salt);
  }

  async compare(data: string, hash: string): Promise<boolean> {
    return bcrypt.compare(data, hash);
  }
}
