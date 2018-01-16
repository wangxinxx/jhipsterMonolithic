import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { TeacherMySuffix } from './teacher-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class TeacherMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/teachers';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(teacher: TeacherMySuffix): Observable<TeacherMySuffix> {
        const copy = this.convert(teacher);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(teacher: TeacherMySuffix): Observable<TeacherMySuffix> {
        const copy = this.convert(teacher);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<TeacherMySuffix> {
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
     * Convert a returned JSON object to TeacherMySuffix.
     */
    private convertItemFromServer(json: any): TeacherMySuffix {
        const entity: TeacherMySuffix = Object.assign(new TeacherMySuffix(), json);
        entity.createTime = this.dateUtils
            .convertDateTimeFromServer(json.createTime);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a TeacherMySuffix to a JSON which can be sent to the server.
     */
    private convert(teacher: TeacherMySuffix): TeacherMySuffix {
        const copy: TeacherMySuffix = Object.assign({}, teacher);

        copy.createTime = this.dateUtils.toDate(teacher.createTime);

        copy.updateTime = this.dateUtils.toDate(teacher.updateTime);
        return copy;
    }
}
