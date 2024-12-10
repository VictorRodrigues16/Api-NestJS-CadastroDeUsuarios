import { IsEmail, IsNotEmpty, IsOptional, MinLength } from "class-validator";
import { EmailEhUnico } from "../validacao/email-eh-unico.validator";

export class AtualizaUsuarioDTO {

    @IsNotEmpty({ message: 'O nome não pode estar vazio'})
    @IsOptional()
    nome: string;

    @IsEmail(undefined, { message: 'E-mail Inválido!' })
    @EmailEhUnico({ message: 'Já Existe um usuário com este e-mail'})
    @IsOptional()
    email: string;

    @MinLength(6, { message: 'A senha precisa ter no mínimo 6 caracteres' })
    @IsOptional()
    senha: string;
}