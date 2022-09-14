import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: () => import('./questions-list/questions-list.module').then(m => m.QuestionsListModule), pathMatch: 'full' },
  { path: 'question-types', loadChildren: () => import('./question-types/question-types.module').then(m => m.QuestionTypesModule) },
  { path: 'questions-management', loadChildren: () => import('./questions-management/questions-management.module').then(m => m.QuestionsManagementModule) },
  { path: 'question', loadChildren: () => import('./question/question.module').then(m => m.QuestionsListModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
