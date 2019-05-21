import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  items: Array<{}>;
  puertasDB = {
    1: 'DORMITORIO'
  };

  constructor(public db: AngularFireDatabase) {
    db.list('puertas').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, value: a.payload.val() }))
      )).subscribe(data => {
        this.items = data;
        return data.map(item => item.key);
      });
  }

  actualizarPuerta(key: number, estado: boolean) {
    this.db.database.ref('puertas/' + key).set(estado);
  }
}

