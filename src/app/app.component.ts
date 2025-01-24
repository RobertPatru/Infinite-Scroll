import { Component, ViewEncapsulation } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ImageCardComponent } from './components/image-card/image-card.component';
import { HeaderComponent } from "./components/header/header.component";
import { CardListComponent } from "./components/card-list/card-list.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ImageCardComponent, HeaderComponent, CardListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Infinite-Scroll';
}
