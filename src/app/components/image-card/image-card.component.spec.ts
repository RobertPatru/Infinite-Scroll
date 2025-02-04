import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageCardComponent } from './image-card.component';
import { By } from '@angular/platform-browser';

describe('ImageCardComponent', () => {
    let component: ImageCardComponent;
    let fixture: ComponentFixture<ImageCardComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [ImageCardComponent]
        })
            .compileComponents();

        fixture = TestBed.createComponent(ImageCardComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should render an image', () => {
       const img = fixture.debugElement.query(By.css('img'));

       expect(img).toBeTruthy();
       expect(img.nativeElement.src).toBeTruthy();
    });

    it(`should render a button with text "ADD TO FAVORITES"`, () => {
        const button = fixture.debugElement.query(By.css('span.mdc-button__label'));

        expect(button).toBeTruthy();
        expect(button.nativeElement.textContent).toBe(' ADD TO FAVORITES ');
    });
});
