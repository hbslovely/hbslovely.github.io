import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', loadComponent: () => import('./pages/about/about.component').then(m => m.AboutComponent) },
      { path: 'experience', loadComponent: () => import('./pages/experience/experience.component').then(m => m.ExperienceComponent) },
      { path: 'skills', loadComponent: () => import('./pages/skills/skills.component').then(m => m.SkillsComponent) }
    ]
  },
  { path: '**', redirectTo: '' }
];
