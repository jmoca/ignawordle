import { Component, OnInit } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { palabrasEasy } from '../words/easy';
import { palabrasIntermediate } from '../words/intermediate';
import { palabrasHard } from '../words/hard';

@Component({
  selector: 'app-guess-word',
  templateUrl: './guess-word.component.html',
  styleUrls: ['./guess-word.component.css'],
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ]
})
export class GuessWordComponent implements OnInit {
  palabraAdivinar: string = '';
  guesses: string[][] = [];
  currentAttempt: number = 0;
  currentLetter: number = 0;
  maxAttempts: number = 6;
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
      new Array(this.palabraAdivinar.length).fill('')
    );
  }

  enterLetter(letter: string) {
    if (this.currentLetter < this.palabraAdivinar.length) {
      this.guesses[this.currentAttempt][this.currentLetter] = letter;
      this.currentLetter++;
    }
  }

  deleteLetter() {
    if (this.currentLetter > 0) {
      this.currentLetter--;
      this.guesses[this.currentAttempt][this.currentLetter] = '';
    }
  }

  submitWord() {
    if (this.currentLetter === this.palabraAdivinar.length) {
      this.currentAttempt++;
      this.currentLetter = 0;
    }
  }
}
