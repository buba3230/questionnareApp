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
  allTypes: TypeInterface[] = JSON.parse(this.storageService.getData('types'));
  constructor(private storageService: StorageService) {

  }

  ngOnInit(): void {
  }

}
