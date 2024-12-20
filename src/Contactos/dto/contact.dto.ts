import {Type} from 'class-transformer'


export class ContactDto{

    id? : number;
    alias : string;

    @Type(() => Date)
    DateTime? : Date;

    ContactId : number

}

export class SearchContactDTO{
    id? : number;
    alias : string;

    @Type(() => Date)
    DateTime? : Date;
}


export class UpdateContactDto{

    alias? : string;

}