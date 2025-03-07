import { Component, OnInit } from '@angular/core';
import {CommonModule, NgClass} from "@angular/common";
import { palabrasEasy } from '../words/easy';
import { palabrasIntermediate } from '../words/intermediate';
import { palabrasHard } from '../words/hard';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WinDialogComponent } from "../win-dialog/win-dialog.component";
import { LoseDialogComponent } from "../lose-dialog/lose-dialog.component";

@Component({
  selector: 'app-guess-word',
  standalone: true,
  imports: [
    NgClass,
    MatDialogModule,
    CommonModule,
  ],
  templateUrl: './guess-word.component.html',
  styleUrl: './guess-word.component.scss'
})
export class GuessWordComponent implements OnInit {

  currentRow = 0;
  currentLetter = 0;
  answer: string = '';
  answerSize = 0;
  rows: string[] = ['', '', '', '', '', ''];
  rowResults: string[][] = [[], [], [], [], [], []];

  keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm'],
  ];
  difficulty: 'easy' | 'intermediate' | 'hard' = 'easy';

  constructor(private matDialog: MatDialog) {}

  ngOnInit(): void {
    this.initializeGame();
  }

  initializeGame(): void {
    this.answer = this.getRandomWord();
    this.answerSize = this.answer.length;
    this.rows = ['', '', '', '', '', ''];
    this.rowResults = [[], [], [], [], [], []];
    this.currentRow = 0;
    this.currentLetter = 0;
  }

  addLetter(letter: string): void {
    if (this.currentLetter < this.answerSize && this.currentRow < this.rows.length) {
      this.rows[this.currentRow] += letter;
      this.currentLetter += 1;

      if (this.currentLetter === this.answerSize) {
        this.checkRowAccuracy(this.currentRow);
        this.currentRow += 1;
        this.currentLetter = 0;
      }
    }
  }

  checkRowAccuracy(rowIndex: number): void {
    const guessedWord = this.rows[rowIndex];
    let rowAccuracyString = '';

    for (let i = 0; i < this.answerSize; i += 1) {
      const currentChar = guessedWord.charAt(i);
      const doesCharacterExistInWord = this.answer.includes(currentChar);

      if (doesCharacterExistInWord) {
        const isCharacterInCorrectSpot = this.answer.charAt(i) === currentChar;

        if (isCharacterInCorrectSpot) {
          rowAccuracyString += 'g';
        } else {
          rowAccuracyString += 'y';
        }
      } else {
        rowAccuracyString += 'x';
      }
    }

    this.rowResults[rowIndex] = rowAccuracyString.split('');

    if (!(rowAccuracyString.includes('x') || rowAccuracyString.includes('y'))) {
      this.showWinDialog();
    } else {
      if (rowIndex === 5) {
        this.showLoseDialog();
      }
    }
  }

  showWinDialog(): void {
    this.matDialog.open(WinDialogComponent, {
      disableClose: true,
      panelClass: 'custom-dialog'
    }).afterClosed().subscribe((res: string) => {
      if (res === 'restart') {
        this.initializeGame();
      }
    });
  }

  showLoseDialog(): void {
    this.matDialog.open(LoseDialogComponent, {
      disableClose: true,
      panelClass: 'custom-dialog'
    }).afterClosed().subscribe((res: string) => {
      if (res === 'restart') {
        this.initializeGame();
      }
    });
  }


  getRandomWord(): string {
    let words: string[];
    switch (this.difficulty) {
      case 'easy':
        words = palabrasEasy;
        break;
      case 'intermediate':
        words = palabrasIntermediate;
        break;
      case 'hard':
        words = palabrasHard;
        break;
      default:
        words = palabrasEasy;
    }
    return words[Math.floor(Math.random() * words.length)];
  }
}
