import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AccuracyService {
  private accuracy!: string;

  constructor(private readonly http: HttpClient) {
    this.http.get<{ accuracy: string }>('/accuracy').subscribe({
      next: (result: { accuracy: string }) => {
        this.accuracy = result.accuracy;
      },
    });
  }

  get currentAccuracy(): string {
    return this.accuracy;
  }

  set currentAccuracy(accuracy: string) {
    this.accuracy = accuracy;
  }
}
