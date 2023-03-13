import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { validationSchemaForEnv } from './config/environment-variables';
import { PersistenceModule } from './persistence/persistence.module';
import { Web3Module } from 'nest-web3';

@Module({
  imports: [
    Web3Module.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('web3'),
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: validationSchemaForEnv,
    }),
    PersistenceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
