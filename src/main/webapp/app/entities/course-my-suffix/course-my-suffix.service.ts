import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { CourseMySuffix } from './course-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class CourseMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/courses';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(course: CourseMySuffix): Observable<CourseMySuffix> {
        const copy = this.convert(course);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(course: CourseMySuffix): Observable<CourseMySuffix> {
        const copy = this.convert(course);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<CourseMySuffix> {
        return this.http.get(`${this.resourceUrl}/${id}`).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    query(req?: any): Observable<ResponseWrapper> {
        const options = createRequestOption(req);
        return this.http.get(this.resourceUrl, options)
            .map((res: Response) => this.convertResponse(res));
    }

    delete(id: number): Observable<Response> {
        return this.http.delete(`${this.resourceUrl}/${id}`);
    }

    private convertResponse(res: Response): ResponseWrapper {
        const jsonResponse = res.json();
        const result = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            result.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return new ResponseWrapper(res.headers, result, res.status);
    }

    /**
     * Convert a returned JSON object to CourseMySuffix.
     */
    private convertItemFromServer(json: any): CourseMySuffix {
        const entity: CourseMySuffix = Object.assign(new CourseMySuffix(), json);
        entity.addAt = this.dateUtils
            .convertDateTimeFromServer(json.addAt);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        entity.soldOutTime = this.dateUtils
            .convertDateTimeFromServer(json.soldOutTime);
        return entity;
    }

    /**
     * Convert a CourseMySuffix to a JSON which can be sent to the server.
     */
    private convert(course: CourseMySuffix): CourseMySuffix {
        const copy: CourseMySuffix = Object.assign({}, course);

        copy.addAt = this.dateUtils.toDate(course.addAt);

        copy.updateTime = this.dateUtils.toDate(course.updateTime);

        copy.soldOutTime = this.dateUtils.toDate(course.soldOutTime);
        return copy;
    }
}
