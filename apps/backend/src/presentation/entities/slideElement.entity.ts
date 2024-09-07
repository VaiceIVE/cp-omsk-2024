import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slide } from "./slide.entity";

@Entity()
export class SlideElement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    posX: number;

    @Column()
    posY: number;

    @Column({
        nullable: true
    })
    posZ: number;

    @Column({
        nullable: true
    })
    elementType: SlideElementType;

    @Column({
        nullable: true
    })    typo_fontFamily: string;

    @Column()
    typo_color: string;

    @Column({
        nullable: true
    })
    typo_fontWeight: number;

    @Column({
        nullable: true
    })
    typo_fontSize: number;

    @Column({
        nullable: true
    })
    typo_text: string;

    @Column({
        nullable: true
    })
    typo_width: number;

    @Column({
        nullable: true
    })
    image_width: number;

    @Column({
        nullable: true
    })
    image_height: number;

    @Column({
        nullable: true
    })
    image_url: string;

    @Column({
        nullable: true
    })
    chart_width: number;

    @Column({
        nullable: true
    })
    chart_height: number;

    @Column({
        nullable: true
    })
    chart_url: string;

    @Column({
        nullable: true
    })
    chart_type: string;

    @Column({
        nullable: true
    })
    fig_width: number;

    @Column({
        nullable: true
    })
    fig_height: number;

    @Column({
        nullable: true
    })
    fig_bgcolor: string;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 5,
        scale: 3
    })
    fig_border_radius: number;

    @ManyToOne(() => Slide, (slide) => slide.slideElements)
    slide: Slide;
}

enum SlideElementType {
    Text = 'TEXT',
    Image = 'IMAGE',
    Figure = 'FIGURE',
    Heading = 'HEADING',
    Icon = 'ICON',
    Numeric = 'NUMERIC'
  }