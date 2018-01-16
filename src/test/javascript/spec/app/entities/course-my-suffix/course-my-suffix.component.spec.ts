/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { CourseMySuffixComponent } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix.component';
import { CourseMySuffixService } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix.service';
import { CourseMySuffix } from '../../../../../../main/webapp/app/entities/course-my-suffix/course-my-suffix.model';

describe('Component Tests', () => {

    describe('CourseMySuffix Management Component', () => {
        let comp: CourseMySuffixComponent;
        let fixture: ComponentFixture<CourseMySuffixComponent>;
        let service: CourseMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [CourseMySuffixComponent],
                providers: [
                    CourseMySuffixService
                ]
            })
            .overrideTemplate(CourseMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(CourseMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(CourseMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new CourseMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.courses[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
