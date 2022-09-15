import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { TypeInterface } from '../shared/interfaces';
import { StorageService } from '../storage.service';



@Component({
  selector: 'app-question-types',
  templateUrl: './question-types.component.html',
  styleUrls: ['./question-types.component.scss']
})
export class QuestionTypesComponent implements OnInit {
  toggleBlock = false;
  type: TypeInterface = { id: 0, name: "" };
  constructor(private storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(typeForm: NgForm): void {
    const id = +typeForm.controls['id'].value;
    const name = typeForm.controls['name'].value;

    let type = {
      "id": id,
      "name": name
    }

    if (typeForm.valid) {
      const storageTypes = JSON.parse(this.storageService.getData('types'));
      const value = storageTypes ? [...storageTypes, type] : [type];
      this.storageService.saveData('types', value);
      this.toggleBlock = !this.toggleBlock;
      this.type = { id: 0, name: "" };
    }

  }

  gotoList(): void {
    this.router.navigate(['/']);
  }

}
