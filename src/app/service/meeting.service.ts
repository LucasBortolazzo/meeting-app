import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class MeetingService {

    MOBILE_BASS_URL: string = 'https://mobilebaas.com/backend/api/manage/db';
    tableName: string = 'meeting';

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'MOBILEBAASKEY': 'MTY0MTE0NzU0NDk3MWx1Y2FzcyBmcGE='
        })
    };

    constructor(private http: HttpClient) { }

    insert(meet: any) {
        return this.http.post(`${this.MOBILE_BASS_URL}?table=${this.tableName}`, meet, this.httpOptions);
    }

    update(meet: any) {
        return this.http.put(`${this.MOBILE_BASS_URL}?table=${this.tableName}`, meet, this.httpOptions);
    }

    delete(id: number) {
        return this.http.delete(`${this.MOBILE_BASS_URL}/${id}?table=${this.tableName}`, this.httpOptions);
    }

    getById(id: string) {
        return this.http.get(`${this.MOBILE_BASS_URL}/${id}?table=${this.tableName}`, this.httpOptions);
    }

    getAll(pageNumber: number, totalRecordsPerPage: number, sortField: string, filters: string) {
        let parameters = `?table=${this.tableName}`;

        if (pageNumber) {
            parameters += `&pageNumber=${pageNumber}`;
        }

        if (totalRecordsPerPage) {
            parameters += `&totalRecordsPerPage=${totalRecordsPerPage}`;
        }

        if (sortField) {
            parameters += `&sortField=${sortField}`;
        }

        if (filters) {
            parameters += `&filters=${filters}`;
        }

        return this.http.get(`${this.MOBILE_BASS_URL}/find${parameters}`, this.httpOptions);
    }

}
