/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { BaseAnswerExamDetailComponent } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam-detail.component';
import { BaseAnswerExamService } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.service';
import { BaseAnswerExam } from '../../../../../../main/webapp/app/entities/base-answer-exam/base-answer-exam.model';

describe('Component Tests', () => {

    describe('BaseAnswerExam Management Detail Component', () => {
        let comp: BaseAnswerExamDetailComponent;
        let fixture: ComponentFixture<BaseAnswerExamDetailComponent>;
        let service: BaseAnswerExamService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [BaseAnswerExamDetailComponent],
                providers: [
                    BaseAnswerExamService
                ]
            })
            .overrideTemplate(BaseAnswerExamDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(BaseAnswerExamDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(BaseAnswerExamService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new BaseAnswerExam(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.baseAnswer).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
