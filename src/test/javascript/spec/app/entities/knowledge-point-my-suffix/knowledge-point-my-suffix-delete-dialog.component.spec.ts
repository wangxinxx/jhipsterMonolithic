/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { KnowledgePointMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix-delete-dialog.component';
import { KnowledgePointMySuffixService } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.service';

describe('Component Tests', () => {

    describe('KnowledgePointMySuffix Management Delete Component', () => {
        let comp: KnowledgePointMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<KnowledgePointMySuffixDeleteDialogComponent>;
        let service: KnowledgePointMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [KnowledgePointMySuffixDeleteDialogComponent],
                providers: [
                    KnowledgePointMySuffixService
                ]
            })
            .overrideTemplate(KnowledgePointMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KnowledgePointMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KnowledgePointMySuffixService);
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
