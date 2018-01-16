/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { TeacherMySuffixComponent } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.component';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.service';
import { TeacherMySuffix } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.model';

describe('Component Tests', () => {

    describe('TeacherMySuffix Management Component', () => {
        let comp: TeacherMySuffixComponent;
        let fixture: ComponentFixture<TeacherMySuffixComponent>;
        let service: TeacherMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [TeacherMySuffixComponent],
                providers: [
                    TeacherMySuffixService
                ]
            })
            .overrideTemplate(TeacherMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new TeacherMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.teachers[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
