import { ImageInfo } from "../interfaces/image-info.interface";

export interface FavoritesImagesState {
    images: ImageInfo[];
}

export const initialFavoriteListState: FavoritesImagesState = {
    images: []
}