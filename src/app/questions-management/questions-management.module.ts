import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionsManagementComponent } from './questions-management.component'

const routes: Routes = [
    {
        path: '',
        component: QuestionsManagementComponent
    },
];

@NgModule({
    declarations: [QuestionsManagementComponent],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        QuestionsManagementComponent,
        HttpClientModule,
    ],
    providers: []
})

export class QuestionsManagementModule { }
