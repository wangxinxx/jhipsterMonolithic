package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.KnowledgePointDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity KnowledgePoint and its DTO KnowledgePointDTO.
 */
@Mapper(componentModel = "spring", uses = {TeacherMapper.class, CourseMapper.class})
public interface KnowledgePointMapper extends EntityMapper<KnowledgePointDTO, KnowledgePoint> {

    @Mapping(source = "parent.id", target = "parentId")
    @Mapping(source = "teacher.id", target = "teacherId")
    @Mapping(source = "course.id", target = "courseId")
    KnowledgePointDTO toDto(KnowledgePoint knowledgePoint); 

    @Mapping(source = "parentId", target = "parent")
    @Mapping(source = "teacherId", target = "teacher")
    @Mapping(source = "courseId", target = "course")
    @Mapping(target = "children", ignore = true)
    KnowledgePoint toEntity(KnowledgePointDTO knowledgePointDTO);

    default KnowledgePoint fromId(Long id) {
        if (id == null) {
            return null;
        }
        KnowledgePoint knowledgePoint = new KnowledgePoint();
        knowledgePoint.setId(id);
        return knowledgePoint;
    }
}
