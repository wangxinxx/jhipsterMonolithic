/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { StudyHistoryMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix-dialog.component';
import { StudyHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.service';
import { StudyHistoryMySuffix } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.model';
import { CourseMySuffixService } from '../../../../../../main/webapp/app/entities/course-my-suffix';
import { KnowledgePointMySuffixService } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix';

describe('Component Tests', () => {

    describe('StudyHistoryMySuffix Management Dialog Component', () => {
        let comp: StudyHistoryMySuffixDialogComponent;
        let fixture: ComponentFixture<StudyHistoryMySuffixDialogComponent>;
        let service: StudyHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [StudyHistoryMySuffixDialogComponent],
                providers: [
                    CourseMySuffixService,
                    KnowledgePointMySuffixService,
                    StudyHistoryMySuffixService
                ]
            })
            .overrideTemplate(StudyHistoryMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudyHistoryMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudyHistoryMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudyHistoryMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.studyHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studyHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StudyHistoryMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.studyHistory = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'studyHistoryListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
