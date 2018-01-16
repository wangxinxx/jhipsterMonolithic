package com.huibozhixin.jhimonolithic.service.mapper;

import com.huibozhixin.jhimonolithic.domain.*;
import com.huibozhixin.jhimonolithic.service.dto.UserAnswerStatisticsDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity UserAnswerStatistics and its DTO UserAnswerStatisticsDTO.
 */
@Mapper(componentModel = "spring", uses = {BaseQuestionMapper.class})
public interface UserAnswerStatisticsMapper extends EntityMapper<UserAnswerStatisticsDTO, UserAnswerStatistics> {

    @Mapping(source = "question.id", target = "questionId")
    UserAnswerStatisticsDTO toDto(UserAnswerStatistics userAnswerStatistics); 

    @Mapping(source = "questionId", target = "question")
    UserAnswerStatistics toEntity(UserAnswerStatisticsDTO userAnswerStatisticsDTO);

    default UserAnswerStatistics fromId(Long id) {
        if (id == null) {
            return null;
        }
        UserAnswerStatistics userAnswerStatistics = new UserAnswerStatistics();
        userAnswerStatistics.setId(id);
        return userAnswerStatistics;
    }
}
