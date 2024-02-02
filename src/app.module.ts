import { MikroOrmModule } from '@mikro-orm/nestjs';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Example } from './entities/Example';
import { RoleModule } from './role/role.module';
import { ApiModule } from './api/api.module';
import { AuthZModule, AUTHZ_ENFORCER } from 'nest-authz';
import * as casbin from 'casbin';
import MikroORMAdapter from 'mikro-orm-adapter';

@Module({
  imports: [
    MikroOrmModule.forRootAsync({
      imports: [ConfigModule.forRoot()],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return {
          strict: true,
          type: 'mysql',
          host: config.get('DB_HOST'),
          dbName: config.get('DB_NAME'),
          user: config.get('DB_USERNAME'),
          password: config.get('DB_PASSWORD'),
          entities: ['./dist/entities'],
          entitiesTs: ['./src/entities'],
          debug: Boolean(config.get('DB_DEBUG')),
          highlighter: new SqlHighlighter(),
        };
      },
    }),
    MikroOrmModule.forFeature([Example]),
    AuthZModule.register({
      imports: [ConfigModule],
      enforcerProvider: {
        provide: AUTHZ_ENFORCER,
        useFactory: async (configService: ConfigService) => {
          const adapter = await MikroORMAdapter.newAdapter({
            strict: true,
            type: 'mysql',
            host: configService.get('DB_HOST'),
            dbName: configService.get('DB_NAME'),
            user: configService.get('DB_USERNAME'),
            password: configService.get('DB_PASSWORD'),
            entities: ['./dist/entities'],
            entitiesTs: ['./src/entities'],
            debug: Boolean(configService.get('DB_DEBUG')),
            highlighter: new SqlHighlighter(),
            logger: (msg) => {
              console.log(msg);
            },
          });
          return casbin.newEnforcer('model.conf', adapter);
        },
        inject: [ConfigService],
      },
      usernameFromContext: (ctx) => {
        console.log('123123132');
        const request = ctx.switchToHttp().getRequest();
        const ret = request.user && request.user.id;
        console.log('ret', ret);
        return ret;
      },
    }),
    RoleModule,
    ApiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
