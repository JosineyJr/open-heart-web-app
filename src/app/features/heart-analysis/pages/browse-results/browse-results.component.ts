import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { CommonModule } from '@angular/common';
import { PredictResultsService } from '../../../../core/predict-results/predict-results.service';
import { IPredictResult } from '../../../../core/predict-results/models/predict-result.model';
import { RetrainService } from '../../services/retrain.service';

@Component({
  selector: 'app-browse-results',
  imports: [HeaderComponent, CommonModule],
  templateUrl: './browse-results.component.html',
  styleUrl: './browse-results.component.css',
})
export class BrowseResultsComponent implements OnInit {
  results: Array<IPredictResult> = [];

  constructor(
    private readonly predictResultService: PredictResultsService,
    public readonly retrainService: RetrainService
  ) {}

  ngOnInit(): void {
    this.results = this.predictResultService.list();
  }

  updateResult(result: IPredictResult, heartDisease: boolean) {
    result.retrain = true;
    result.heartDisease = heartDisease;

    this.predictResultService.update(result);
  }
}
