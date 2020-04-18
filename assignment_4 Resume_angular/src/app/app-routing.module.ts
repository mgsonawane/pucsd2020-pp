import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { EducationComponent } from './education/education.component';
import { SkillsComponent } from './skills/skills.component';
import { PersonalComponent} from './personal/personal.component';
const routes: Routes = [
  { path : 'project' , component : ProjectComponent },
  { path : 'education' , component : EducationComponent },
  { path : 'skills' , component : SkillsComponent },
  { path : 'personal' , component : PersonalComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
