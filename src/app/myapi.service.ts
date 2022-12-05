import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyapiService {
  thisURL: string = '';
  pokemonsEmpty: any[] = [];

  constructor(private http: HttpClient) {}

  public getPokemonByName(sname: string) {
    // if (sname.trim() === '') {
    //   //alert('Empty') ;
    //   return this.pokemonsEmpty;
    // }
    this.thisURL =
      'https://lovetoshopmall.com/dataservice/getItem.php?item=' + sname;
    return this.http.get<any>(this.thisURL);
  }

  public getUsers(): Observable<any> {
    const url = 'https://reqres.in/api/users?page=1';
    return this.http.get<any>(url);
  }
}
