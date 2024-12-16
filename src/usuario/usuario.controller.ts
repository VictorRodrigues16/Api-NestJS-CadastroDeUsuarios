
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UsuarioRepository } from './usuario.repository';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { UsuarioEntity } from './usuario.entity';
import { v4 as uuid } from 'uuid'
import { listaUsuarioDTO } from './dto/ListaUsuario.dto';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { UsuarioService } from './usuario.service';

@Controller('/usuarios')
export class UsuarioController {

    constructor(
        private usuarioService: UsuarioService
    ) {}

    @Post()
    async criaUsuario(@Body() dadosDoUsuario: CriaUsuarioDTO) {

        const usuarioEntity = new UsuarioEntity(); 
        usuarioEntity.nome = dadosDoUsuario.nome;
        usuarioEntity.email = dadosDoUsuario.email;
        usuarioEntity.password = dadosDoUsuario.senha;
        usuarioEntity.id = uuid();

        this.usuarioService.criaUsuario(usuarioEntity)
       
         return {
            status: true,
            data: new listaUsuarioDTO(usuarioEntity.id, usuarioEntity.nome),
            message: 'Usuario criado com sucesso.'
        }
    }


    @Get()
    async listaUsuarios() {
        const usuariosSalvos = await this.usuarioService.listaUsuarios()
        return usuariosSalvos
    }

    @Put('/:id')
    async atualizaUsuario(@Param('id') id:string, @Body() novosDados: AtualizaUsuarioDTO){
        const usuarioAtualiado = await this.usuarioService.atualizaUsuario(id, novosDados)

        return {
            usuario: usuarioAtualiado,
            message: 'Usuário atualizado com sucesso.'
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.usuarioService.deleteUsuario(id)

        return{
            usuario: usuarioRemovido,
            message: 'Usuario removido com sucesso.'
        }
    }
}