import { ShelterService } from '../Services/shelter.service';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';

@Injectable()
export class ShelterResolver implements Resolve<any> {
    constructor(private shelterService: ShelterService) {}
    resolve() {
        return this.shelterService.getShelters();
    }
}
