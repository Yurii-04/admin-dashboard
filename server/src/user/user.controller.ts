import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { GetCurrentUserId } from '../common/decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  async getMe(@GetCurrentUserId() userId: string) {
    return this.userService.getMe(userId)
  }
}
