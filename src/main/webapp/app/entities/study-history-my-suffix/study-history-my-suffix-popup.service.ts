import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { StudyHistoryMySuffix } from './study-history-my-suffix.model';
import { StudyHistoryMySuffixService } from './study-history-my-suffix.service';

@Injectable()
export class StudyHistoryMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private studyHistoryService: StudyHistoryMySuffixService

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
                this.studyHistoryService.find(id).subscribe((studyHistory) => {
                    studyHistory.updateTime = this.datePipe
                        .transform(studyHistory.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.studyHistoryModalRef(component, studyHistory);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.studyHistoryModalRef(component, new StudyHistoryMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    studyHistoryModalRef(component: Component, studyHistory: StudyHistoryMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.studyHistory = studyHistory;
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
