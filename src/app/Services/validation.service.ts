import { Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  public validEmailPattern = '([a-z]{1,})([.]{1})([a-z]{1,})[^@]+@[^@]*';
  constructor() { }


  public emailDomainValidator(c: FormControl) {
    const email = c.value;
    if (email && email.indexOf('@') !== -1) {
      const [_, domain] = email.split('@');
      const validdomains = ['ga-si.com', 'ga-asi.com'];
      if (validdomains.indexOf(domain) === -1) {
        return {
          domain: {
            parsedDomain: domain
          }
        };
      }
    }
    return null;
  }

  public checkPasswords(group: FormGroup) {
    const pass = group.get('password').value;
    const passConfirm = group.get('passConfirm').value;

    return pass === passConfirm ? null : { notSame: true};
  }
}
