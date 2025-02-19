import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { ImageInfo } from '../../interfaces/image-info.interface';
import { FavoritesServiceService } from '../../services/favorites-service.service';

@Component({
    selector: 'app-image-card',
    imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
    templateUrl: './image-card.component.html',
    styleUrl: './image-card.component.scss',
})
export class ImageCardComponent {
    @Input() imageUrl: string = '';
    @Input() imageId: string = '';

    wasAddedToFavorites: boolean = false;

    constructor(private favoritesService: FavoritesServiceService) { }

    updateFavoriteStatus (): void {
        if (!this.imageId || !this.imageUrl)
            return;

        if (this.wasAddedToFavorites) {
            this.deleteFromLocalStorage({ 'imageUrl': this.imageUrl, 'imageId': this.imageId });
        }
        else {
            this.saveToLocalStorage({ 'imageUrl': this.imageUrl, 'imageId': this.imageId });
        }

        this.wasAddedToFavorites = !this.wasAddedToFavorites;
    }

    saveToLocalStorage(imageInfo: ImageInfo): void {
        this.favoritesService.saveToLocalStorage(imageInfo);
    }

    deleteFromLocalStorage(imageInfo: ImageInfo): void {
        this.favoritesService.deleteFromLocalStorage(imageInfo);
    }
}
