import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { Constants } from '../Constants';
import { CustomerService } from './Customer.service';
import { Environment } from 'src/app/shared/environments/Environment';
import { TestBed } from '@angular/core/testing';
import { TestDataCustomers } from 'src/assets/test-data/Customers';

describe('CustomerService', () => {
    let service: CustomerService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
            imports: [HttpClientTestingModule],
            providers: [CustomerService]
        });
        service = TestBed.inject(CustomerService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be able to get a public merchant by ID', () => {
        service.getByIdPublic(Constants.EMPTY_GUID).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/public/${Constants.EMPTY_GUID}`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to get a merchant by ID and password', () => {
        service.getByIdAndPassword(Constants.EMPTY_GUID, 'password').subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/${Constants.EMPTY_GUID}/password`);
        expect(request.request.method).toBe('GET');
    });

    it('should be able to create a merchant', () => {
        service.create(TestDataCustomers[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer`);
        expect(request.request.method).toBe('POST');
    });

    it('should be able to update a merchant', () => {
        service.update(TestDataCustomers[0]).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/${TestDataCustomers[0].Id}`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to activate a merchant\'s account', () => {
        service.activateAccount(TestDataCustomers[0].Id!, 'PASSWORD', 'NEWPASSWORD').subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/activate-account`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to change a merchant\'s password', () => {
        service.changePassword('PASSWORD', 'NEWPASSWORD').subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/change-password`);
        expect(request.request.method).toBe('PUT');
    });

    it('should be able to reset a merchant\'s account', () => {
        service.forgotPassword(TestDataCustomers[0].EmailAddress).subscribe();
        const request = httpMock.expectOne(`${Environment.API_URL}/Customer/public/forgot-password`);
        expect(request.request.method).toBe('POST');
    });
});