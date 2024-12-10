import { 
    Entity, 
    Column, 
    CreateDateColumn, 
    UpdateDateColumn, 
    DeleteDateColumn, 
    PrimaryGeneratedColumn
} from 'typeorm'

@Entity({name: 'usuarios'})
export class UsuarioEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ name: 'name', length: 100, nullable: false })
    nome: string;

    @Column({ name: 'email', length: 70, nullable: false })
    email: string;

    @Column({ name: 'password', length: 255, nullable: false })
    password: string;

    @CreateDateColumn({ name: 'created_at' })
    created_at: string

    @UpdateDateColumn({ name: 'updated_at' })
    updated_at: string

    @DeleteDateColumn({ name: 'deleted_at' })
    deleted_at: string
}