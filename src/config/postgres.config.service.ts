import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";
import { ProdutoEntity } from "src/produto/produto.entity";
import { UsuarioEntity } from "src/usuario/usuario.entity";

@Injectable()
export class PostgresConfigService implements TypeOrmOptionsFactory{

    constructor(private configService: ConfigService) {}

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: "postgres",
            host: this.configService.get<string>('DB_HOST'),
            port:  this.configService.get<number>('DB_PORT'),
            username: this.configService.get<string>('DB_USER'),
            password: this.configService.get<string>('DB_PASSWORD'),
            database: this.configService.get<string>('DB_NAME'),
            entities: [UsuarioEntity, ProdutoEntity],
            synchronize: true
        }
    }
}