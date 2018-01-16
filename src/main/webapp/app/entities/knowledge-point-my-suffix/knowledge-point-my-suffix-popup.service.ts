import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { KnowledgePointMySuffix } from './knowledge-point-my-suffix.model';
import { KnowledgePointMySuffixService } from './knowledge-point-my-suffix.service';

@Injectable()
export class KnowledgePointMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private knowledgePointService: KnowledgePointMySuffixService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.knowledgePointService.find(id).subscribe((knowledgePoint) => {
                    knowledgePoint.addTime = this.datePipe
                        .transform(knowledgePoint.addTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.knowledgePointModalRef(component, knowledgePoint);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.knowledgePointModalRef(component, new KnowledgePointMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    knowledgePointModalRef(component: Component, knowledgePoint: KnowledgePointMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.knowledgePoint = knowledgePoint;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
