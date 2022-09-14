import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { QuestionInterface, TypeInterface } from '../shared/interfaces';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  allQuestion: QuestionInterface[];
  questionTypes: TypeInterface[] = JSON.parse(this.storageService.getData('types'));
  blank = { id: 0, text: "", type: 0, answeredOptions: { a: "", b: "", c: "" }, creatingDate: new Date() };
  question: QuestionInterface = this.blank;

  questionId = null;
  constructor(private storageService: StorageService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.questionId = +this.route.snapshot.data.id ?? null;
    if (this.questionId) {
      this.allQuestion = JSON.parse(this.storageService.getData('questions'));
      const fromStorage = this.allQuestion.find(question => question.id === this.questionId);
      this.question = fromStorage ? fromStorage : this.blank;
    }
  }

  onSubmit(questionForm: NgForm): void {
    const id = +questionForm.controls['id'].value;
    const text = questionForm.controls['text'].value;
    const type = +questionForm.controls['type'].value;
    const a = questionForm.controls['a'].value;
    const b = questionForm.controls['b'].value;
    const c = questionForm.controls['c'].value;

    let question: QuestionInterface = {
      id,
      text,
      type,
      answeredOptions: {
        a,
        b,
        c
      },
      creatingDate: new Date()
    }

    if (questionForm.valid) {
      let questions: QuestionInterface[] | undefined = JSON.parse(this.storageService.getData('questions'));
      if (this.questionId) {
        questions = questions.filter(question => question.id !== this.questionId);
      }
      const value = questions ? [...questions, question] : [question];
      this.storageService.saveData('questions', value);
      this.question = this.blank;
      this.goToManagement();
    }
  }

  goToManagement(): void {
    this.router.navigate(['questions-management']);
  }

}
