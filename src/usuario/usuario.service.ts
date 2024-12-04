import {Injectable} from '@nestjs/common';
import {PrismaClient} from "@prisma/client";
import {UsuarioDto} from './dto/create-usuario.dto';
import {UpdateUsuarioDto} from './dto/update-usuario.dto';
import {SearchContactDTO} from "../Contactos/dto/contact.dto";

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


    return result.map((user) => ({
      id: user.id,
      alias: user.alias,
      DateCreated: user.createdAt,
      nombre: user.nombre
    }));

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


  async getContactsByAlias(alias: string){

    const user = await this.prisma.usuario.findUnique({
      where: { alias: alias },
    });

    if (!user) {
      throw new Error(`El usuario con alias '${alias}' no existe.`);
    }

    let contactos : SearchContactDTO[]

    await this.prisma.usuario.findUnique({
      where : { alias : alias },
      include : {contactos : true}
    }).then(UserContacts => {

      contactos = UserContacts["contactos"].map((contact) => ({
        alias : contact.alias,
        id : contact.id,
        DateTime: contact.createdAt
      }))

    })

    return contactos;

  }

  async getAllMensajesRecibidos(alias : string){


    const user = await this.prisma.usuario.findUnique({
      where: { alias: alias },
    });

    if (!user) {
      throw new Error(`El usuario con alias '${alias}' no existe.`);
    }

    const result = await this.prisma.usuario.findUnique({
      where : { alias : alias },
      include : { mensajesRecibidos : true }
    })

    return result["mensajesRecibidos"];

  }

}
