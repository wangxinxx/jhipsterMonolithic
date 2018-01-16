/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { StudyHistoryMySuffixComponent } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.component';
import { StudyHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.service';
import { StudyHistoryMySuffix } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.model';

describe('Component Tests', () => {

    describe('StudyHistoryMySuffix Management Component', () => {
        let comp: StudyHistoryMySuffixComponent;
        let fixture: ComponentFixture<StudyHistoryMySuffixComponent>;
        let service: StudyHistoryMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [StudyHistoryMySuffixComponent],
                providers: [
                    StudyHistoryMySuffixService
                ]
            })
            .overrideTemplate(StudyHistoryMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudyHistoryMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudyHistoryMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new StudyHistoryMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.studyHistories[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
