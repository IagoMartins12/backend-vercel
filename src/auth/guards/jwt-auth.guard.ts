// jwt-auth.guard.ts
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator';

@Injectable()
//Guard de autenticação usado no NestJS para proteger rotas que exigem autenticação através de tokens JWT.
//Esse guard é passado como provider no app.module.ts, indicando que ele será utilizado em todas as rotas.
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Método canActivate, que verifica se o usuário tem permissão para acessar a rota.
  canActivate(context: ExecutionContext): Promise<boolean> | boolean {
    // Verifica se a rota é pública usando o Reflector para acessar os metadados definidos pelos decoradores.
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Se a rota for pública, retorna true, permitindo o acesso sem autenticação.
    if (isPublic) {
      return true;
    }

    // Se a rota não for pública, verifica a autenticação usando o AuthGuard padrão do NestJS Passport.
    const canActivate = super.canActivate(context);

    // Se o resultado da verificação for um booleano, retorna esse valor.
    if (typeof canActivate === 'boolean') {
      return canActivate;
    }

    // Se o resultado for uma Promise, trata possíveis erros de autenticação.
    const canActivatePromise = canActivate as Promise<boolean>;

    // Captura e trata erros de autenticação, lançando uma UnauthorizedException caso ocorra algum erro.
    return canActivatePromise.catch((error) => {
      if (error) {
        throw new UnauthorizedException(error.message);
      }

      throw new UnauthorizedException();
    });
  }
}
