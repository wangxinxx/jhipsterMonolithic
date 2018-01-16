/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { TeacherMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix-delete-dialog.component';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix/teacher-my-suffix.service';

describe('Component Tests', () => {

    describe('TeacherMySuffix Management Delete Component', () => {
        let comp: TeacherMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<TeacherMySuffixDeleteDialogComponent>;
        let service: TeacherMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [TeacherMySuffixDeleteDialogComponent],
                providers: [
                    TeacherMySuffixService
                ]
            })
            .overrideTemplate(TeacherMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TeacherMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TeacherMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
