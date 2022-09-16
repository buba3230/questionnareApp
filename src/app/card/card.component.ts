import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';

import { AnswerInterface, NormalizeAnswerInterface, QuestionInterface, TypeInterface } from '../shared/interfaces';
import { StorageService } from '../storage.service';

@Component({
  selector: 'card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss'],
  providers: [FormBuilder, StorageService]
})
export class CardComponent implements OnInit {
  @Output() submited: EventEmitter<boolean> = new EventEmitter();
  multipleData: Array<any> = [];
  isDisable = false;
  form: FormGroup;
  checkArray: FormArray;
  answer: AnswerInterface;
  normalizeAnswer: NormalizeAnswerInterface;

  @Input() question: QuestionInterface;
  @Input() types: TypeInterface[];
  isOpen = false;
  isMultiple = false;
  isSingle = false;
  tmp = "";
  constructor(private fb: FormBuilder, private storageService: StorageService) {
    this.submited.emit(false);
    this.form = this.fb.group({
      checkArray: this.fb.array(this.normalizeAnswer ? [this.normalizeAnswer.a, this.normalizeAnswer.b, this.normalizeAnswer.c] : [], [Validators.required]),
    });
  }

  ngOnInit(): void {
    this.answer = this.question.answer || { id: 0, selPropositions: [], openAnswer: '', answerDate: new Date };
    this.normalizeAnswer = {
      id: this.answer.id,
      a: this.answer.selPropositions.includes('a') ? 'a' : '',
      b: this.answer.selPropositions.includes('b') ? 'b' : '',
      c: this.answer.selPropositions.includes('c') ? 'c' : '',
      openAnswer: this.answer.openAnswer
    };

    this.isDisable = !!this.question.answer;
    this.isOpen = !!this.types.find(type => type.id === this.question.type && (type.name === 'Open' || type.name === 'open'));
    this.isMultiple = !!this.types.find(type => type.id === this.question.type && (type.name === 'Multiple' || type.name === 'multiple'));
    this.isSingle = !!this.types.find(type => type.id === this.question.type && (type.name === 'Single' || type.name === 'single'));
    if (this.isMultiple || this.isSingle) {
      for (let [value, text] of Object.entries(this.question.answeredOptions)) {
        this.multipleData.push({ value, text });
      }
    }
  }

  onOpenSubmit(openForm: NgForm, id: number): void {
    const openAnswer = openForm.controls['openAnswer'].value;
    const answer = {
      id,
      selPropositions: [],
      openAnswer,
      answerDate: new Date()
    }

    const storageQuestions: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
    this.storageService.saveData('questions', [...storageQuestions.map(question => {
      if (question.id === id) {
        question.answer = answer;
      }
      return question;
    })]);
    this.submited.emit(true);
  }

  onSingleSubmit(id: number): void {
    // const name = singleForm.controls['single'].value;
    const answer = {
      id,
      selPropositions: this.form.value['checkArray'],//[name]
      openAnswer: '',
      answerDate: new Date()
    }

    console.log(this.form.value['checkArray']);

    const storageQuestions: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
    this.storageService.saveData('questions', [...storageQuestions.map(question => {
      if (question.id === id) {
        question.answer = answer;
      }
      return question;
    })]);
    this.submited.emit(true);
  }

  onMultipleSubmit(id: number): void {
    const answer = {
      id,
      selPropositions: this.form.value['checkArray'],
      openAnswer: '',
      answerDate: new Date()
    }

    const storageQuestions: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
    this.storageService.saveData('questions', [...storageQuestions.map(question => {
      if (question.id === id) {
        question.answer = answer;
      }
      return question;
    })]);
    this.submited.emit(true);
  }

  onRadioChange(e: any) {
    if (e.target.checked) {
      console.log(this.form);
      this.checkArray = this.form.get('checkArray') as FormArray;
      let i: number = 0;
      this.checkArray.controls.forEach((item: any) => {
        this.checkArray.removeAt(i);
        i++;
      });
      this.checkArray.push(new FormControl(e.target.value));
    }
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

  restore(id: number): void {
    const storageQuestions: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
    this.storageService.saveData('questions', [...storageQuestions.map(question => {
      if (question.id === id) {
        question.answer = undefined;
      }
      return question;
    })]);
    this.submited.emit(true);
  }

}
