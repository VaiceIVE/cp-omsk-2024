import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import defaultTemplates from './templates/defaultTemplates.json';
import resMock from './mocks/response.json'
import { IPresentation } from './interfaces/IPresentationTemplate';
import pptxgen from "pptxgenjs";
import { StorageService } from '../storage/storage.service';
@Injectable()
export class PresentationService {

  constructor(
    private storageService: StorageService,
){}

  async create(createPresentationDto: CreatePresentationDto) {
    
    let pres = new pptxgen();

    const template = defaultTemplates[createPresentationDto.style] as IPresentation

    //get slides info from ML api by sending context and some other data

    const slideInfo = resMock

    for (const slide in slideInfo)
    {
      let slideCounter = 1
      slideInfo[slide]['slide_text'] = slideInfo[slide]['slide_text'].replace('\"]"', '').replace('"[\"', '')
      let newSlide = pres.addSlide();

      console.log(slideInfo[slide]['slide_type'])

      console.log(template[slideInfo[slide]['slide_type']])

      let images = []
      let figures = []
      let numbers = []
      let texts = []
      let titles = []
      let icons = []

      for (const element of template[slideInfo[slide]['slide_type']].elements)
      {

        if(element.elementType == 'FIGURE')
          {
            console.log(element.figure.height / 192 / element.figure.borderRadius)
            figures.push(element)
          }

          if(element.elementType == 'ICON')
          {
            icons.push(element)
          }

          if(element.elementType == 'IMAGE')
          {
            images.push(element)
          }

            if(element.elementType == 'NUMERIC')
            {
              numbers.push(element)
            }
            if (element.elementType == 'HEADING')
            {
              titles.push(element)
            }
        if (element.elementType == 'TEXT')
          {
            texts.push(element)
          }
      }

      if(figures)
      {
        for(const element of figures)
        {
          newSlide.addShape(pres.ShapeType.roundRect, {
            x: element.position.x / 192, // 1,
            y: element.position.y / 192, // 1,
            w: element.figure.width / 192, // 15
            h: element.figure.height / 192, // 15
            fill: element.figure.backgroundColor,
            rectRadius: element.figure.height / 192 / element.figure.borderRadius
          })
        }
      }

      if(images)
        {
          for(const element of images)
          {
            newSlide.addImage({
              x: element.position.x / 192, // 1,
              y: element.position.y / 192, // 1,
              w: element.image.width / 192, // 15
              h: element.image.height / 192, // 15
              data: (await this.storageService.getFromS3ByName(slide['images'][0])).read()
            })
          }
        }

        if(icons)
          {
            for(const element of icons)
            {
              newSlide.addImage({
                x: element.position.x / 192, // 1,
                y: element.position.y / 192, // 1,
                w: element.image.width / 192, // 15
                h: element.image.height / 192, // 15
              })
            }
          }

        if(numbers)
          {
            for(const element of numbers)
            {
              newSlide.addText(slideCounter.toString(), {
                x: element.position.x / 192, // 1,
                y: element.position.y / 192, // 1,
                color: element.typeography.color,
                fontFace: element.typeography.fontFamily,
                bold: element.typeography.fontWeight == 700 ? true : false,
                fontSize: element.typeography.fontSize / 4,
                w: element.typeography.width / 192, // 15

              })
            }
          }

          if(titles)
            {
              for(const element of titles)
              {
                newSlide.addText(slideInfo[slide]['title'], {
                  x: element.position.x / 192, // 1,
                  y: element.position.y / 192, // 1,
                  color: element.typeography.color,
                  fontFace: element.typeography.fontFamily,
                  bold: element.typeography.fontWeight == 700 ? true : false,
                  fontSize: element.typeography.fontSize / 4,
                  //lineSpacing: element.typeography.lineHeight,
                  w: element.typeography.width / 192, // 15
              });
              }
            }

            if(texts)
              {
                for(const element of texts)
                {
                  newSlide.addText(slideInfo[slide]['slide_text'], {
                    x: element.position.x / 192, // 1,
                    y: element.position.y / 192, // 1,
                    color: element.typeography.color,
                    fontFace: element.typeography.fontFamily,
                    bold: element.typeography.fontWeight == 700 ? true : false,
                    fontSize: element.typeography.fontSize / 4,
                    //lineSpacing: element.typeography.lineHeight,
                    w: element.typeography.width / 192, // 15
                });
                }
              }

      slideCounter += 1
    }
    return await pres.stream() as Uint8Array
  }

  async handlePresentationPost(createPresentationDto: CreatePresentationDto, tables: Express.Multer.File[], doc: Express.Multer.File)
  {

    const tablesNames = this.storageService.uploadToS3Many(tables)

    const docsName = this.storageService.uploadToS3(doc)

    //get slides contents from ML API

    //save data to database

    //send presentation ID

  }

  async saveResponseToDatabase()
  {

  }

  findAll() {
    return `This action returns all presentation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} presentation`;
  }

  update(id: number, updatePresentationDto: UpdatePresentationDto) {
    return `This action updates a #${id} presentation`;
  }

  remove(id: number) {
    return `This action removes a #${id} presentation`;
  }
}
