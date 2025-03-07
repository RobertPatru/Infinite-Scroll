import { Injectable } from '@angular/core';

import { Store } from '@ngrx/store';

import { ImageInfo } from '../interfaces/image-info.interface';
import { addImageToFavorites } from '../store/favorites.actions';

@Injectable({
    providedIn: 'root'
})
export class FavoritesServiceService {
    constructor(private storeService: Store) { }

    saveToLocalStorage(imageInfo: ImageInfo): void {
        if (!!imageInfo) {
            localStorage.setItem(`fav_${imageInfo.imageId}`, imageInfo.imageUrl);
            this.storeService.dispatch(addImageToFavorites({ image: imageInfo }));
        }
    }

    deleteFromLocalStorage(imageInfo: ImageInfo): void {
        localStorage.removeItem(imageInfo.imageId);
    }

    getImagesFromLocalStorage(): ImageInfo[] {
        const listOfImages: ImageInfo[] = [];

        for (let i = 0; i < localStorage.length + 2; i++) {
            const key = localStorage.key(i);

            if (key?.includes("fav_")) {
                listOfImages.push({ 'imageUrl': localStorage.getItem(key) ?? 'not found', 'imageId': key });
            }
        }

        return listOfImages;
    }
}
