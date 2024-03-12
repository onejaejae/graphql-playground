import { Injectable } from '@nestjs/common';
import { AppConfig, Configurations, DBConfig } from '.';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class BoilerConfigService {
  constructor(private readonly configService: ConfigService<Configurations>) {}

  getAppConfig(): AppConfig {
    return this.configService.getOrThrow('APP');
  }

  getDBConfig(): DBConfig {
    return this.configService.getOrThrow('DB');
  }
}
