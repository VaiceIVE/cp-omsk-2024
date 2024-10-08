import { Body, Controller, Delete, Get, Param, Post, Res, StreamableFile, UploadedFile, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { StorageService } from './storage.service';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer'
import { Response } from 'express';
import { AccessTokenGuard } from '../auth/accessToken.guard';
import { ApiResponse } from '@nestjs/swagger';
@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}


  @ApiResponse({ status: 201, description: 'Запись успешно создана.'})
  @Post('table')
  @UseInterceptors(FileInterceptor('file'))
  public async setFileToS3(@UploadedFile() file: Express.Multer.File)
  {
    return await this.storageService.uploadToS3(file)
  }

  @ApiResponse({ status: 201, description: 'Запись успешно создана.'})
  @Post('tables')
  @UseInterceptors(FilesInterceptor('files'))
  public async setFilesToS3(@UploadedFiles() files: Express.Multer.File[])
  {
    return await this.storageService.uploadToS3Many(files)
  }

  @UseGuards(AccessTokenGuard)
  @Get('names')
  public async getNames(){
    return this.storageService.getNames()
  }

  @Get(':name')
  public async getByName(@Param() name: string){
    return new StreamableFile(await this.storageService.getFromS3ByName(name))
  }

  @UseGuards(AccessTokenGuard)
  @Delete(':name')
  public async removeObject(@Param('name') name: string)
  {
    return await this.storageService.deleteObject(name)
  }

  @Delete()
  public async removeObjects()
  {
    return await this.storageService.clearBucket()
  }
  @Post('test')
  @UseInterceptors(FilesInterceptor('file'))
  public async setFilesToS3Test(@UploadedFiles() files: Express.Multer.File[], @Res() res: Response)
  { 
    res.header('Content-disposition', 'attachment; filename=file.xlsx');
    //res.type('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    return new StreamableFile(await this.storageService.uploadToS3test(files))
  }
}
