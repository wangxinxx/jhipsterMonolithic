import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CourseMySuffix } from './course-my-suffix.model';
import { CourseMySuffixService } from './course-my-suffix.service';

@Injectable()
export class CourseMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private courseService: CourseMySuffixService

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
                this.courseService.find(id).subscribe((course) => {
                    course.addAt = this.datePipe
                        .transform(course.addAt, 'yyyy-MM-ddTHH:mm:ss');
                    course.updateTime = this.datePipe
                        .transform(course.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    course.soldOutTime = this.datePipe
                        .transform(course.soldOutTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.courseModalRef(component, course);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.courseModalRef(component, new CourseMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    courseModalRef(component: Component, course: CourseMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.course = course;
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
