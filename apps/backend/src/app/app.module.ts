import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { StorageModule } from '../storage/storage.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import ormconfig from '../ormconfig';
import { PresentationModule } from '../presentation/presentation.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormconfig as TypeOrmModuleOptions),
    AuthModule, 
    StorageModule,
    PresentationModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
