/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { KnowledgePointMySuffixDialogComponent } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix-dialog.component';
import { KnowledgePointMySuffixService } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.service';
import { KnowledgePointMySuffix } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.model';
import { TeacherMySuffixService } from '../../../../../../main/webapp/app/entities/teacher-my-suffix';
import { CourseMySuffixService } from '../../../../../../main/webapp/app/entities/course-my-suffix';

describe('Component Tests', () => {

    describe('KnowledgePointMySuffix Management Dialog Component', () => {
        let comp: KnowledgePointMySuffixDialogComponent;
        let fixture: ComponentFixture<KnowledgePointMySuffixDialogComponent>;
        let service: KnowledgePointMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [KnowledgePointMySuffixDialogComponent],
                providers: [
                    TeacherMySuffixService,
                    CourseMySuffixService,
                    KnowledgePointMySuffixService
                ]
            })
            .overrideTemplate(KnowledgePointMySuffixDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KnowledgePointMySuffixDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KnowledgePointMySuffixService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new KnowledgePointMySuffix(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(entity));
                        comp.knowledgePoint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'knowledgePointListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new KnowledgePointMySuffix();
                        spyOn(service, 'create').and.returnValue(Observable.of(entity));
                        comp.knowledgePoint = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'knowledgePointListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
