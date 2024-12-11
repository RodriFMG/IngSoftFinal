import { Injectable, NotFoundException } from '@nestjs/common';
import {PrismaClient,} from '@prisma/client';
import { CreateMensajeDto } from './dto/create-mensaje.dto';
import { UpdateMensajeDto } from './dto/update-mensaje.dto';

@Injectable()
export class MensajeService {
  private prisma = new PrismaClient();
  

  async create(createMensajeDto: CreateMensajeDto) {
    // Verificar si el remitente y destinatario existen
    const remitente = await this.prisma.usuario.findUnique({
      where: { id: createMensajeDto.remitenteId },
    });
    const destinatario = await this.prisma.usuario.findUnique({
      where: { id: createMensajeDto.destinatarioId },
    });

    if (!remitente || !destinatario) {
      throw new NotFoundException('Remitente o destinatario no encontrado');
    }

    return this.prisma.mensaje.create({
      data: {
        contenido: createMensajeDto.contenido,
        remitente: { connect: { id: createMensajeDto.remitenteId } },
        destinatario: { connect: { id: createMensajeDto.destinatarioId } },
      },
      include: {
        remitente: true,
        destinatario: true,
      },
    });
  }

  async findAll() {
    return this.prisma.mensaje.findMany({
      include: {
        remitente: true,
        destinatario: true,
      },
    });
  }

  async findOne(id: number) {
    const mensaje = await this.prisma.mensaje.findUnique({
      where: { id },
      include: {
        remitente: true,
        destinatario: true,
      },
    });

    if (!mensaje) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }

    return mensaje;
  }

  async update(id: number, updateMensajeDto: UpdateMensajeDto) {
    const mensaje = await this.prisma.mensaje.findUnique({
      where: { id },
    });

    if (!mensaje) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }

    return this.prisma.mensaje.update({
      where: { id },
      data: updateMensajeDto,
      include: {
        remitente: true,
        destinatario: true,
      },
    });
  }

  async remove(id: number) {
    const mensaje = await this.prisma.mensaje.findUnique({
      where: { id },
    });

    if (!mensaje) {
      throw new NotFoundException(`Mensaje con ID ${id} no encontrado`);
    }

    return this.prisma.mensaje.delete({
      where: { id },
    });
  }

  async findByUsuario(usuarioId: number) {
    const usuario = await this.prisma.usuario.findUnique({
      where: { id: usuarioId },
    });

    if (!usuario) {
      throw new NotFoundException(`Usuario con ID ${usuarioId} no encontrado`);
    }

    return {
      enviados: await this.prisma.mensaje.findMany({
        where: { remitenteId: usuarioId },
        include: {
          destinatario: true,
        },
      }),
      recibidos: await this.prisma.mensaje.findMany({
        where: { destinatarioId: usuarioId },
        include: {
          remitente: true,
        },
      }),
    };
  }
}