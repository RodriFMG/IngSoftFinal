import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { ContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {

    private prisma = new PrismaClient();

    async create(createContactDto: ContactDto) {

        let usuariocreado : ContactDto;
        await this.prisma.contacto.create({
            data : {
                alias : createContactDto.alias,
            }
        }).then(CreatedContact => {

            usuariocreado = {
                alias : CreatedUser.alias,
                DateTime : CreatedContact.createdAt,
                id : CreatedUser.id
            }

        })

        return usuariocreado;

    }

    async findAll() : Promise<ContactDto[]>{

        const result = await this.prisma.contacto.findMany()


        const contactDtos : ContactDto[] = result.map((contact) => ({
            alias : contact.alias,
            DateTime : contact.createdAt,
            id : contact.id
        }))

        return contactDtos;

    }

    async findOne(id: number) {

        let contact : ContactDto;
        await this.prisma.contacto.findUnique({
            where : {id : id}
        }).then(contacto => {

            contact = {
                alias : contacto.alias,
                DateTime : contacto.createdAt,
                id : contacto.id
            }

        })

        return contact;

    }

    async update(id: number, updateContactDto: UpdateContactDto) {

        let ContentActu : UpdateContactDto;

        await this.prisma.contacto.update({
            where : {id : id},
            data : updateContactDto
        }).then(updatContact => {

            ContentActu = {
                alias : updatContact.alias
            }

        })

        return ContentActu;


    }

    async remove(id: number) {

        let Contacto : ContactDto;

        await this.prisma.contacto.delete({
            where : {id : id}
        }).then(contactDeleted =>{

            Contacto = {
                id : contactDeleted.id,
                alias : contactDeleted.alias,
                DateTime : contactDeleted.createdAt
            }

        })


        return Contacto;

    }



}
