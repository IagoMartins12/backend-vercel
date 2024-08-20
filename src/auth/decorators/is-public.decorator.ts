// is-public.decorator.ts

import { SetMetadata } from '@nestjs/common';

//Invocando a chave de is_public
export const IS_PUBLIC_KEY = process.env.IS_PUBLIC;

/*Criação do decorator IsPublic. Quando esse decorator é aplicado a uma rota, ele chama 
SetMetadata passando a chave IS_PUBLIC_KEY e o valor true, indicando que a rota é pública.*/
export const IsPublic = () => SetMetadata(IS_PUBLIC_KEY, true);
