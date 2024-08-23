import { Controller, Post, UseGuards, Request, Res} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  //localstorage
  // @UseGuards(LocalAuthGuard)
  // @Post('/login')
  // async login(@Request() req) {
  //   return this.authService.login(req.user);

  // }

  //cookie
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req, @Res({ passthrough: true }) res) {
    const { accessToken } = await this.authService.login(req.user);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
    });
    return { message: 'Successfully logged in' };
  }
}