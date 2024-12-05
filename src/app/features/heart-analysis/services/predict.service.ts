import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IPredict, IPredictResponse } from '../models/predict.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PredictService {
  constructor(private readonly http: HttpClient) {}

  predict(values: IPredict): Observable<IPredictResponse> {
    return this.http.post<IPredictResponse>('/predict', values);
  }
}
