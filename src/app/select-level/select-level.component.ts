import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate } from '@angular/animations';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-select-level',
    templateUrl: './select-level.component.html',
    styleUrls: ['./select-level.component.scss'],
    standalone: true,
    imports: [CommonModule],
    animations: [
        trigger('fadeIn', [
            transition(':enter', [
                style({ opacity: 0, transform: 'translateY(10px)' }),
                animate('400ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
            ])
        ]),
        trigger('buttonHover', [
            transition(':enter', [
                style({ transform: 'scale(0.95)' }),
                animate('150ms ease-out', style({ transform: 'scale(1)' }))
            ])
        ])
    ]
})
export class SelectLevelComponent implements OnInit {
    showInstructions = false;

    constructor(private router: Router) {}

    ngOnInit() {
        // Podría cargar estadísticas del jugador o preferencias aquí
    }

    navigateToGuessWord(level: string) {
        // Añadir un efecto de sonido al hacer clic (opcional)
        // this.audioService.playButtonSound();

        this.router.navigate(['/guess-word'], {
            queryParams: {
                level,
                timestamp: new Date().getTime()
            }
        });
    }

    toggleInstructions() {
        this.showInstructions = !this.showInstructions;
    }
}
