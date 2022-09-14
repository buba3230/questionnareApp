import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { QuestionComponent } from './question.component'
import { QuestionResolver } from './question.resolver';

const routes: Routes = [
    {
        path: '',
        component: QuestionComponent
    },
    {
        path: ':id',
        component: QuestionComponent,
        resolve: {
            id: QuestionResolver
        }
    }
];

@NgModule({
    declarations: [QuestionComponent],
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        QuestionComponent,
        HttpClientModule,
    ],
    providers: [QuestionResolver]
})

export class QuestionsListModule { }
