import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-select-level',
  templateUrl: './select-level.component.html',
  styleUrls: ['./select-level.component.scss'],
  standalone: true,
})
export class SelectLevelComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}
  navigateToGuessWord(level: string) {
    this.router.navigate(['/guess-word'], { queryParams: { level } });
  }
}
