import { BaseEntity } from './../../shared';

export class TeacherMySuffix implements BaseEntity {
    constructor(
        public id?: number,
        public userId?: number,
        public name?: string,
        public education?: string,
        public career?: string,
        public star?: number,
        public picPath?: string,
        public deleted?: boolean,
        public createTime?: any,
        public updateTime?: any,
        public sort?: number,
        public subjectId?: number,
    ) {
        this.deleted = false;
    }
}
