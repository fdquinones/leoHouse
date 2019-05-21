import { Component } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  items: Array<{}>;
  lucesDB = {
    1: 'SALA',
    2: 'COCINA',
    3: 'DORMITORIO'
  };

  constructor(public db: AngularFireDatabase) {
    db.list('luces').snapshotChanges().pipe(
      map(actions =>
        actions.map(a => ({ key: a.key, value: a.payload.val() }))
      )).subscribe(data => {
        this.items = data;
        return data.map(item => item.key);
      });
  }

  actualizarLuz(key: number, estado: boolean) {
    this.db.database.ref('luces/' + key).set(estado);
  }
}
