import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { PresentationController } from './presentation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './entities/presentation.entity';
import { Slide } from './entities/slide.entity';
import { SlideElement } from './entities/slideElement.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Presentation, Slide, SlideElement]),
    StorageModule,

],
  controllers: [PresentationController],
  providers: [PresentationService],
})
export class PresentationModule {}
