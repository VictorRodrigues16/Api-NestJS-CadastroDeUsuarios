import { Injectable } from '@nestjs/common';
import { UsuarioEntity } from './usuario.entity';

@Injectable()
export class UsuarioRepository {
  private usuarios: UsuarioEntity[] = [];

  private buscaPorId(id: string) {
    const possivelUser = this.usuarios.find(
      (usuarioSalvo) => usuarioSalvo.id === id,
    );

    if (!possivelUser) {
      throw new Error('Usuário Não Existe');
    }

    return possivelUser;
  }

  async salvar(usuario: UsuarioEntity) {
    this.usuarios.push(usuario);
  }

  async listar() {
    return this.usuarios;
  }

  async existeComEmail(email: string) {
    const possivelUser = this.usuarios.find(
      (usuario) => usuario.email === email,
    );

    return possivelUser !== undefined;
  }

  async atualiza(id: string, dadosDeAtualização: Partial<UsuarioEntity>) {
    const usuario = this.buscaPorId(id);

    Object.entries(dadosDeAtualização).forEach(([chave, valor]) => {
      if (chave === id) {
        return;
      }
      usuario[chave] = valor;
    });

    return usuario;
  }

  async remove(id: string) {
    const usuario = this.buscaPorId(id);
    
    this.usuarios = this.usuarios.filter(
      usuarioSalvo => usuarioSalvo.id !== id
    )
    return usuario
  }
}
