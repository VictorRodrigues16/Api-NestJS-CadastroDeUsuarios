import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UsuarioEntity } from "./usuario.entity";
import { Repository } from "typeorm";
import { listaUsuarioDTO } from "./dto/ListaUsuario.dto";
import { AtualizaUsuarioDTO } from "./dto/AtualizaUsuario.dto";

@Injectable()
export class UsuarioService {
    constructor(
        @InjectRepository(UsuarioEntity)
        private readonly  usuarioRepository: Repository<UsuarioEntity>
    ) {}

    async listaUsuarios(){
        const usuariosSalvos = await this.usuarioRepository.find()
        
        const usuariosLista = usuariosSalvos.map(
            (usuario) => new listaUsuarioDTO(usuario.id, usuario.nome)
        )

        return usuariosLista
    }

    async criaUsuario(UsuarioEntity: UsuarioEntity) {
        const newUser = await this.usuarioRepository.save(UsuarioEntity)
        return newUser
    }

    async atualizaUsuario(id: string, usuarioEntity: AtualizaUsuarioDTO){
        await this.usuarioRepository.update(id, usuarioEntity)
    }

    async deleteUsuario(id: string){
        await this.usuarioRepository.delete(id)
    }

    async emailExist (email: string) {
        const result = await this.usuarioRepository.findOne({where: {email: email}})
        return result
    }   
    
}