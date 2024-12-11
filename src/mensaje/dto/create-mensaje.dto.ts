import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateMensajeDto {
  @IsNotEmpty()
  @IsString()
  contenido: string;

  @IsNotEmpty()
  @IsNumber()
  remitenteId: number;

  @IsNotEmpty()
  @IsNumber()
  destinatarioId: number;
}