import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FormsModule } from '@angular/forms';

import { FavoritesServiceService } from '../../services/favorites-service.service';
import { ImageInfo } from '../../interfaces/image-info.interface';
import { ImageCardComponent } from "../image-card/image-card.component";

@Component({
    selector: 'app-favorite-list',
    imports: [CommonModule, ImageCardComponent, MatProgressSpinnerModule, FormsModule],
    templateUrl: './favorite-list.component.html',
    styleUrl: './favorite-list.component.scss'
})
export class FavoriteListComponent implements OnInit{
    listOfImages: ImageInfo[] = [];
    loading: boolean = true;
    isFavoriteListEmpty: boolean = false;

    constructor(private favoritesService: FavoritesServiceService) {}

    ngOnInit(): void {
        this.loadImagesFromLocalStorage();
    }

    loadImagesFromLocalStorage(): void {
        this.listOfImages = [...this.favoritesService.getImagesFromLocalStorage()];
        this.loading = false;
        
        if (this.listOfImages.length === 0) 
            this.isFavoriteListEmpty = true;
        else
            this.isFavoriteListEmpty = false;
    }

    reloadFavoriteList(changesMade: boolean): void {
        this.listOfImages = [];
        this.loadImagesFromLocalStorage();
    }
}
