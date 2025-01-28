import { provideHttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';

import { of } from 'rxjs';

import { CardListComponent } from './card-list.component';
import { ImageService } from '../../services/image-service.service';

describe('CardListComponent', () => {
    let component: CardListComponent;
    let fixture: ComponentFixture<CardListComponent>;
    let mockImageService: jasmine.SpyObj<ImageService>;
    
    beforeEach(async () => {
        mockImageService = jasmine.createSpyObj('ImageService', ['getRandomImage', 'getMultipleImages']);

        await TestBed.configureTestingModule({
            imports: [CardListComponent],
            providers: [
                provideHttpClient(),
                provideHttpClientTesting(),
                { provide: ImageService, useValue: mockImageService },
            ]
        })
            .compileComponents();

        const imageService: ImageService = TestBed.inject(ImageService);
        console.log('Injected ImageService:', imageService);


        fixture = TestBed.createComponent(CardListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should load multimple images', () => {
        const mockArrayOfBlob = [
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' }),
            new Blob(['mockImageData'], { type: 'image/png' })
        ];

        console.log('ImageService mock:', mockImageService);

        mockImageService.getMultipleImages.and.returnValue(of(mockArrayOfBlob));
        // component.loadMultipleImages(5);

        expect(mockImageService.getMultipleImages).toHaveBeenCalled();
    });
});
