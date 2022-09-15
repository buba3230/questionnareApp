import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";

import { CardComponent } from "./card.component";

@NgModule({
    declarations: [CardComponent],
    imports: [
        FormsModule,
        CommonModule,
    ],
    exports: [
        CardComponent
    ],
    providers: []
})

export class CardModule { }