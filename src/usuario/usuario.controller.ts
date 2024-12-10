
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid'
import { listaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';

@Controller('/usuarios')
export class UsuarioController {

    constructor(private usuarioRepository: UsuarioRepository) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {

        const usuarioEntity = new UsuarioEntity(); 
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.senha = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioRepository.salvar(usuarioEntity)
       
         return {
            status: true,
            data: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso.'
        }
    }


    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioRepository.listar()
        const usuariosListas = usuariosSalvos.map(
            usuario => new listaUsuarioDTO(
                usuario.id,
                usuario.nome
            )
        )

        return usuariosListas
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id:string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualiado = await this.usuarioRepository.atualiza(id, novosDados)

        return {
            usuario: usuarioAtualiado,
            message: 'Usuário atualizado com sucesso.'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioRepository.remove(id)

        return{
            usuario: usuarioRemovido,
            message: 'Usuario removido com sucesso.'
        }
    }
}