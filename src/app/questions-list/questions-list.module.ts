import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { CommonModule } from '@angular/common';

import { QuestionsListComponent } from './questions-list.component'
import { CardComponent } from '../card/card.component';
import { CardModule } from '../card/card.module';

const routes: Routes = [
    {
        path: '',
        component: QuestionsListComponent
    },
];

@NgModule({
    declarations: [QuestionsListComponent],
    imports: [
        CommonModule,
        CardModule,
        RouterModule.forChild(routes),
    ],
    exports: [
        QuestionsListComponent,
        HttpClientModule,
    ],
    providers: []
})

export class QuestionsListModule { }
