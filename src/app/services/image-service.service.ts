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
        const mockUrl: string = "https://images.news18.com/webstories/uploads/2024/10/5-wildlife-photography-destination-2024-10-4df6d4a8d4614b4aedfeaff2037a789d.jpg";
        const mockImages: string[] = new Array(10).fill(mockUrl);

        return mockImages;
    }
}
