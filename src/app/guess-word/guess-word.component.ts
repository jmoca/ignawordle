import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    NgIf
  ]
})
export class GuessWordComponent {
  // Palabra a adivinar
  correctWord: string = 'MOUSE';
  guesses: string[][] = [
    ['', '', '', '', ''],
    ['', '', '', '', ''],
    ['', '', '', '', ''],
  ];
  currentRow: number = 0;
  feedback: string = '';

  checkGuess() {
    const guess = this.guesses[this.currentRow].join('').toUpperCase();
    if (guess === this.correctWord) {
      this.feedback = '¡Correcto!';
    } else {
      this.feedback = 'Intenta de nuevo';
      this.currentRow++;
      if (this.currentRow >= 3) {
        this.feedback = '¡Juego terminado!';
      }
    }
  }
}
