/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Rx';
import { Headers } from '@angular/http';

import { JhipsterMonolithicTestModule } from '../../../test.module';
import { KnowledgePointMySuffixComponent } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.component';
import { KnowledgePointMySuffixService } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.service';
import { KnowledgePointMySuffix } from '../../../../../../main/webapp/app/entities/knowledge-point-my-suffix/knowledge-point-my-suffix.model';

describe('Component Tests', () => {

    describe('KnowledgePointMySuffix Management Component', () => {
        let comp: KnowledgePointMySuffixComponent;
        let fixture: ComponentFixture<KnowledgePointMySuffixComponent>;
        let service: KnowledgePointMySuffixService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [JhipsterMonolithicTestModule],
                declarations: [KnowledgePointMySuffixComponent],
                providers: [
                    KnowledgePointMySuffixService
                ]
            })
            .overrideTemplate(KnowledgePointMySuffixComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(KnowledgePointMySuffixComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(KnowledgePointMySuffixService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new Headers();
                headers.append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of({
                    json: [new KnowledgePointMySuffix(123)],
                    headers
                }));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.knowledgePoints[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
