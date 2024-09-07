import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Slide } from "./slide.entity";

@Entity()
export class SlideElement {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        type: "decimal",
        precision: 8,
        scale: 3
    })
    posX: number;

    @Column({
        type: "decimal",
        precision: 8,
        scale: 3
    })
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
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
    })
    typo_width: number;

    @Column({
        nullable: true
    })
    image_width: number;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
    })
    image_height: number;

    @Column({
        nullable: true
    })
    image_url: string;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
    })
    chart_width: number;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
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
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
    })
    fig_width: number;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 8,
        scale: 3
    })
    fig_height: number;

    @Column({
        nullable: true
    })
    fig_bgcolor: string;

    @Column({
        nullable: true,
        type: "decimal",
        precision: 8,
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