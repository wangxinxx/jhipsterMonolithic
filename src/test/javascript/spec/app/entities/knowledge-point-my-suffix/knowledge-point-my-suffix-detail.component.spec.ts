/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { KnowledgePointMySuffixDetailComponent } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix-detail.component';
import { KnowledgePointMySuffixService } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.service';
import { KnowledgePointMySuffix } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.model';

describe('Component Tests', () => {

    describe('KnowledgePointMySuffix Management Detail Component', () => {
        let comp: KnowledgePointMySuffixDetailComponent;
        let fixture: ComponentFixture<KnowledgePointMySuffixDetailComponent>;
        let service: KnowledgePointMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [KnowledgePointMySuffixDetailComponent],
                providers: [
                    KnowledgePointMySuffixService
                ]
            })
            .overrideTemplate(KnowledgePointMySuffixDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KnowledgePointMySuffixDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KnowledgePointMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new KnowledgePointMySuffix(123)));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.knowledgePoint).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
