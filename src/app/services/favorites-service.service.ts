import { Injectable } from '@angular/core';

import { ImageInfo } from '../interfaces/image-info.interface';

@Injectable({
    providedIn: 'root'
})
export class FavoritesServiceService {
    constructor() { }

    saveToLocalStorage(imageInfo: ImageInfo): void {
        if (!!imageInfo) {
            localStorage.setItem(`fav_${imageInfo.imageId}`, imageInfo.imageUrl);
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
