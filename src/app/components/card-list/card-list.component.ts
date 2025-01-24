import { Component } from '@angular/core';
import { ImageCardComponent } from '../image-card/image-card.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-card-list',
  imports: [ImageCardComponent, CommonModule, RouterModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss'
})
export class CardListComponent {
    list: number[] = [1, 2, 3, 4, 5 ,6 ,7 ,8 ,9, 10];
}
