import { Slide } from "./slide.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Presentation {
    slides: Slide[];
    id: number;
    templateId: number;
}
