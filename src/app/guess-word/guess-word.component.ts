import { Component } from '@angular/core';
import {FormsModule} from "@angular/forms";
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

  ]
})
export class GuessWordComponent {
  private wordLists: { [key: string]: string[] } = {
    easy: palabrasEasy,
    intermediate: palabrasIntermediate,
    hard: palabrasHard
  };
  getRandomWord(level: string): string {
    const words = this.wordLists[level] || [];
    return words.length > 0 ? words[Math.floor(Math.random() * words.length)] : '';
  }
}
