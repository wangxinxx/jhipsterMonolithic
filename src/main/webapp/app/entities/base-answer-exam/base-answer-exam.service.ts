import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BaseAnswerExam } from './base-answer-exam.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BaseAnswerExamService {

    private resourceUrl = SERVER_API_URL + 'api/base-answers';

    constructor(private http: Http) { }

    create(baseAnswer: BaseAnswerExam): Observable<BaseAnswerExam> {
        const copy = this.convert(baseAnswer);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(baseAnswer: BaseAnswerExam): Observable<BaseAnswerExam> {
        const copy = this.convert(baseAnswer);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BaseAnswerExam> {
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
     * Convert a returned JSON object to BaseAnswerExam.
     */
    private convertItemFromServer(json: any): BaseAnswerExam {
        const entity: BaseAnswerExam = Object.assign(new BaseAnswerExam(), json);
        return entity;
    }

    /**
     * Convert a BaseAnswerExam to a JSON which can be sent to the server.
     */
    private convert(baseAnswer: BaseAnswerExam): BaseAnswerExam {
        const copy: BaseAnswerExam = Object.assign({}, baseAnswer);
        return copy;
    }
}
