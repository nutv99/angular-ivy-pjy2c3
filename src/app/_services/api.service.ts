import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environment';
import { Emp } from '../_models/emp';

const baseUrl = environment.apiUrl2;

@Injectable({
  providedIn: 'root',
})
export class APIService {
  constructor(private http: HttpClient) {}

  // httpOptions = {
  //   headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Access-Control-Allow-Origin': '*',
  //   }),
  //   responseType: 'text' as 'json',
  // };

  httpOptions = {};

  getAll() {
    return this.http.get<any>(baseUrl);
  }

  getById(modelName: string, id: number) {
    let lang = 'th';
    //return this.http.get<any>(`${baseUrl}/${lang}/${modelName}/BySelf/${id}`);
    let getUrl = baseUrl + 'getdata/?id=' + id + '&modelName=' + modelName;
   //alert(getUrl);
    return this.http.get<any>(getUrl);
  }

  getByPageNo(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getByParentID(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getByChild(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  getByChildren(id: number) {
    return this.http.get<any>(`${baseUrl}/${id}`);
  }

  // params คือ  payload
  create(formcode: string, payload: any) {
    console.clear();

    let postUrl = baseUrl + 'postdata/?code=' + formcode;
    //return this.http.get<any>(postUrl);
    return this.http.post(postUrl, payload, this.httpOptions);
  }

  update999(modelName: string, payload: any) {
    let postUrl = baseUrl + '/' + modelName + '/update';
    return this.http.put(postUrl, payload, this.httpOptions);
  }

  delete999(modelName: string, id: number) {
    let deleteUrl = baseUrl + '/th/' + modelName + '/delete/' + id;
    return this.http.delete(deleteUrl, this.httpOptions);
  }
}
