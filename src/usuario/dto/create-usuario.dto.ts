import {Type} from 'class-transformer'

export class UsuarioDto {

    id? : number;

    @Type(() => Date)
    DateCreated : Date;

    alias : string;
    nombre : string;

}
