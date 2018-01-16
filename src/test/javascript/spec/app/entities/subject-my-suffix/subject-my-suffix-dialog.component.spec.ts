/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { SubjectMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix-dialog.component';
import { SubjectMySuffixService } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.service';
import { SubjectMySuffix } from '../../../../../../main/webapp/app/entities/subject-my-suffix/subject-my-suffix.model';

describe('Component Tests', () => {

    describe('SubjectMySuffix Management Dialog Component', () => {
        let comp: SubjectMySuffixDialogComponent;
        let fixture: ComponentFixture<SubjectMySuffixDialogComponent>;
        let service: SubjectMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [SubjectMySuffixDialogComponent],
                providers: [
                    SubjectMySuffixService
                ]
            })
            .overrideTemplate(SubjectMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SubjectMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SubjectMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubjectMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.subject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new SubjectMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.subject = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'subjectListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
