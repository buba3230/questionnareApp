import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionTypesComponent } from './question-types.component'
import { FormsModule } from '@angular/forms';

const routes: Routes = [
    {
        path: '',
        component: QuestionTypesComponent
    },
];

@NgModule({
    declarations: [QuestionTypesComponent],
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        QuestionTypesComponent,
        HttpClientModule,
    ],
    providers: []
})

export class QuestionTypesModule { }
