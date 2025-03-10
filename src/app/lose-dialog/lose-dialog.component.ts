import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import {Router} from "@angular/router";

@Component({
    selector: 'app-lose-dialog',
    standalone: true,
    imports: [
        CommonModule,
        MatDialogModule
    ],
    templateUrl: './lose-dialog.component.html',
    styleUrl: './lose-dialog.component.css',
})
export class LoseDialogComponent {
    constructor(
        public dialogRef: MatDialogRef<LoseDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: { word: string },
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
