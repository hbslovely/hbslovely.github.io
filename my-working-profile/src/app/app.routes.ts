import { Routes } from '@angular/router';
import { CVViewerComponent } from './components/cv-viewer/cv-viewer.component';

export const routes: Routes = [
    { path: '', component: CVViewerComponent },
    { path: '**', redirectTo: '' }
];
