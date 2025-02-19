import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';

import { of, throwError } from 'rxjs';

import { CardListComponent } from './card-list.component';
import { ImageService } from '../../services/image-service.service';
import { environment } from '../../environments/environment';

describe('CardListComponent', () => {
    let component: CardListComponent;
    let fixture: ComponentFixture<CardListComponent>;
    let imageServiceSpyObj: jasmine.SpyObj<ImageService>;

    beforeEach(async () => {
        imageServiceSpyObj = jasmine.createSpyObj('ImageService', ['getRandomImage', 'getMultipleImages', 'getMockImages']);

        await TestBed.configureTestingModule({
            imports: [CardListComponent],
            providers: [
                { provide: ImageService, useValue: imageServiceSpyObj },
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(CardListComponent);
        component = fixture.componentInstance;
    });

    it('should load multimple images on initialization', () => {
        spyOn(component, 'loadImagesBasedOnEnvironment');

        component.ngOnInit();

        expect(component.loadImagesBasedOnEnvironment).toHaveBeenCalled();
    });

    it('should load mock images when the environment.useMockedData is true', fakeAsync(() => {
        environment.useMockedData = true;
        const mockImages: string[] = ["img1", "img2"];

       imageServiceSpyObj.getMockImages.and.returnValue(mockImages);

       component.loadImagesBasedOnEnvironment();

       expect(component.loading).toBeTrue();

       tick(1500);

       expect(component.listOfUrlsForImages).toEqual(mockImages);
       expect(component.loading).toBeFalse();
    }));

    it('should load multimple images when environment.useMockedData is false', () => {
        environment.useMockedData = false;
        
        spyOn(component, 'loadMultipleImages');

        component.loadImagesBasedOnEnvironment();

        expect(component.loadMultipleImages).toHaveBeenCalledWith(15);
        expect(component.loading).toBeTrue();
    });

    it('should add image URLs to listOfUrlsForImages', () => {
        const mockBlobs: Blob[] = [
            new Blob(),
            new Blob()
        ];

        imageServiceSpyObj.getMultipleImages.and.returnValue(of(mockBlobs));
        component.loadMultipleImages(2);

        expect(component.listOfUrlsForImages.length).toBe(2);
        expect(component.loading).toBeFalse();
    });

    it('should console error if the image could not be loaded', () => {
        imageServiceSpyObj.getMultipleImages.and.returnValue(throwError(() => new Error('Error loading the images')));
        spyOn(console, 'error');

        component.loadMultipleImages(5);

        expect(imageServiceSpyObj.getMultipleImages).toHaveBeenCalled();
        expect(console.error).toHaveBeenCalledWith('There was a problem loading multiple images: ', jasmine.any(Error));
    });
});
