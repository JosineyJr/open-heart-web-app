import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AccuracyService } from '../../../core/accuracy/accuracy.service';
import { IPredictResult } from '../../../core/predict-results/models/predict-result.model';
import { IRetrain } from '../models/retrain.model';

@Injectable({
  providedIn: 'root',
})
export class RetrainService {
  constructor(
    private readonly http: HttpClient,
    private readonly accuracyService: AccuracyService
  ) {}

  retrain(predictResult: IPredictResult, heartDisease: boolean) {
    const retrainValues: IRetrain = {
      Age: predictResult.age,
      Sex: predictResult.sex,
      ChestPainType: predictResult.chestPainType,
      RestingBP: predictResult.restingBP,
      Cholesterol: predictResult.cholesterol,
      FastingBS: predictResult.fastingBS,
      RestingECG: predictResult.restingECG,
      MaxHR: predictResult.maxHR,
      ExerciseAngina: predictResult.exerciseAngina,
      Oldpeak: predictResult.oldPeak,
      ST_Slope: predictResult.stSlope,
      HeartDisease: heartDisease ? 1 : 0,
    };

    this.http.post<{ accuracy: string }>('/retrain', retrainValues).subscribe({
      next: (result: { accuracy: string }) => {
        this.accuracyService.currentAccuracy = result.accuracy;
      },
    });
  }
}
