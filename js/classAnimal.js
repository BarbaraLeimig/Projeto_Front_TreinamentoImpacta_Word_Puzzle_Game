// Classe Animal, que é base para a construção dos objetos dos animais dentro do jogo
export class Animal {
  constructor(img, color, word, sound) {
    this.img = img;
    this.color = color;
    this.word = word;
    this.sound = sound;
  }
}
