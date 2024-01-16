import { HttpClient, HttpParams } from '@angular/common/http';

import { Environment } from 'src/app/shared/environments/Environment';
import { GetPageResponse } from '../models/response/GetPageResponse.model';
import { GetPagesParameters } from '../models/parameters/GetPagesParameters.model';
import { Injectable } from '@angular/core';
import { MutatePageRequest } from '../models/request/MutatePageRequest.model';
import { MutationResult } from 'src/app/shared/models/MutationResult';
import { Observable } from 'rxjs';
import { Page } from 'src/app/shared/models/Page.model';

@Injectable()
export class PageService {
    private apiUrl = Environment.API_URL + '/Page';

    constructor(protected http: HttpClient) { }

    getList(parameters?: GetPagesParameters): Observable<Page[]> {
        let httpParams = new HttpParams();

        if (parameters) {
            if (parameters.Title) httpParams = httpParams.append('title', parameters.Title);
            if (parameters.ShopId) httpParams = httpParams.append('shopId', parameters.ShopId);
            if (parameters.Visible != null) httpParams = httpParams.append('visible', parameters.Visible);
        }

        return this.http.get<Page[]>(this.apiUrl, { params: httpParams });
    }

    getById(id: string): Observable<GetPageResponse> {
        return this.http.get<GetPageResponse>(`${this.apiUrl}/${id}`);
    }

    create(request: MutatePageRequest): Observable<MutationResult> {
        return this.http.post<MutationResult>(this.apiUrl, request);
    }

    update(request: MutatePageRequest): Observable<MutationResult> {
        return this.http.put<MutationResult>(`${this.apiUrl}/${request.Page.Id}`, request)
    }

    delete(id: string): Observable<MutationResult> {
        return this.http.delete<MutationResult>(`${this.apiUrl}/${id}`);
    }
}