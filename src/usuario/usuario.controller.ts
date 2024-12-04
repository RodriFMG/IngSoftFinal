import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) {}

  @Post()
  createUser(@Body() createUsuarioDto: CreateUsuarioDto) {
    return this.usuarioService.create(createUsuarioDto);
  }

  @Get()
  findAllUsers() {
    return this.usuarioService.findAll();
  }

  @Get(':id')
  findOneUser(@Param('id') id: string) {
    return this.usuarioService.findOne(+id);
  }

  @Patch(':id')
  updateUser(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(+id, updateUsuarioDto);
  }

  @Delete(':id')
  removeUser(@Param('id') id: string) {
    return this.usuarioService.remove(+id);
  }
}
