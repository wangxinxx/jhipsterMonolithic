package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.UserAnswerDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserAnswer and its DTO UserAnswerDTO.
 */
@Mapper(componentModel = "spring", uses = {BaseQuestionMapper.class})
public interface UserAnswerMapper extends EntityMapper<UserAnswerDTO, UserAnswer> {

    @Mapping(source = "question.id", target = "questionId")
    UserAnswerDTO toDto(UserAnswer userAnswer); 

    @Mapping(source = "questionId", target = "question")
    UserAnswer toEntity(UserAnswerDTO userAnswerDTO);

    default UserAnswer fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserAnswer userAnswer = new UserAnswer();
        userAnswer.setId(id);
        return userAnswer;
    }
}
