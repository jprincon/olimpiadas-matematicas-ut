export class Utilidades {

  public letras = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  generarId() {
    let clave = '';
    const min = 0;
    const max = 25;

    for (let i = 1 ; i <= 16; i++) {
      clave = clave + this.letras[this.getRandomInt(min, max)];

      if (((i % 4) === 0) && (i < 16)) {
        clave = clave + '-';
      }
    }

    return clave;
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
