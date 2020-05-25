import { Puntos } from './jpcanvas';

export class Matematicas {


  MinimoY(puntos: Puntos[]): number {
    let result = 0;

    for (const punto of puntos) {
      if (punto.y < result) {
        result = punto.y;
      }
    }

    return result;
  }

  MaximoY(puntos: Puntos[]): number {
    let result = 0;

    for (const punto of puntos) {
      if (punto.y > result) {
        result = punto.y;
      }
    }

    return result;
  }

  Redondeo(rr: number, digitos: number) {
    return Math.round(rr * Math.pow(10, digitos)) / Math.pow(10, digitos);
  }
}
