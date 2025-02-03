import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router, RouterModule } from '@angular/router';
import { By } from '@angular/platform-browser';
import { Location } from '@angular/common';

import { HeaderComponent } from './header.component';
import { CardListComponent } from '../card-list/card-list.component';
import { FavoriteListComponent } from '../favorite-list/favorite-list.component';

describe('HeaderComponent', () => {
    let component: HeaderComponent;
    let fixture: ComponentFixture<HeaderComponent>;
    let router: Router;
    let location: Location;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [HeaderComponent,
                RouterModule.forRoot(
                    [
                        { path: 'random-list', component: CardListComponent },
                        { path: 'favorites', component: FavoriteListComponent },
                        { path: '**', redirectTo: 'random-list', pathMatch: 'full' }
                    ]
                )
            ]
        })
            .compileComponents();

        fixture = TestBed.createComponent(HeaderComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        router = TestBed.inject(Router);
        location = TestBed.inject(Location);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it(`render two buttons, "HOME" and "FAVORITES"`, () => {
        const buttons = fixture.debugElement.queryAll(By.css('button'));

        expect(buttons.length).toBe(2);
        expect(buttons[0].nativeElement.textContent).toContain("HOME");
        expect(buttons[1].nativeElement.textContent).toContain("FAVORITES");
    });

    it('should have correct routerLink attributes', () => {
        const homeButton = fixture.debugElement.query(By.css('button[routerLink="/random-list"'));
        const favoritesButton = fixture.debugElement.query(By.css('button[routerLink="/favorites"'));

        expect(homeButton).toBeTruthy();
        expect(favoritesButton).toBeTruthy();
    });

    it(`navigate to "/random-list" and update the title to "RANDOM"`, async () => {
        await router.navigate(['/random-list']);
        fixture.detectChanges();

        const title = fixture.debugElement.query(By.css('h1'));

        expect(location.path()).toContain('/random-list');
        expect(title.nativeElement.textContent).toBe('RANDOM');
    });

    it(`navigate to "/favorites" and update the title to "FAVORITES"`, async () => {
        await router.navigate(['/favorites']);
        fixture.detectChanges();

        const title = fixture.debugElement.query(By.css('h1'));

        expect(location.path()).toContain('/favorites');
        expect(title.nativeElement.textContent).toBe('FAVORITES');
    });
});
