import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  login(credentials: { email: string; password: string }): any {
    // TODO: Implement login functionality, e.g., validate user and issue a JWT
    console.log(credentials.email);
    return { message: 'Logged in', token: 'jwt-token' };
  }

  register(userData: any): any {
    // Implement registration functionality
    return { message: 'User registered', user: userData };
  }
}
