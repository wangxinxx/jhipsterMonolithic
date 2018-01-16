/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Rx';
import { JhiEventManager } from 'ng-jhipster';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { StudyHistoryMySuffixDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix-delete-dialog.component';
import { StudyHistoryMySuffixService } from '../../../../../../main/webapp/app/entities/study-history-my-suffix/study-history-my-suffix.service';

describe('Component Tests', () => {

    describe('StudyHistoryMySuffix Management Delete Component', () => {
        let comp: StudyHistoryMySuffixDeleteDialogComponent;
        let fixture: ComponentFixture<StudyHistoryMySuffixDeleteDialogComponent>;
        let service: StudyHistoryMySuffixService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [StudyHistoryMySuffixDeleteDialogComponent],
                providers: [
                    StudyHistoryMySuffixService
                ]
            })
            .overrideTemplate(StudyHistoryMySuffixDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StudyHistoryMySuffixDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StudyHistoryMySuffixService);
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
