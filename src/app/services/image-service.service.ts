import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { forkJoin } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ImageService {
    private API_KEY: string = "5EYNLCEXEBUwjmiku0mN8A==247BPqvKqqFt7Wcu";
    private API_URL: string = "https://api.api-ninjas.com/v1/randomimage?width=300";

    constructor(private http: HttpClient) { }

    getRandomImage(): Observable<Blob> {
        return this.http.get(this.API_URL, {
            headers: {
                'X-Api-Key': this.API_KEY,
                'Accept': 'image/jpg'
            },
            responseType: 'blob'
        });
    }

    getMultipleImages(numberOfimages: number): Observable<Blob[]> {
        const imagesRequest: Observable<Blob>[] = [];

        for (let i = 0; i < numberOfimages; i++) {
            imagesRequest.push(this.getRandomImage());
        }

        return forkJoin([...imagesRequest]);
    }

    getMockImages(): string[] {
        const mockUrl: string = "https://natureconservancy-h.assetsadobe.com/is/image/content/dam/tnc/nature/en/photos/Zugpsitze_mountain.jpg?crop=0%2C176%2C3008%2C1654&wid=4000&hei=2200&scl=0.752";
        const mockImages: string[] = new Array(10).fill(mockUrl);

        return mockImages;
    }
}
