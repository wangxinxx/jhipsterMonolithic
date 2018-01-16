/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { SubjectMySuffixComponent } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.component';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.service';
import { SubjectMySuffix } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.model';

describe('Component Tests', () => {

    describe('SubjectMySuffix Management Component', () => {
        let comp: SubjectMySuffixComponent;
        let fixture: ComponentFixture<SubjectMySuffixComponent>;
        let service: SubjectMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [SubjectMySuffixComponent],
                providers: [
                    SubjectMySuffixService
                ]
            })
            .overrideTemplate(SubjectMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new SubjectMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.subjects[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
