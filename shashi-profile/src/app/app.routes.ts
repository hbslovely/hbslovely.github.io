import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { AboutComponent } from './pages/about/about.component';
import { ExperienceComponent } from './pages/experience/experience.component';
import { SkillsComponent } from './pages/skills/skills.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', component: AboutComponent },
      { path: 'experience', component: ExperienceComponent },
      { path: 'skills', component: SkillsComponent }
    ]
  },
  { path: '**', redirectTo: '' }
];
