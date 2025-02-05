import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-image-card',
    imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
    templateUrl: './image-card.component.html',
    styleUrl: './image-card.component.scss',
})
export class ImageCardComponent {
    @Input() imageUrl: string = '';

    addedtoLocalStorage: boolean = false;

    addToLocalStorage(): void {
        this.addedtoLocalStorage = !this.addedtoLocalStorage;
    }
}
