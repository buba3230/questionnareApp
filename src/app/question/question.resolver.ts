import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve } from "@angular/router";

@Injectable()
export class QuestionResolver implements Resolve<string> {
    constructor() { }

    resolve(route: ActivatedRouteSnapshot) {
        return route.params['id'];
    }
}
