/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { StudyHistoryMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix-detail.component';
import { StudyHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.service';
import { StudyHistoryMySuffix } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.model';

describe('Component Tests', () => {

    describe('StudyHistoryMySuffix Management Detail Component', () => {
        let comp: StudyHistoryMySuffixDetailComponent;
        let fixture: ComponentFixture<StudyHistoryMySuffixDetailComponent>;
        let service: StudyHistoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [StudyHistoryMySuffixDetailComponent],
                providers: [
                    StudyHistoryMySuffixService
                ]
            })
            .overrideTemplate(StudyHistoryMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudyHistoryMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudyHistoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new StudyHistoryMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.studyHistory).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
