import { Controller, Get, Post, Body, Patch, Param, Delete, StreamableFile, Header } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  @Header('Content-Type', 'application/vnd.openxmlformats-officedocument.presentationml.presentation')
  @Header('Content-Disposition', 'attachment; filename=presentation.pptx')
  async generate(@Body() createPresentationDto: CreatePresentationDto) {
    return new StreamableFile(await this.presentationService.create(createPresentationDto));
  }

  @Get()
  findAll() {
    return this.presentationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentationService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePresentationDto: UpdatePresentationDto) {
    return this.presentationService.update(+id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentationService.remove(+id);
  }
}
