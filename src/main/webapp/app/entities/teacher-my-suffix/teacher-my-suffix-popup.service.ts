import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { TeacherMySuffix } from './teacher-my-suffix.model';
import { TeacherMySuffixService } from './teacher-my-suffix.service';

@Injectable()
export class TeacherMySuffixPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private teacherService: TeacherMySuffixService

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
                this.teacherService.find(id).subscribe((teacher) => {
                    teacher.createTime = this.datePipe
                        .transform(teacher.createTime, 'yyyy-MM-ddTHH:mm:ss');
                    teacher.updateTime = this.datePipe
                        .transform(teacher.updateTime, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.teacherModalRef(component, teacher);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.teacherModalRef(component, new TeacherMySuffix());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    teacherModalRef(component: Component, teacher: TeacherMySuffix): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.teacher = teacher;
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
