import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import defaultTemplates from './templates/defaultTemplates.json';
import resMock from './mocks/response.json'
import { IPresentation } from './interfaces/IPresentationTemplate';
import pptxgen from "pptxgenjs";
import { StorageService } from '../storage/storage.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Slide } from './entities/slide.entity';
import { SlideElement } from './entities/slideElement.entity';
import { Presentation } from './entities/presentation.entity';

@Injectable()
export class PresentationService {

  constructor(
    private storageService: StorageService,
    @InjectRepository(Presentation)
    private presentationRepository: Repository<Presentation>,
    @InjectRepository(Slide)
    private slideRepository: Repository<Slide>,
    @InjectRepository(SlideElement)
    private slideElementRepository: Repository<SlideElement>
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
          // for(const element of images)
          // {
          //   console.log(slideInfo[slide])
          //   console.log(slideInfo[slide]['images'])
          //   newSlide.addImage({
          //     x: element.position.x / 192, // 1,
          //     y: element.position.y / 192, // 1,
          //     w: element.image.width / 192, // 15
          //     h: element.image.height / 192, // 15
          //     data: (await this.storageService.getFromS3ByName(slideInfo[slide]['images'][0])).read()
          //   })
          // }
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

  async handlePresentationPost(createPresentationDto: CreatePresentationDto, tables: Express.Multer.File[] = null, doc: Express.Multer.File = null)
  {

    const tablesNames = tables ? this.storageService.uploadToS3Many(tables) : null

    const docsName = doc ? this.storageService.uploadToS3(doc) : null

    const backendUrl = 'https://api.adera-team.ru'
    
    //get slides contents from ML API

    resMock // ML response in future

    //save data to database

    const presentationId = await this.saveResponseToDatabase(createPresentationDto)
    
    return presentationId
  }

  async saveResponseToDatabase(createPresentationDto: CreatePresentationDto,)
  {

    const backendUrl = 'https://api.adera-team.ru'

    const template = defaultTemplates[createPresentationDto.style] as IPresentation // get pres template to fill in ML data

    let slideCounter = 1

    let newSlides = []

    for(const slideId in resMock)
    {
      const slideInfo = resMock[slideId]

      if(('text_svg_pairs' in Object.keys(slideInfo)))
        {
          slideInfo['text_svg_pairs'] = Object.values(slideInfo['text_svg_pairs'])
        }
      
      // if(!('slide_type' in Object.keys(slideInfo)))
      //   {
      //     console.log('SLIDE TYPE NOT FOUND')
      //     console.log(slideInfo)
      //     continue
      //   }

      const slideTemplate = template[slideInfo['slide_type']]

      let newSlideElements = []

      for(const element of slideTemplate.elements)
      {
        let newElement = this.slideElementRepository.create()
        if(element.elementType == 'FIGURE')
        {
          newElement.posX = element.position.x 
          newElement.posY = element.position.y 
          newElement.posZ = element.position.z         

          newElement.fig_width = element.figure.width
          newElement.fig_height = element.figure.height
          newElement.fig_bgcolor = element.figure.backgroundColor
          newElement.fig_border_radius = element.figure.borderRadius
        }

        if (element.elementType == 'ICON')
        {
          if(!('text_svg_pairs' in Object.keys(slideInfo)))
            {
              continue
            }
          const svgName = slideInfo['text_svg_pairs'].pop()
          newElement.posX = element.position.x
          newElement.posY = element.position.y
          newElement.posZ = element.position.z         

          newElement.image_width = element.image.width
          newElement.image_height = element.image.height
          newElement.image_url = `${backendUrl}/static/${svgName}` 
        }

        if(element.elementType == 'IMAGE')
        {
          if(!('images' in Object.keys(slideInfo)))
          {
            continue
          }
          if(!slideInfo['images'])
          {
            continue
          }
          newElement.posX = element.position.x
          newElement.posY = element.position.y   
          newElement.posZ = element.position.z         
     
          newElement.image_width = element.image.width
          newElement.image_height = element.image.height
          newElement.image_url = `${backendUrl}/storage/${slideInfo['images'][0]}` 
        }

        if(element.elementType == 'NUMERIC')
        {
          newElement.posX = element.position.x
          newElement.posY = element.position.y     
          newElement.posZ = element.position.z         
          newElement.typo_color = element.typeography.color
          newElement.typo_fontFamily = element.typeography.fontFamily
          newElement.typo_fontWeight = element.typeography.fontWeight
          newElement.typo_fontSize = element.typeography.fontSize
          newElement.typo_width = element.typeography.width
          newElement.typo_text = slideCounter.toString()
        }

        if(element.elementType == 'HEADING')
        {

          newElement.posX = element.position.x
          newElement.posY = element.position.y
          newElement.posZ = element.position.z         
          newElement.typo_color = element.typeography.color
          newElement.typo_fontFamily = element.typeography.fontFamily
          newElement.typo_fontWeight = element.typeography.fontWeight
          newElement.typo_fontSize = element.typeography.fontSize
          newElement.typo_width = element.typeography.width
          newElement.typo_text = slideInfo['title']

        }

        if(element.elementType == 'TEXT')
        {
          newElement.posX = element.position.x
          newElement.posY = element.position.y 
          newElement.posZ = element.position.z         
    
          newElement.typo_color = element.typeography.color
          newElement.typo_fontFamily = element.typeography.fontFamily
          newElement.typo_fontWeight = element.typeography.fontWeight
          newElement.typo_fontSize = element.typeography.fontSize
          newElement.typo_width = element.typeography.width
          newElement.typo_text = slideInfo['slide_text']
        }
        await this.slideElementRepository.insert(newElement)
        newSlideElements.push(newElement)
      }
      let newSlide = this.slideRepository.create()
      newSlide.slideElements = newSlideElements
      newSlide.slideType = slideInfo['slide_type']
      await this.slideRepository.insert(newSlide)
      newSlides.push(newSlide)
      slideCounter += 1
    } 

    let newPresentation = this.presentationRepository.create()
    newPresentation.slides = newSlides
    const insertResponse = await this.presentationRepository.insert(newPresentation)

    console.log(newPresentation.slides.length)
    

    return insertResponse.identifiers[0]
  }

  async exportById(presentationId: number)
  { 

    const presentation = await this.presentationRepository.findOne({where: {id: presentationId}, relations: {slides: {slideElements: true}}})

    console.log(presentation.slides)
    console.log(await this.slideRepository.find())
    console.log(await this.slideRepository.find({relations: {slideElements: true}}))



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
