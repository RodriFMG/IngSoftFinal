import {Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe} from '@nestjs/common';
import { ContactService } from './contact.service';
import { UpdateContactDto, ContactDto} from './dto/contact.dto';

@Controller('contact')
export class ContactController {
    constructor(private readonly contactService: ContactService) {}

    @Post()
    createContact(@Body() createContactDto: ContactDto) {
        return this.contactService.create(ContactDto);
    }

    @Get()
    findAllContacts() {
        return this.contactService.findAll();
    }

    @Get(':id')
    findOneContact(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.findOne(+id);
    }

    @Patch(':id')
    updateContact(@Param('id', ParseIntPipe) id: number, @Body() updateContactDto: UpdateContactDto) {
        return this.contactService.update(+id, updateContactDto);
    }

    @Delete(':id')
    removeContact(@Param('id', ParseIntPipe) id: number) {
        return this.contactService.remove(+id);
    }
}