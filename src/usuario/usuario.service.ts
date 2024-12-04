import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { UsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';

@Injectable()
export class UsuarioService {

  private prisma = new PrismaClient();

  async create(createUsuarioDto: UsuarioDto) {

    let usuariocreado : UsuarioDto;
    await this.prisma.usuario.create({
      data : {
        alias : createUsuarioDto.alias,
        nombre : createUsuarioDto.nombre
      }
    }).then(CreatedUser => {

      usuariocreado = {
        alias : CreatedUser.alias,
        nombre : CreatedUser.nombre,
        DateCreated : CreatedUser.createdAt,
        id : CreatedUser.id
      }

    })

    return usuariocreado;

  }

  async findAll() : Promise<UsuarioDto[]>{

    const result = await this.prisma.usuario.findMany()


    const usuarios : UsuarioDto[] = result.map((user) => ({
      id : user.id,
      alias : user.alias,
      DateCreated : user.createdAt,
      nombre : user.nombre
    }))

    return usuarios;

  }

  async findOne(id: number) {

    let User : UsuarioDto;
    await this.prisma.usuario.findUnique({
      where : {id : id}
    }).then(usuario => {

      User = {
        id: usuario.id,
        nombre : usuario.nombre,
        alias : usuario.alias,
        DateCreated : usuario.createdAt
      }

    })

    return User;

  }

  async update(id: number, updateUsuarioDto: UpdateUsuarioDto) {

    let ContentActu : UpdateUsuarioDto;

    await this.prisma.usuario.update({
      where : {id : id},
      data : updateUsuarioDto
    }).then(updateUser => {

      ContentActu = {
        alias : updateUser.alias,
        nombre : updateUser.nombre
      }

    })

    return ContentActu;


  }

  async remove(id: number) {

    let User : UsuarioDto;

    await this.prisma.usuario.delete({
      where : {id : id}
    }).then(deleteuser =>{

      User = {
        id : deleteuser.id,
        alias : deleteuser.alias,
        nombre : deleteuser.nombre,
        DateCreated : deleteuser.createdAt
      }

    })


    return User;

  }


  async addContact(id1 : number, id2 : number){


  }

}
