import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavoriteListComponent } from './favorite-list.component';
import { FavoritesServiceService } from '../../services/favorites-service.service';
import { ImageInfo } from '../../interfaces/image-info.interface';

describe('FavoriteListComponent', () => {
    let component: FavoriteListComponent;
    let fixture: ComponentFixture<FavoriteListComponent>;
    let favoriteServiceSpy: jasmine.SpyObj<FavoritesServiceService>;

    beforeEach(async () => {
        favoriteServiceSpy = jasmine.createSpyObj('FavoritesServiceService', ['getImagesFromLocalStorage', 'deleteFromLocalStorage', 'saveToLocalStorage']);
        favoriteServiceSpy.getImagesFromLocalStorage.and.returnValue([]);


        await TestBed.configureTestingModule({
            imports: [FavoriteListComponent],
            providers: [
                { provide: FavoritesServiceService, useValue: favoriteServiceSpy }
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(FavoriteListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should call loadImagesFromLocalStorage on initialization', () => {
        spyOn(component, 'loadImagesFromLocalStorage');
        component.ngOnInit();
        expect(component.loadImagesFromLocalStorage).toHaveBeenCalled();
        expect(component.loading).toBeFalse();
    });

    it('should add image URLs to listOfImages', () => {
        const mockImages: ImageInfo[] = [
            { 'imageUrl': '1', 'imageId': 'image1.jpg' },
            { 'imageUrl': '2', 'imageId': 'image2.jpg' }
        ];
        favoriteServiceSpy.getImagesFromLocalStorage.and.returnValue(mockImages);
        component.loadImagesFromLocalStorage();

        expect(component.listOfImages.length).toBe(2);
        expect(component.loading).toBeFalse();
        expect(component.isFavoriteListEmpty).toBeFalse();
    });

    it('should set isFavoriteListEmpty to true if there are no images', () => {
        favoriteServiceSpy.getImagesFromLocalStorage.and.returnValue([]);
        component.loadImagesFromLocalStorage();

        expect(component.listOfImages.length).toBe(0);
        expect(component.loading).toBeFalse();
        expect(component.isFavoriteListEmpty).toBeTrue();
    });
});
