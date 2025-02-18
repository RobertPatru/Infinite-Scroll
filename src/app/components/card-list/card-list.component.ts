import { Component, ElementRef, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ImageCardComponent } from '../image-card/image-card.component';
import { ImageService } from '../../services/image-service.service';
import { environment } from '../../environments/environment';


@Component({
    selector: 'app-card-list',
    imports: [ImageCardComponent, CommonModule, RouterModule, MatProgressSpinnerModule],
    templateUrl: './card-list.component.html',
    styleUrl: './card-list.component.scss',
    host: { '(window:scroll)': 'onScroll()' }
})

export class CardListComponent implements OnInit, OnDestroy {
    listOfUrlsForImages: string[] = [];
    loading: boolean = true;

    constructor(private imageService: ImageService) {
    }

    ngOnInit(): void {
        this.loadImagesBasedOnEnvironment();
    }

    loadMultipleImages(numberOfImagesToLoad: number): void {
        this.loading = true;

        this.imageService.getMultipleImages(numberOfImagesToLoad).subscribe({
            next: (imagesAsBlob: Blob[]) => {
                imagesAsBlob.forEach((imageAsBlob: Blob) => this.listOfUrlsForImages.push(
                    URL.createObjectURL(imageAsBlob)
                ));
                this.loading = false;
            },
            error: (err: Error) => {
                console.error('There was a problem loading multiple images: ', err);
                this.loading = false;
            }
        });
    }


    loadImagesBasedOnEnvironment(): void {
        if (environment.useMockedData) {
            this.loading = true;

            setTimeout(() => {
                this.listOfUrlsForImages.push(...this.imageService.getMockImages());
                this.loading = false;
            }, Math.random() * 1500);
        } else {
            this.loadMultipleImages(15);
        }
    }

    onScroll(): void  {
        if (this.loading) {
            return;
        }

        const distanceScrolledFromTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const scrollPercentage = (distanceScrolledFromTop + windowHeight) / documentHeight;

        if (scrollPercentage >= 0.7) {
            this.loadImagesBasedOnEnvironment();
        }
    }

    ngOnDestroy(): void {
    }
}
