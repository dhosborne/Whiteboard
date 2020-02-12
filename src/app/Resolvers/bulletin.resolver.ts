import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { BulletinService } from '../Services/bulletin.service';

@Injectable({
    providedIn: 'root'
})
export class BulletinResolver implements Resolve<any> {
    constructor(private bulletinService: BulletinService) {}
    resolve() {
        return this.bulletinService.getBulletins;
    }
}
