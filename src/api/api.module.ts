import { Module } from '@nestjs/common';
import { ApiService } from './api.service';
import { ApiController } from './api.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Api } from 'src/entities/Apit';

@Module({
  imports: [MikroOrmModule.forFeature([Api])],
  controllers: [ApiController],
  providers: [ApiService],
})
export class ApiModule {}
