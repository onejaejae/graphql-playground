import { Injectable } from '@nestjs/common';
import { Configurations, DBConfig } from '.';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoilerConfigService {
  constructor(private readonly configService: ConfigService<Configurations>) {}

  getDBConfig(): DBConfig {
    return this.configService.getOrThrow('DB');
  }
}
