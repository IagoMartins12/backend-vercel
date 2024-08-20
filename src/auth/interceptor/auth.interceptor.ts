import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
export class SwaggerAuthInterceptor implements NestInterceptor {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!isPublic) {
      // Se a rota não for pública, precisamos adicionar o token de acesso aos cabeçalhos
      const jwtGuard = new JwtAuthGuard(this.reflector);
      jwtGuard.canActivate(context);
      const accessToken = request.user?.access_token; // Você precisa ajustar isso dependendo de como seu token é armazenado após a autenticação

      if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return next.handle();
  }
}
