package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.StudyHistoryDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity StudyHistory and its DTO StudyHistoryDTO.
 */
@Mapper(componentModel = "spring", uses = {CourseMapper.class, KnowledgePointMapper.class})
public interface StudyHistoryMapper extends EntityMapper<StudyHistoryDTO, StudyHistory> {

    @Mapping(source = "course.id", target = "courseId")
    @Mapping(source = "knowledgePoint.id", target = "knowledgePointId")
    StudyHistoryDTO toDto(StudyHistory studyHistory); 

    @Mapping(source = "courseId", target = "course")
    @Mapping(source = "knowledgePointId", target = "knowledgePoint")
    StudyHistory toEntity(StudyHistoryDTO studyHistoryDTO);

    default StudyHistory fromId(Long id) {
        if (id == null) {
            return null;
        }
        StudyHistory studyHistory = new StudyHistory();
        studyHistory.setId(id);
        return studyHistory;
    }
}
