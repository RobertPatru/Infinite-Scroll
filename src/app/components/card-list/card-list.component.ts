import { Component, OnDestroy, OnInit } from '@angular/core';
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
    styleUrl: './card-list.component.scss'
})

export class CardListComponent implements OnInit, OnDestroy {
    listOfUrlsForImages: string[] = [];
    loading: boolean = true;

    constructor(private imageService: ImageService) {
        this.loadImagesBasedOnEnvironment();
    }

    ngOnInit(): void {
        window.addEventListener('scroll', this.onScroll);

        this.loadImagesBasedOnEnvironment();
    }

    loadSingleImage(): void {
        this.loading = true;
        this.imageService.getRandomImage().subscribe({
            next: (blob: Blob) => {
                const imageUrl = URL.createObjectURL(blob);
                this.listOfUrlsForImages.push(imageUrl);
            },
            error: (err: Error) => {
                console.error('Error loading image: ', err);
            }
        });
        this.loading = false;
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
            }
        });
    }

    loadMockImages(): void {
        const mockImages: string[] = [
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
            "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752",
        ]

        this.loading = true;

        setTimeout(() => {
            this.listOfUrlsForImages.push(...mockImages);
            this.loading = false;
        }, 2000);
    }

    loadImagesBasedOnEnvironment(): void {
        if (environment.useMockedData) {
            this.loadMockImages();
        } else {
            this.loadMultipleImages(15);
        }
    }

    onScroll = (): void => {
        const distanceScrolledFromTop = document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentHeight = document.documentElement.scrollHeight;

        const scrollPercentage = (distanceScrolledFromTop + windowHeight) / documentHeight;

        if (scrollPercentage >= 0.7) {
            this.loadImagesBasedOnEnvironment();
        }
    }

    ngOnDestroy(): void {
        window.removeEventListener('scroll', this.onScroll);
    }
}
