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

    addToFavorites(event: Event): void {
        const imageInfo: ImageInfo = this.getImageInfo(event);

        if (!imageInfo)
            return;

        if (this.wasAddedToFavorites) {
            this.deleteFromLocalStorage(imageInfo);
        }
        else {
            this.saveToLocalStorage(imageInfo);
        }

        this.wasAddedToFavorites = !this.wasAddedToFavorites;
    }

    getImageInfo(event: Event): ImageInfo {
        const buttonElement: HTMLElement = event.currentTarget as HTMLElement;
        const imageCardElement: HTMLElement | null = buttonElement.closest('.image-card');
        const imageElement: HTMLElement | null | undefined = imageCardElement?.querySelector('img');

        if (!imageElement)
            throw new Error("Image element was not found.");

        const imageUrl: string = imageElement.getAttribute('data-imageUrl') ?? 'nothing found';
        const imageId: string = imageElement.getAttribute('data-image-id') ?? 'nothing found';

        return { 'imageUrl': imageUrl, 'imageId': imageId };
    }

    saveToLocalStorage(imageInfo: ImageInfo): void {
        this.favoritesService.saveToLocalStorage(imageInfo);
    }

    deleteFromLocalStorage(imageInfo: ImageInfo): void {
        this.favoritesService.deleteFromLocalStorage(imageInfo);
    }
}
