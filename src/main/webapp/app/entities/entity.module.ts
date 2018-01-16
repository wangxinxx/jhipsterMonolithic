import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { JhipsterMonolithicCourseMySuffixModule } from './course-my-suffix/course-my-suffix.module';
import { JhipsterMonolithicSubjectMySuffixModule } from './subject-my-suffix/subject-my-suffix.module';
import { JhipsterMonolithicTeacherMySuffixModule } from './teacher-my-suffix/teacher-my-suffix.module';
import { JhipsterMonolithicKnowledgePointMySuffixModule } from './knowledge-point-my-suffix/knowledge-point-my-suffix.module';
import { JhipsterMonolithicStudyHistoryMySuffixModule } from './study-history-my-suffix/study-history-my-suffix.module';
import { JhipsterMonolithicBaseQuestionExamModule } from './base-question-exam/base-question-exam.module';
import { JhipsterMonolithicBaseAnswerExamModule } from './base-answer-exam/base-answer-exam.module';
import { JhipsterMonolithicUserAnswerExamModule } from './user-answer-exam/user-answer-exam.module';
import { JhipsterMonolithicUserAnswerStatisticsExamModule } from './user-answer-statistics-exam/user-answer-statistics-exam.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        JhipsterMonolithicCourseMySuffixModule,
        JhipsterMonolithicSubjectMySuffixModule,
        JhipsterMonolithicTeacherMySuffixModule,
        JhipsterMonolithicKnowledgePointMySuffixModule,
        JhipsterMonolithicStudyHistoryMySuffixModule,
        JhipsterMonolithicBaseQuestionExamModule,
        JhipsterMonolithicBaseAnswerExamModule,
        JhipsterMonolithicUserAnswerExamModule,
        JhipsterMonolithicUserAnswerStatisticsExamModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class JhipsterMonolithicEntityModule {}
