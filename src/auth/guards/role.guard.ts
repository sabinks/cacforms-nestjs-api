import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from '../decorators/roles.decorator';

@Injectable()
export class RolesGuard extends AuthGuard('jwt') implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwt: JwtService,
  ) {
    super();
  }
  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get(Roles, context.getHandler());

    if (!roles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();
    if (request.headers.authorization) {
      const split = request.headers.authorization.split(' ');
      const decoded = this.jwt.verify(split[1], {
        secret: process.env.AUTH_SECRET,
      });
      return this.haveCommon(roles, decoded.role);
    }
    return false;
  }

  haveCommon(roles: string[], userRole: string) {
    return roles.includes(userRole);
  }
}
