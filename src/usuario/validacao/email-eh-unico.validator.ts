import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { UsuarioRepository } from "../usuario.repository";
import { Injectable } from "@nestjs/common";
import { UsuarioService } from "../usuario.service";

@Injectable()
@ValidatorConstraint()
export class EmailEhUnicoValidator implements ValidatorConstraintInterface{

    constructor(
        private usuarioService: UsuarioService
    ) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const usuarioExiste = await this.usuarioService.emailExist(value)
        return !usuarioExiste
    }
   
    
}

export const EmailEhUnico = (opcoesDeValidacao: ValidationOptions) => {
    return (objeto: Object, propiedade: string) => {
        registerDecorator({
            target: objeto.constructor,
            propertyName: propiedade,
            options: opcoesDeValidacao,
            constraints: [],
            validator: EmailEhUnicoValidator
        })
    }
}