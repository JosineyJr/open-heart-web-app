import { Injectable } from '@angular/core';
import { IPredictResult } from './models/predict-result.model';

@Injectable({
  providedIn: 'root',
})
export class PredictResultsService {
  constructor() {}

  list(): Array<IPredictResult> {
    let currentResultsString = localStorage.getItem('prediction-results');

    let results: Array<IPredictResult> = [];
    if (currentResultsString != null) {
      results = JSON.parse(currentResultsString);
    }

    return results;
  }

  register(predictionResult: IPredictResult) {
    let currentResults = this.list();

    currentResults.push(predictionResult);

    this.setItems(currentResults);
  }

  setItems(patients: Array<IPredictResult>) {
    localStorage.setItem('prediction-results', JSON.stringify(patients));
  }

  getPatient(patientID: string): IPredictResult | undefined {
    const patients = this.list();

    return patients.find((p) => p.patientID == patientID);
  }

  update(patient: IPredictResult) {
    let patients = this.list();

    const patientIndex = patients.findIndex(
      (p) => p.patientID == patient.patientID
    );

    patients[patientIndex] = patient;

    this.setItems(patients);
  }
}
