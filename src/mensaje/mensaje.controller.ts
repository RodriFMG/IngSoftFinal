import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { MensajeService } from './mensaje.service';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';

@Controller('mensajes')
export class MensajesController {
  constructor(private readonly mensajesService: MensajeService) {}

  @Post()
  create(@Body() createMensajeDto: CreateMensajeDto) {
    return this.mensajesService.create(createMensajeDto);
  }

  @Get()
  findAll() {
    return this.mensajesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.mensajesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateMensajeDto: UpdateMensajeDto,
  ) {
    return this.mensajesService.update(id, updateMensajeDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.mensajesService.remove(id);
  }

  @Get('usuario/:id')
  findByUsuario(@Param('id', ParseIntPipe) id: number) {
    return this.mensajesService.findByUsuario(id);
  }
}