import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StorageModule } from '../storage/storage.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { ServeStaticModule } from '@nestjs/serve-static';
import { PresentationModule } from '../presentation/presentation.module';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    AuthModule, 
    StorageModule,
    PresentationModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
