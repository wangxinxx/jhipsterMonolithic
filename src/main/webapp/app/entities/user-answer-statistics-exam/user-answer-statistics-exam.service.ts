import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { SERVER_API_URL } from '../../app.constants';

import { UserAnswerStatisticsExam } from './user-answer-statistics-exam.model';
import { ResponseWrapper, createRequestOption } from '../../shared';

@Injectable()
export class UserAnswerStatisticsExamService {

    private resourceUrl = SERVER_API_URL + 'api/user-answer-statistics';

    constructor(private http: Http) { }

    create(userAnswerStatistics: UserAnswerStatisticsExam): Observable<UserAnswerStatisticsExam> {
        const copy = this.convert(userAnswerStatistics);
        return this.http.post(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    update(userAnswerStatistics: UserAnswerStatisticsExam): Observable<UserAnswerStatisticsExam> {
        const copy = this.convert(userAnswerStatistics);
        return this.http.put(this.resourceUrl, copy).map((res: Response) => {
            const jsonResponse = res.json();
            return this.convertItemFromServer(jsonResponse);
        });
    }

    find(id: number): Observable<UserAnswerStatisticsExam> {
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
     * Convert a returned JSON object to UserAnswerStatisticsExam.
     */
    private convertItemFromServer(json: any): UserAnswerStatisticsExam {
        const entity: UserAnswerStatisticsExam = Object.assign(new UserAnswerStatisticsExam(), json);
        return entity;
    }

    /**
     * Convert a UserAnswerStatisticsExam to a JSON which can be sent to the server.
     */
    private convert(userAnswerStatistics: UserAnswerStatisticsExam): UserAnswerStatisticsExam {
        const copy: UserAnswerStatisticsExam = Object.assign({}, userAnswerStatistics);
        return copy;
    }
}
