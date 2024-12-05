import { Component } from '@angular/core';
import { AccuracyService } from '../../../core/accuracy/accuracy.service';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  constructor(public readonly accuracyService: AccuracyService) {}
}
