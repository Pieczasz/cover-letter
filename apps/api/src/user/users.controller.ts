import { Body, Controller, Post, UseGuards, Request } from '@nestjs/common';
import { UserService } from './users.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
@UseGuards(AuthGuard('clerk'))
export class UsersController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async createUser(
    @Body() body: { userId: string; name: string; email: string },
    @Request() req,
  ) {
    return await this.userService.createUser(
      body.userId,
      body.name,
      body.email,
    );
  }
}
