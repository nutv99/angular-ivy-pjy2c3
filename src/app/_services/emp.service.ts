import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../environment';
import { Emp } from '../_models/emp';

const baseUrl = environment.apiUrl + "/employee";

@Injectable({
    providedIn: 'root'
})
export class EmpService {

    constructor(private http: HttpClient) { }

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            "Access-Control-Allow-Origin": "*"
        }), responseType: 'text' as 'json'
    };

    getAll() {
        return this.http.get < Emp[] > (baseUrl);
    }

    getById(id: number) {
        return this.http.get < Emp > (`${baseUrl}/${id}`);
    }

    create(params: any) {
        return this.http.post(baseUrl, params, this.httpOptions);
    }

    update(params: any) {
        return this.http.put(`${baseUrl}`, params, this.httpOptions);
    }

    delete(id: number) {
        return this.http.delete(`${baseUrl}/${id}`, this.httpOptions);
    }
}