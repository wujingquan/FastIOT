import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Example } from './entities/Example';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly em: EntityManager,
    @InjectRepository(Example)
    private readonly exampleRepository: EntityRepository<Example>,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('examples')
  async findAllExample() {
    return await this.exampleRepository.findAll();
  }

  @Get('examples/:id')
  async findOneExample(@Param('id') id) {
    return await this.exampleRepository.findOne({ id });
  }

  @Post('examples')
  async createExample(@Body() body) {
    const example = new Example();
    example.username = body.username;
    example.password = body.password;
    await this.em.persistAndFlush(example);
    return example;
  }

  @Post('/login')
  login() {
    return {
      success: true,
      data: {
        username: 'admin',
        roles: ['admin'],
        accessToken: 'eyJhbGciOiJIUzUxMiJ9.admin',
        refreshToken: 'eyJhbGciOiJIUzUxMiJ9.adminRefresh',
        expires: '2023/10/30 00:00:00',
      },
    };
  }

  @Get('/getAsyncRoutes')
  getAsyncRoutes() {
    return {
      success: true,
      data: [
        {
          path: '/permission',
          meta: {
            title: '权限管理',
            icon: 'lollipop',
            rank: 10,
          },
          children: [
            {
              path: '/permission/page/index',
              name: 'PermissionPage',
              meta: {
                title: '页面权限',
                roles: ['admin', 'common'],
              },
            },
            {
              path: '/permission/button/index',
              name: 'PermissionButton',
              meta: {
                title: '按钮权限',
                roles: ['admin', 'common'],
                auths: ['btn_add', 'btn_edit', 'btn_delete'],
              },
            },
          ],
        },
      ],
    };
  }
}
