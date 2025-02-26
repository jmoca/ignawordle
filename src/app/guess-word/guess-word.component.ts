import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { palabrasEasy } from '../words/easy';
import { palabrasIntermediate } from '../words/intermediate';
import { palabrasHard } from '../words/hard';
import {IonicModule} from "@ionic/angular";

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    IonicModule
  ]
})
export class GuessWordComponent implements OnInit {
  palabraAdivinar: string = '';
  guesses: { letter: string; status: 'correct' | 'present' | 'absent' | '' }[][] = [];
  currentAttempt: number = 0;
  currentLetter: number = 0;
  maxAttempts: number = 6;
  keyboardState: { [key: string]: 'correct' | 'present' | 'absent' | '' } = {};
  keyboardRows: string[][] = [
    'QWERTYUIOP'.split(''),
    'ASDFGHJKLÑ'.split(''),
    'ZXCVBNM'.split('')
  ];

  private wordLists: { [key: string]: string[] } = {
    easy: palabrasEasy,
    intermediate: palabrasIntermediate,
    hard: palabrasHard
  };

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const level = params['level'] || 'easy';
      this.palabraAdivinar = this.getRandomWord(level);
      this.initializeGrid();
    });
  }

  getRandomWord(level: string): string {
    const words = this.wordLists[level] || [];
    return words.length > 0 ? words[Math.floor(Math.random() * words.length)] : '';
  }

  initializeGrid() {
    this.guesses = Array.from({ length: this.maxAttempts }, () =>
      new Array(this.palabraAdivinar.length).fill({ letter: '', status: '' })
    );
  }

  enterLetter(letter: string) {
    if (this.currentLetter < this.palabraAdivinar.length) {
      this.guesses[this.currentAttempt][this.currentLetter] = { letter, status: '' };
      this.currentLetter++;
    }
  }

  deleteLetter() {
    if (this.currentLetter > 0) {
      this.currentLetter--;
      this.guesses[this.currentAttempt][this.currentLetter] = { letter: '', status: '' };
    }
  }

  submitWord() {
    if (this.currentLetter === this.palabraAdivinar.length) {
      this.validateWord();
      this.currentAttempt++;
      this.currentLetter = 0;
    }
  }

  validateWord() {
    const currentWord = this.guesses[this.currentAttempt].map(c => c.letter);
    const wordArray = this.palabraAdivinar.split('');

    currentWord.forEach((letter, index) => {
      if (letter === wordArray[index]) {
        this.guesses[this.currentAttempt][index].status = 'correct';
        this.keyboardState[letter] = 'correct';
        wordArray[index] = '';
      }
    });

    currentWord.forEach((letter, index) => {
      if (wordArray.includes(letter) && this.guesses[this.currentAttempt][index].status !== 'correct') {
        this.guesses[this.currentAttempt][index].status = 'present';
        this.keyboardState[letter] = this.keyboardState[letter] !== 'correct' ? 'present' : 'correct';
        wordArray[wordArray.indexOf(letter)] = '';
      } else if (!this.palabraAdivinar.includes(letter)) {
        this.guesses[this.currentAttempt][index].status = 'absent';
        if (!this.keyboardState[letter]) {
          this.keyboardState[letter] = 'absent';
        }
      }
    });
  }

}
