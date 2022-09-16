import { Component, OnInit } from '@angular/core';
import { QuestionInterface, TypeInterface } from '../shared/interfaces';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {
  allQuestions: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
  answeredQuestions: QuestionInterface[];
  allTypes: TypeInterface[] = JSON.parse(this.storageService.getData('types'));
  constructor(private storageService: StorageService) {
    if (this.allQuestions) {
      this.answeredQuestions = this.allQuestions.filter(question => !!question.answer).sort((a, b) => new Date(b.creatingDate).getTime() - new Date(a.creatingDate).getTime());
    }
  }

  ngOnInit(): void {
    if (this.allQuestions) {
      this.allQuestions = this.allQuestions.sort((a, b) => new Date(b.creatingDate).getTime() - new Date(a.creatingDate).getTime());
    }
  }

  bindAction(value: boolean): void {
    if (value) {
      this.allQuestions = JSON.parse(this.storageService.getData('questions'));
      this.answeredQuestions = this.allQuestions.filter(question => !!question.answer).sort((a, b) => new Date(b.answer.answerDate).getTime() - new Date(a.answer.answerDate).getTime())
    }
  }

}
