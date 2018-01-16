import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { StudyHistoryMySuffix } from './study-history-my-suffix.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class StudyHistoryMySuffixService {

    private resourceUrl = SERVER_API_URL + 'api/study-histories';

    constructor(private http: Http, private dateUtils: JhiDateUtils) { }

    create(studyHistory: StudyHistoryMySuffix): Observable<StudyHistoryMySuffix> {
        const copy = this.convert(studyHistory);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(studyHistory: StudyHistoryMySuffix): Observable<StudyHistoryMySuffix> {
        const copy = this.convert(studyHistory);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<StudyHistoryMySuffix> {
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
     * Convert a returned JSON object to StudyHistoryMySuffix.
     */
    private convertItemFromServer(json: any): StudyHistoryMySuffix {
        const entity: StudyHistoryMySuffix = Object.assign(new StudyHistoryMySuffix(), json);
        entity.updateTime = this.dateUtils
            .convertDateTimeFromServer(json.updateTime);
        return entity;
    }

    /**
     * Convert a StudyHistoryMySuffix to a JSON which can be sent to the server.
     */
    private convert(studyHistory: StudyHistoryMySuffix): StudyHistoryMySuffix {
        const copy: StudyHistoryMySuffix = Object.assign({}, studyHistory);

        copy.updateTime = this.dateUtils.toDate(studyHistory.updateTime);
        return copy;
    }
}
