import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { CardListComponent } from './components/card-list/card-list.component';
import { FavoriteListComponent } from './components/favorite-list/favorite-list.component';

describe('AppComponent', () => {
    let component: AppComponent;
    let fixture: ComponentFixture<AppComponent>;
    let router: Router;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [AppComponent, RouterModule.forRoot(
                [
                    { path: 'random-list', component: CardListComponent },
                    { path: 'favorites', component: FavoriteListComponent },
                    { path: '**', redirectTo: 'random-list', pathMatch: 'full' }
                ]
            )]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        router = TestBed.inject(Router);
    });

    it('should create the app', () => {
        expect(component).toBeTruthy();
    });

    it(`should have the 'Infinite-Scroll' title`, () => {
        expect(component.title).toEqual('Infinite-Scroll');
    });

    it('should lnavigate to random-list', async () => {
        await router.navigate(['random-list']);

        expect(router.url).toContain('/random-list');
    });

    it('should lnavigate to favorites', async () => {
        await router.navigate(['favorites']);

        expect(router.url).toContain('/favorites');
    });

    it('should lnavigate to random-list when the route does not match any pre defined route', async () => {
        await router.navigate(['just-a-route-that-is-not-defined']);

        expect(router.url).toContain('/random-list');
    });
});
