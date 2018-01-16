import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { BaseQuestionExam } from './base-question-exam.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class BaseQuestionExamService {

    private resourceUrl = SERVER_API_URL + 'api/base-questions';

    constructor(private http: Http) { }

    create(baseQuestion: BaseQuestionExam): Observable<BaseQuestionExam> {
        const copy = this.convert(baseQuestion);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(baseQuestion: BaseQuestionExam): Observable<BaseQuestionExam> {
        const copy = this.convert(baseQuestion);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<BaseQuestionExam> {
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
     * Convert a returned JSON object to BaseQuestionExam.
     */
    private convertItemFromServer(json: any): BaseQuestionExam {
        const entity: BaseQuestionExam = Object.assign(new BaseQuestionExam(), json);
        return entity;
    }

    /**
     * Convert a BaseQuestionExam to a JSON which can be sent to the server.
     */
    private convert(baseQuestion: BaseQuestionExam): BaseQuestionExam {
        const copy: BaseQuestionExam = Object.assign({}, baseQuestion);
        return copy;
    }
}
