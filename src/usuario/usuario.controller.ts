import {Controller, Get, Post, Body, Patch, Param, Delete, Query} from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import {UsuarioDto} from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  async createUser(@Body() createUsuarioDto: UsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  async findAllUsers() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  async findOneUser(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  async removeUser(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }

  @Get('/contactos')
  async getContactsByAlias(@Query('mialias') alias: string) {
    if (!alias) {
      throw new Error('El parámetro "mialias" es obligatorio.');
    }
    return this.usuarioService.getContactsByAlias(alias);
  }


  @Get('/recibidos')
  async getAllMensajesRecibidos(@Query('mialias') alias : string){

    if (!alias) {
      throw new Error('El parámetro "mialias" es obligatorio.');
    }
    return this.usuarioService.getAllMensajesRecibidos(alias);
  }



}
