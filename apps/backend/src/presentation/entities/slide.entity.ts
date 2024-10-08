import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SlideElement } from "./slideElement.entity";
import { Presentation } from "./presentation.entity";

@Entity()
export class Slide {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        nullable: true
    })
    slideType: SlideType;

    @Column({
        nullable: true
    })
    context: string;

    @OneToMany(() => SlideElement, (se) => se.slide, {
        eager: true,
        cascade: ['insert', 'update']

    })
    slideElements: SlideElement[] 

    @ManyToOne(() => Presentation, (p) => p.slides, {
        cascade: true
    })
    presentation: Presentation
}   

enum SlideType {
    Header = 'HEADER',
    BigNumbers = 'BIG_NUMBERS',
    Ending = 'ENDING',
    Chart = 'CHART',
    OneText = 'ONE_TEXT',
    TwoText = 'TWO_TEXT',
    ThreeText = 'THREE_TEXT',
  }