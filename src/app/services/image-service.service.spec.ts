import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';

import { ImageService } from './image-service.service';

describe('ImageServiceService', () => {
    let service: ImageService;
    let testingController: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [
                ImageService,
                provideHttpClient(),
                provideHttpClientTesting()
            ]
        });
        service = TestBed.inject(ImageService);
        testingController = TestBed.inject(HttpTestingController)
    });

    it('should get a random image', () => {
        const mockBlob = new Blob(['mock image data'], { type: 'image/jpg' });

        service.getRandomImage().subscribe({
            next: (blob: Blob) => {
                expect(blob).toBeTruthy();
            }
        });

        const req = testingController.expectOne(service['API_URL']);
        req.flush(mockBlob);
        expect(req.request.method).toBe('GET');
    });

    it('should get multime images', () => {
        const mockBlob = new Blob(['mock image data'], { type: 'image/jpg' });

        service.getMultipleImages(5).subscribe({
            next: (arrayOfBlobs: Blob[]) => {
                expect(arrayOfBlobs).toBeTruthy();
                expect(arrayOfBlobs.length).toBe(5);

                arrayOfBlobs.forEach((blob: Blob) => {
                    expect(blob).toEqual(mockBlob);
                });
            }
        });

        const req = testingController.match(service['API_URL']);
        expect(req.length).toBe(5);

        req.forEach((req: any) => {
            req.flush(mockBlob);
            expect(req.request.method).toBe('GET');
        });
    });

    it('should throw and error when the request fails', () => {
        service.getRandomImage().subscribe({
            next: () => {
                fail('Expected an error, but the got a respose');
            },
            error: (error: Error) => {
                expect(error).toBeTruthy;
                expect(error.message).toContain('Internal Server Error');
            }
        });

        const req = testingController.expectOne(service['API_URL']);
        expect(req.request.method).toBe('GET');
        req.flush(null, { status: 500, statusText: 'Internal Server Error' });
    });

    afterEach(() => {
        testingController.verify();
    });
});
