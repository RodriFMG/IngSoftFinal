import { Module } from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { MensajesController } from './mensaje.controller';

@Module({
  controllers: [MensajesController],
  providers: [MensajeService],
})
export class MensajeModule {}
