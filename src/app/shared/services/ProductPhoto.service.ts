import { HttpClient, HttpEvent, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetProductPhotosParameters } from '../models/parameters/GetProductPhotosParameters.model';
import { Injectable } from '@angular/core';
import { MutateProductRequest } from '../models/request/MutateProductRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { ProductPhoto } from '../models/ProductPhoto.model';
import { ProductPhotoEditDescriptionRequest } from '../models/request/ProductPhotoEditDescriptionRequest.model';

@Injectable()
export class ProductPhotoService {
    private apiUrl = Environment.API_URL + '/ProductPhoto';

    constructor(protected http: HttpClient) { }

    changeDescription(id: string, description: string): Observable<MutationResult> {
        const productPhotoSetDescriptionRequest: ProductPhotoEditDescriptionRequest = {
            Description: description
        };
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/ChangeDescription`, productPhotoSetDescriptionRequest)
    }

    changeMain(id: string): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/ChangeMain`, null)
    }

    changeVisible(id: string, visible: boolean): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/ChangeVisible?visible=${visible}`, null)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }

    getList(parameters?: GetProductPhotosParameters): Observable<ProductPhoto[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.ProductId) httpParams = httpParams.append('productId', parameters.ProductId);
        }

        return this.http.get<ProductPhoto[]>(this.apiUrl, { params: httpParams });
    }


    moveDown(id: string): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/Down`, null)
    }

    moveUp(id: string): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${id}/Up`, null)
    }

    upload(productId: string, formData: FormData): Observable<HttpEvent<MutationResult>> {
        return this.http.post<MutationResult>(`${this.apiUrl}?productId=${productId}`, formData, { reportProgress: true, observe: 'events' });
    }
}