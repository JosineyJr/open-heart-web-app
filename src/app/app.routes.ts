import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'heart-analysis/predict',
    loadComponent: () =>
      import('./features/heart-analysis/pages/forms/forms.component').then(
        (m) => m.FormsComponent
      ),
  },
  {
    path: '',
    redirectTo: '/heart-analysis/predict',
    pathMatch: 'full',
  },
  {
    path: 'heart-analysis/results',
    loadComponent: () =>
      import(
        './features/heart-analysis/pages/browse-results/browse-results.component'
      ).then((m) => m.BrowseResultsComponent),
  },
];
