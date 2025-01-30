import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { ImageCardComponent } from '../image-card/image-card.component';
import { ImageService } from '../../services/image-service.service';


@Component({
    selector: 'app-card-list',
    imports: [ImageCardComponent, CommonModule, RouterModule],
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.scss'
})
export class CardListComponent implements OnInit {
    listOfUrlsForImages: string[] = [];

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.loadMultipleImages(5);
    }

    loadSingleImage(): void {
        this.imageService.getRandomImage().subscribe({
            next: (blob: Blob) => {
                const imageUrl = URL.createObjectURL(blob);
                this.listOfUrlsForImages.push(imageUrl);
            },
            error: (err: Error) => {
                console.error('Error loading image: ', err);
            }
        });
    }

    loadMultipleImages(numberOfImagesToLoad: number): void {
        this.imageService.getMultipleImages(numberOfImagesToLoad).subscribe({
            next: (imagesAsBlob: Blob[]) => {
                imagesAsBlob.forEach((imageAsBlob: Blob) => this.listOfUrlsForImages.push(
                    URL.createObjectURL(imageAsBlob)
                ));

            },
            error: (err: Error) => {
                console.error('There was a problem loading multiple images: ', err);
            }
        });
    }
}
