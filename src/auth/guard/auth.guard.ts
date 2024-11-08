import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { GqlContextType, GqlExecutionContext } from '@nestjs/graphql';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from '../auth.service';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService,
  ) {}
  async canActivate(context: ExecutionContext) {
    let payload: string;
    let value, req;
    if (context.getType<GqlContextType>() === 'graphql') {
      let ctx = GqlExecutionContext.create(context).getContext();
      req = ctx.req;
      payload = req.cookies['auth'];
      if (!payload) {
        throw new HttpException(
          'you shold register,there is no cookie',
          HttpStatus.UNAUTHORIZED,
        );
      }
    } else {
      req = context.switchToHttp().getRequest();
      payload = req.cookies['auth'];
      if (!payload) {
        throw new HttpException(
          'you shold register,there is no cookie',
          HttpStatus.UNAUTHORIZED,
        );
      }
    }
    value = this.verifyToken(payload);
    console.log(value);
    const user = await this.authService.findById(value.userId);
    req.user = user;
    return true;
  }
  verifyToken(token: string) {
    try {
      return this.jwtService.verify(token);
    } catch (err) {
      throw new HttpException(
        err,
        err.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
