import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { QuestionInterface, TypeInterface, QuestionListItemInterface } from '../shared/interfaces';
import { StorageService } from '../storage.service';

@Component({
  selector: 'app-questions-management',
  templateUrl: './questions-management.component.html',
  styleUrls: ['./questions-management.component.scss'],
})
export class QuestionsManagementComponent implements OnInit {
  allQuestion: QuestionInterface[] = JSON.parse(this.storageService.getData('questions'));
  allTypes: TypeInterface[] = JSON.parse(this.storageService.getData('types'));
  questionList: QuestionListItemInterface[];
  tableHeaders = ['Question', 'Type', 'Creating date', 'Options'];
  deleteId: number;
  isDeleting = false;
  constructor(private storageService: StorageService, private router: Router) {
    if (this.allQuestion && this.allTypes) {
      this.questionList = this.normalizeLlist(this.allQuestion, this.allTypes);
    }

  }

  ngOnInit(): void {

  }

  normalizeLlist(questions: QuestionInterface[], types: TypeInterface[]): QuestionListItemInterface[] {
    return questions.map(question => ({
      id: question.id,
      text: question.text,
      type: types.find(type => type.id === question.type).name,
      creatingDate: question.creatingDate
    })).sort((a, b) => new Date(b.creatingDate).getTime() - new Date(a.creatingDate).getTime());
  }

  deleteQuestion(id: number): void {
    this.deleteId = id;
  }

  cancelDelete() {
    this.isDeleting = false;
    this.deleteId = null;
  }

  delete(id: number) {
    this.isDeleting = true;
    const withoutSelected = this.allQuestion.filter(question => question.id !== id);
    this.storageService.saveData('questions', withoutSelected);
    this.allQuestion = JSON.parse(this.storageService.getData('questions'));
    this.questionList = this.normalizeLlist(this.allQuestion, this.allTypes);
  }

  editQuestion(id: number) {
    this.router.navigate(['/question', id]);
  }

}
