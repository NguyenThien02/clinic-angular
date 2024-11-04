import { Component } from '@angular/core';
import { Specialty } from 'src/app/models/Specialty';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  selectedSpecialtyId: number = 0;
  specialties: Specialty[] = [];

}
