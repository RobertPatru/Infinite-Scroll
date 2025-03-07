import { createAction, props } from "@ngrx/store";

import { ImageInfo } from "../interfaces/image-info.interface";

export const addImageToFavorites = createAction(
    "[Favorites Service] Add Image to favorites",
    props<{ image: ImageInfo }>()
);
