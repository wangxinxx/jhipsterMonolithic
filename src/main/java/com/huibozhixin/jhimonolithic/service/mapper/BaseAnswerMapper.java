package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.BaseAnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity BaseAnswer and its DTO BaseAnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {BaseQuestionMapper.class})
public interface BaseAnswerMapper extends EntityMapper<BaseAnswerDTO, BaseAnswer> {

    @Mapping(source = "question.id", target = "questionId")
    BaseAnswerDTO toDto(BaseAnswer baseAnswer); 

    @Mapping(source = "questionId", target = "question")
    BaseAnswer toEntity(BaseAnswerDTO baseAnswerDTO);

    default BaseAnswer fromId(Long id) {
        if (id == null) {
            return null;
        }
        BaseAnswer baseAnswer = new BaseAnswer();
        baseAnswer.setId(id);
        return baseAnswer;
    }
}
