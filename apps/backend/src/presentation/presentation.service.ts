import { Injectable } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import defaultTemplates from './templates/defaultTemplates.json';
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

    const slideInfo = {
      "0_на_тысяч_или_сентября": {
        "slide_text": "\"[\\\"До 8 сентября москвичи, зарегистрированные на розыгрыш, могут получить 15 тыс. баллов в одной из категорий («Путешествия и культура», «Техника для дома» или «Спорт»). Реставрация памятника архитектуры завершена, список победителей и правила использования городских баллов доступны на сайте «Миллион призов». Голосование на выборах продолжается до 20:00 8 сентября без сбоев.\\\"]\"",
        "title": "\"[\\\"\\\\\\\"Программа дополнительных призов для москвичей: результаты реставрации памятника архитектуры и информация о голосовании на выборах\\\\\\\"\\\"]\"",
        "context": "Москвичи, зарегистрировавшиеся до 8 сентября на розыгрыш дополнительных призов, смогут претендовать на 15 тысяч баллов в одной из категорий: «Путешествия и культура», «Техника для дома» или «Спорт».  Специалисты отреставрировали кирпичную кладку, воссоздали декоративные элементы, привели в порядок мерлоны (зубцы), карнизы, своды и кровлю из керамического лемеха. В нише над проездной аркой установили художественное панно. Сейчас работы завершены, и горожане могут видеть преобразившийся памятник архитектуры. Список победителей и информацию о том, как потратить городские баллы, можно найти на сайте «Миллион призов».В электронном голосовании на выборах депутатов Московской городской Думы, муниципальных депутатов ТиНАО и района Куркино приняли участие уже 450 тысяч человек. Отдать свой голос можно до 20:00 8 сентября. В настоящее время система работает штатно, никаких сбоев или задержек в ее работе не зафиксировано.",
        "type": "ONE_TEXT",
        "images": [
          "fb4a841d-aa1a-4de5-bc18-3781e00760de.png"
        ]
      },
      "1_на_mos_mos ru_ru": {
        "slide_text": "\"[\\\"Участникам электронного голосования с полной/стандартной учетной записью на mos.ru доступны следующие возможности:\\\\n\\\\n1. Принять участие в розыгрыше акции #ВыбираемВместе2024.\\\\n2. Оставить свой голос через терминалы на избирательных участках (необходимо только паспорт).\\\\n3. Электронное голосование: выбор удобного участка; бумажный бюллетень для тех, кто подал заявление до 2 сентября.\\\\n\\\\nОнлайн-голосование доступно на elec.mos.ru без предварительной регистрации для пользователей с полной учетной записью на mos.ru. Бюллетень можно скачать в любой момент во время выборов.\\\"]\"",
        "title": "\"[\\\"\\\\\\\"Акция #ВыбираемВместе2024: Условия и способы участия в электронном голосовании в Москве\\\\\\\"\\\"]\"",
        "context": "Все участники электронного голосования с полной или стандартной учетной записью на mos.ru смогут принять участие в розыгрышах акции #ВыбираемВместе2024 — Москва.  Также отдать голос в электронном формате можно с помощью терминалов на избирательных участках. Для удобства москвичей в этом году их количество увеличили. Потребуется только паспорт. Избирательные участки открыты с 08:00 до 20:00 с 6 по 8 сентября. Для электронного голосования можно выбрать наиболее удобный из них. Бумажный бюллетень выдадут только по месту постоянной регистрации тем, кто до 2 сентября подал соответствующее заявление на mos.ru или в территориальной избирательной комиссии. Горожане могут проголосовать онлайн на специальной странице elec.mos.ru. Этот способ доступен пользователям, имеющим полную учетную запись на портале mos.ru. Предварительная регистрация не понадобится. Бюллетень можно загрузить в любое время в дни выборов.",
        "type": "TWO_TEXT",
        "images": [
          "a93242a7-f02b-4844-902d-f574fd97d055.png"
        ]
      }
    }

    for (const slide in slideInfo)
    {
      let slideCounter = 1
      slideInfo[slide]['slide_text'] = slideInfo[slide]['slide_text'].replace('\"]"', '').replace('"[\"', '')
      let newSlide = pres.addSlide();

      console.log(template)

      

      //add hashmap iteration

      console.log(template[slideInfo[slide]['type']])

      let images = []
      let figures = []
      let numbers = []
      let texts = []
      let titles = []
      let icons = []

      for (const element of template[slideInfo[slide]['type']].elements)
      {

        if(element.elementType == 'FIGURE')
          {
            console.log(element.figure.height / 192 / element.figure.borderRadius)
            figures.push(element)
          }

          if(element.elementType == 'icon')
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
          newSlide.addShape(pres.ShapeType.rect, {
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

  async saveFilesToS3(files: Express.Multer.File[])
  {

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
