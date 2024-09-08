import { Slide } from "./slide.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Slide, (s) => s.presentation, {
        eager: true,
        cascade: ['insert', 'update']
    })
    slides: Slide[];

    @Column({
        nullable: true
    })
    templateId: string;

    @Column({
        nullable: true
    })
    backgroundImageUrl: string;    
}
