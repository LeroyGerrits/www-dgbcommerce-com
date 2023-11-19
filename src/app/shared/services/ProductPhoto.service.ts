import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { Injectable } from '@angular/core';
import { MutateProductRequest } from '../models/request/MutateProductRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';

@Injectable()
export class ProductPhotoService {
    private apiUrl = Environment.API_URL + '/ProductPhoto';

    constructor(protected http: HttpClient) { }

    upload(productId: string, formData: FormData): Observable<HttpEvent<MutationResult>> {
        return this.http.post<MutationResult>(`${this.apiUrl}?productId=${productId}`, formData, { reportProgress: true, observe: 'events' });
    }

    update(request: MutateProductRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${request.Product.Id}`, request)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}