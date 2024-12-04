import { Injectable } from '@nestjs/common';
import { PrismaClient } from "@prisma/client";
import { ContactDto, UpdateContactDto } from './dto/contact.dto';

@Injectable()
export class ContactService {

    private prisma = new PrismaClient();

    async create(createContactDto: ContactDto): Promise<ContactDto> {
        const createdContact = await this.prisma.contacto.create({
            data: {
                alias: createContactDto.alias,
                usuarioId: createContactDto.ContactId,
            },
        });

        return {
            alias: createdContact["alias"],
            DateTime: createdContact["createdAt"],
            id: createdContact["id"],
            ContactId: createdContact["usuarioId"],
        };
    }


    async findAll() : Promise<ContactDto[]>{

        const result = await this.prisma.contacto.findMany()


        const contactDtos : ContactDto[] = result.map((contact) => ({
            alias : contact.alias,
            DateTime : contact.createdAt,
            id : contact.id,
            ContactId : contact.usuarioId
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
                id : contacto.id,
                ContactId : contact.ContactId
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
                DateTime : contactDeleted.createdAt,
                ContactId : contactDeleted.usuarioId
            }

        })


        return Contacto;

    }


    async addContactToUser(alias: string, createContactDto: ContactDto, nombre : string) {

        let user = await this.prisma.usuario.findUnique({
            where: { alias },
        });

        if (!user) {
            user = await this.prisma.usuario.create({

                data: { alias : alias,
                nombre : nombre},
            });
        }

        const contact = await this.prisma.contacto.create({
            data: {
                alias: createContactDto.alias,
                usuarioId: user["id"],
            },
        });

        return {
            message: 'Contacto añadido con éxito.',
            contacto: {
                id: contact["id"],
                alias: contact["alias"],
                usuarioId: contact["usuarioId"],
            },
        };
    }

}