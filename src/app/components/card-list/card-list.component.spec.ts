import { ComponentFixture, TestBed } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { CardListComponent } from './card-list.component';
import { ImageService } from '../../services/image-service.service';

describe('CardListComponent', () => {
    let component: CardListComponent;
    let fixture: ComponentFixture<CardListComponent>;
    let mockImageService: jasmine.SpyObj<ImageService>;
    let spyConsoleError: jasmine.SpyObj<any>;

    beforeEach(async () => {
        mockImageService = jasmine.createSpyObj('ImageService', ['getRandomImage', 'getMultipleImages']);

        await TestBed.configureTestingModule({
            imports: [CardListComponent],
            providers: [
                { provide: ImageService, useValue: mockImageService },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CardListComponent);
        component = fixture.componentInstance;
    });

    it('should load a single image', () => {
        const mockBlobImage = new Blob(['mockImageData'], { type: 'image/png' });

        mockImageService.getRandomImage.and.returnValue(of(mockBlobImage));
        component.loadSingleImage();

        expect(mockImageService.getRandomImage).toHaveBeenCalled();
        expect(component.listOfUrlsForImages.length).toBe(1);
    });

    it('should console error if the image could not be loaded', () => {
        mockImageService.getRandomImage.and.returnValue(throwError(() => new Error('Error loading the image')));
        spyOn(console, 'error');

        component.loadSingleImage();

        expect(mockImageService.getRandomImage).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('Error loading image: ', jasmine.any(Error));
    });

    it('should load multiple images', () => {
        const mockArrayOfBlob = [
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' })
        ];

        mockImageService.getMultipleImages.and.returnValue(of(mockArrayOfBlob));
        component.loadMultipleImages(5);

        expect(mockImageService.getMultipleImages).toHaveBeenCalled();
        expect(component.listOfUrlsForImages.length).toBe(5);
    });

    it('should load multimple images after initialization', () => {
        const mockArrayOfBlob = [
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' })
        ];

        mockImageService.getMultipleImages.and.returnValue(of(mockArrayOfBlob));
        fixture.detectChanges();

        expect(mockImageService.getMultipleImages).toHaveBeenCalled();
        expect(component.listOfUrlsForImages.length).toBe(5);
    });

    it('should console error if the image could not be loaded', () => {
        mockImageService.getMultipleImages.and.returnValue(throwError(() => new Error('Error loading the images')));
        spyOn(console, 'error');

        component.loadMultipleImages(5);

        expect(mockImageService.getMultipleImages).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('There was a problem loading multiple images: ', jasmine.any(Error));
    });
});
