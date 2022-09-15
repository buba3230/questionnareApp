import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { QuestionInterface, TypeInterface } from '../shared/interfaces';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [FormBuilder]
})
export class CardComponent implements OnInit {
  multipleData: Array<any> = [];
  form: FormGroup;
  checkArray: FormArray;

  @Input() question: QuestionInterface;
  @Input() types: TypeInterface[];
  isOpen = false;
  isMultiple = false;
  isSingle = false;
  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      checkArray: this.fb.array([], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.isOpen = !!this.types.find(type => type.id === this.question.type && (type.name === 'Open' || type.name === 'open'));
    this.isMultiple = !!this.types.find(type => type.id === this.question.type && (type.name === 'Multiple' || type.name === 'multiple'));
    this.isSingle = !!this.types.find(type => type.id === this.question.type && (type.name === 'Single' || type.name === 'single'));
    if (this.isMultiple) {
      for (let [value, text] of Object.entries(this.question.answeredOptions)) {
        this.multipleData.push({ value, text });
      }
    }
  }

  onOpenSubmit(openForm: NgForm): void {

  }

  onSingleSubmit(singleForm: NgForm, id: number): void {
    const name = singleForm.controls['single'].value;
  }

  onMultipleSubmit(multipleForm: NgForm, id: number): void {
    console.log(id);
  }

  onCheckboxChange(e: any) {
    this.checkArray = this.form.get('checkArray') as FormArray;
    if (e.target.checked) {
      this.checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        if (item.value == e.target.value) {
          this.checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
  }

}
