// import { Logger } from '@nestjs/common';
// import {
//   OnGatewayConnection,
//   OnGatewayDisconnect,
//   OnGatewayInit,
//   SubscribeMessage,
//   WebSocketGateway,
//   WebSocketServer,
// } from '@nestjs/websockets';
// import { Order } from '@prisma/client';
// import { Server } from 'socket.io';

// @WebSocketGateway({ cors: true })
// export class OrderGateway
//   implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
// {
//   private readonly logger = new Logger(OrderGateway.name);

//   @WebSocketServer() server: Server;

//   @SubscribeMessage('newOrder')
//   handleNewOrder(order: Order) {
//     console.log('emitindo novo pedido', order);
//     this.server.emit('newOrder', order);
//   }
//   afterInit() {
//     this.logger.log('Initialized');
//   }

//   handleConnection(client: any, ...args: any[]) {
//     const { sockets } = this.server.sockets;

//     this.logger.log(`Client id: ${client.id} connected`);
//     this.logger.debug(`Number of connected clients: ${sockets.size}`);
//   }

//   handleDisconnect(client: any) {
//     this.logger.log(`Cliend id:${client.id} disconnected`);
//   }
// }
