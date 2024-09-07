import { Slide } from "./slide.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation {

    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => Slide, (s) => s.presentation)
    slides: Slide[];

    @Column()
    templateId: number;
}
