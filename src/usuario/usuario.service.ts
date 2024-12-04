import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  private prisma = new PrismaClient();

  async create(createUsuarioDto: CreateUsuarioDto) {

    let usuariocreado : CreateUsuarioDto;
    await this.prisma.usuario.create({
      data : {
        alias : createUsuarioDto.alias,
        nombre : createUsuarioDto.nombre
      }
    }).then(CreatedUser => {

    })

  }

  findAll() {
    return `This action returns all usuario`;
  }

  findOne(id: number) {
    return `This action returns a #${id} usuario`;
  }

  update(id: number, updateUsuarioDto: UpdateUsuarioDto) {
    return `This action updates a #${id} usuario`;
  }

  remove(id: number) {
    return `This action removes a #${id} usuario`;
  }
}
