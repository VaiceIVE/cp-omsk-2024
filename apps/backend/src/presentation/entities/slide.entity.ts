import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SlideElement } from "./slideElement.entity";

@Entity()
export class Slide {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column()
    slideType: SlideType;

    @OneToMany(() => SlideElement, (se) => se.slide)
    SlideElements: SlideElement[] 
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