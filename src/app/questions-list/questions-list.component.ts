import { Component, OnInit } from '@angular/core';

import { StorageService } from '../storage.service';

@Component({
  selector: 'app-questions-list',
  templateUrl: './questions-list.component.html',
  styleUrls: ['./questions-list.component.scss']
})
export class QuestionsListComponent implements OnInit {

  constructor(private storageService: StorageService) {

  }

  ngOnInit(): void {
  }

}
