import { Column, Entity } from "typeorm";

@Entity({ name: 'produtos_caracteristicas' })
export class ProdutoCaracteristica {

    @Column({ name: 'name', length: 100, nullable: false})
    nome: string;

    @Column({ name: 'descricao', length: 100, nullable: false})
    descricao: string;
}