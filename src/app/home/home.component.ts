import { Component, OnInit, inject } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from '../shared/components/footer/footer.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventCardComponent } from './event-card/event-card.component';
import { HomeService } from './home.service';
import { Genre } from '../shared/models/genre.model';
import { Concert } from '../shared/models/concert.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    FooterComponent,
    MatSelectModule,
    MatFormFieldModule,
    EventCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  genres: Genre[] = [];
  initialConcerts: Concert[] = [];
  currentConcerts: Concert[] = [];

  homeService = inject(HomeService);

  currentGenre = new FormControl(0);

  ngOnInit() {
    this.homeService.getData().subscribe((data) => {
      console.log(data);
      this.genres = data.genres;
      this.initialConcerts = this.currentConcerts = data.concerts;
    });

    this.currentGenre.valueChanges.
    subscribe((val:number | null) => {
    /*  if (val === 0) {
        this.currentConcerts = this.initialConcerts;
      } else {
        this.currentConcerts = this.initialConcerts.filter(
          (item) => item.genreId === val
        );
    }*/

      this.currentConcerts =
      val === 0
      ? this.initialConcerts
      : this.initialConcerts.filter((item) => item.genreId === val);
    });
  }
}
