export interface ISlideElement {
  id: number;
  position: {
    x: number;
    y: number;
    z: number;
  };
  elementType: SlideElementType;
  typeography: {
    fontFamily: string;
    color: string;
    fontWeight: number;
    fontSize: number;
    text: string;
  } | null;
  image: {
    width: number;
    height: number;
    url: string;
  } | null;
  chart: {
    width: number;
    height: number;
    url: string;
    charType: string;
  } | null;
  figure: {
    width: number;
    height: number;
    backgroundColor: string;
    borderRadius: number;
  } | null;
}

export enum SlideElementType {
  Text = 'TEXT',
  Image = 'IMAGE',
  Heading = 'HEADING',
}
