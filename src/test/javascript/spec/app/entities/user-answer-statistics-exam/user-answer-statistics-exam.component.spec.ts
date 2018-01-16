/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { UserAnswerStatisticsExamComponent } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.component';
import { UserAnswerStatisticsExamService } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.service';
import { UserAnswerStatisticsExam } from '../../../../../../main/webapp/app/entities/user-answer-statistics-exam/user-answer-statistics-exam.model';

describe('Component Tests', () => {

    describe('UserAnswerStatisticsExam Management Component', () => {
        let comp: UserAnswerStatisticsExamComponent;
        let fixture: ComponentFixture<UserAnswerStatisticsExamComponent>;
        let service: UserAnswerStatisticsExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [UserAnswerStatisticsExamComponent],
                providers: [
                    UserAnswerStatisticsExamService
                ]
            })
            .overrideTemplate(UserAnswerStatisticsExamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerStatisticsExamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerStatisticsExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserAnswerStatisticsExam(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userAnswerStatistics[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
