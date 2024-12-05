import { Component } from '@angular/core';
import { AccuracyService } from '../../../core/accuracy/accuracy.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  expanded = false;

  constructor(public readonly accuracyService: AccuracyService) {}

  expand() {
    this.expanded = !this.expanded;
    console.log(this.expanded);
  }
}
