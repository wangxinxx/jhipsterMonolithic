import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { KnowledgePointMySuffix } from './knowledge-point-my-suffix.model';
import { KnowledgePointMySuffixPopupService } from './knowledge-point-my-suffix-popup.service';
import { KnowledgePointMySuffixService } from './knowledge-point-my-suffix.service';

@Component({
    selector: 'jhi-knowledge-point-my-suffix-delete-dialog',
    templateUrl: './knowledge-point-my-suffix-delete-dialog.component.html'
})
export class KnowledgePointMySuffixDeleteDialogComponent {

    knowledgePoint: KnowledgePointMySuffix;

    constructor(
        private knowledgePointService: KnowledgePointMySuffixService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.knowledgePointService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'knowledgePointListModification',
                content: 'Deleted an knowledgePoint'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-knowledge-point-my-suffix-delete-popup',
    template: ''
})
export class KnowledgePointMySuffixDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private knowledgePointPopupService: KnowledgePointMySuffixPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.knowledgePointPopupService
                .open(KnowledgePointMySuffixDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
