/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { UserAnswerExamComponent } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.component';
import { UserAnswerExamService } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.service';
import { UserAnswerExam } from '../../../../../../main/webapp/app/entities/user-answer-exam/user-answer-exam.model';

describe('Component Tests', () => {

    describe('UserAnswerExam Management Component', () => {
        let comp: UserAnswerExamComponent;
        let fixture: ComponentFixture<UserAnswerExamComponent>;
        let service: UserAnswerExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [UserAnswerExamComponent],
                providers: [
                    UserAnswerExamService
                ]
            })
            .overrideTemplate(UserAnswerExamComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserAnswerExamComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserAnswerExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new UserAnswerExam(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userAnswers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
