import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/base.service';
import { Api } from 'src/entities/Apit';

@Injectable()
export class ApiService extends BaseService {
  Entity = Api;
}
