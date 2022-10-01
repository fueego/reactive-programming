type Color = {
  r: number;
  g: number;
  b: number;
  a: number;
  roundA: number;
  hex: string;
  rgba: string;
};

export interface NewCategoryData {
  name: string;
  description: string;
  color: Color;
}
