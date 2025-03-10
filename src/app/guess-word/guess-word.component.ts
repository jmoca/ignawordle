import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { CommonModule, NgClass } from "@angular/common";
import { palabrasEasy } from '../words/easy';
import { palabrasIntermediate } from '../words/intermediate';
import { palabrasHard } from '../words/hard';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { WinDialogComponent } from "../win-dialog/win-dialog.component";
import { LoseDialogComponent } from "../lose-dialog/lose-dialog.component";
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

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
export class GuessWordComponent implements OnInit, OnDestroy {

    currentRow = 0;
    currentLetter = 0;
    answer: string = '';
    answerSize = 0;
    rows: string[] = ['', '', '', '', '', ''];
    rowResults: string[][] = [[], [], [], [], [], []];
    keyboardStatus: {[key: string]: string} = {};
    gameActive = true;

    keyboardRows = [
        ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', 'ñ'],
        ['Intro', 'z', 'x', 'c', 'v', 'b', 'n', 'm', '⌫'],
    ];
    difficulty: 'easy' | 'intermediate' | 'hard' = 'easy';
    private routeSub: Subscription | undefined;
    showHelp = false;


    Array = Array;

    constructor(private matDialog: MatDialog, private route: ActivatedRoute) {}

    ngOnInit(): void {

        this.routeSub = this.route.queryParams.subscribe(params => {
            if (params['level']) {
                this.difficulty = params['level'] as 'easy' | 'intermediate' | 'hard';
            }
            this.initializeGame();
        });
    }

    toggleHelp(): void {
        this.showHelp = !this.showHelp;
    }

    ngOnDestroy(): void {
        if (this.routeSub) {
            this.routeSub.unsubscribe();
        }
    }

    @HostListener('window:keydown', ['$event'])
    handleKeyDown(event: KeyboardEvent): void {
        if (!this.gameActive) return;

        const key = event.key.toLowerCase();

        if (/^[a-zñ]$/.test(key)) {
            this.addLetter(key);
        }
        else if (key === 'enter') {
            this.submitWord();
        }
        else if (key === 'backspace') {
            this.deleteLetter();
        }
    }

    initializeGame(): void {
        this.answer = this.getRandomWord();
        console.log('Palabra a adivinar:', this.answer);
        this.answerSize = this.answer.length;
        this.rows = Array(6).fill('');
        this.rowResults = Array(6).fill([]).map(() => []);
        this.currentRow = 0;
        this.currentLetter = 0;
        this.gameActive = true;
        this.resetKeyboardStatus();
    }

    resetKeyboardStatus(): void {
        for (const row of this.keyboardRows) {
            for (const key of row) {
                if (key !== 'Intro' && key !== '⌫') {
                    this.keyboardStatus[key] = '';
                }
            }
        }
    }

    addLetter(letter: string): void {
        if (this.currentLetter < this.answerSize && this.currentRow < this.rows.length && this.gameActive) {
            const updatedRow = this.rows[this.currentRow] + letter;
            this.rows[this.currentRow] = updatedRow;
            this.currentLetter += 1;
        }
    }

    deleteLetter(): void {
        if (this.currentLetter > 0 && this.currentRow < this.rows.length && this.gameActive) {
            const updatedRow = this.rows[this.currentRow].slice(0, -1);
            this.rows[this.currentRow] = updatedRow;
            this.currentLetter -= 1;
        }
    }

    submitWord(): void {
        if (this.currentLetter === this.answerSize && this.currentRow < this.rows.length && this.gameActive) {
            this.checkRowAccuracy(this.currentRow);
            this.currentRow += 1;
            this.currentLetter = 0;
        }
    }

    checkRowAccuracy(rowIndex: number): void {
        const guessedWord = this.rows[rowIndex];
        let rowAccuracyString = '';

        const answerCopy = [...this.answer];
        const guessedWordArray = [...guessedWord];
        const results = Array(this.answerSize).fill('');

        for (let i = 0; i < this.answerSize; i++) {
            if (guessedWordArray[i] === answerCopy[i]) {
                results[i] = 'g';
                answerCopy[i] = '#';
                guessedWordArray[i] = '*';
            }
        }

        for (let i = 0; i < this.answerSize; i++) {
            if (guessedWordArray[i] !== '*') {
                const index = answerCopy.indexOf(guessedWordArray[i]);
                if (index !== -1) {
                    results[i] = 'y';
                    answerCopy[index] = '#';
                } else {
                    results[i] = 'x';
                }
            }
        }

        this.rowResults[rowIndex] = results;

        this.updateKeyboardStatus(guessedWord, results);

        if (!results.includes('x') && !results.includes('y')) {
            this.gameActive = false;
            this.showWinDialog();
        } else if (rowIndex === 5) {
            this.gameActive = false;
            this.showLoseDialog();
        }
    }

    updateKeyboardStatus(word: string, results: string[]): void {
        for (let i = 0; i < word.length; i++) {
            const letter = word.charAt(i);
            const result = results[i];

            if (this.keyboardStatus[letter] !== 'g') {
                if (result === 'g' || (result === 'y' && this.keyboardStatus[letter] !== 'y')) {
                    this.keyboardStatus[letter] = result;
                } else if (result === 'x' && !this.keyboardStatus[letter]) {
                    this.keyboardStatus[letter] = 'x';
                }
            }
        }
    }

    handleKeyClick(key: string): void {
        if (!this.gameActive) return;

        if (key === 'Intro') {
            this.submitWord();
        } else if (key === '⌫') {
            this.deleteLetter();
        } else {
            this.addLetter(key);
        }
    }

    showWinDialog(): void {
        this.matDialog.open(WinDialogComponent, {
            disableClose: true,
            panelClass: 'custom-dialog',
            data: {
                word: this.answer,
                attempts: this.currentRow + 1
            }
        }).afterClosed().subscribe((res: string) => {
            if (res === 'restart') {
                this.initializeGame();
            }
        });
    }

    showLoseDialog(): void {
        this.matDialog.open(LoseDialogComponent, {
            disableClose: true,
            panelClass: 'custom-dialog',
            data: { word: this.answer }
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
