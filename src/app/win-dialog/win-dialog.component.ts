import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
    selector: 'app-win-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule
    ],
    templateUrl: './win-dialog.component.html',
    styleUrl: './win-dialog.component.css',
})
export class WinDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<WinDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { word: string, attempts: number },
        private router: Router
    ) {}

    restartGame(): void {
        this.dialogRef.close('restart');
    }

    goToMenu(): void {
        this.dialogRef.close('menu');
        this.router.navigate(['/select-level']);
    }
}
