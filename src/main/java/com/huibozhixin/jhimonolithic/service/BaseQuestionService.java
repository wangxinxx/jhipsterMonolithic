package com.huibozhixin.jhimonolithic.service;

import com.huibozhixin.jhimonolithic.domain.BaseQuestion;
import com.huibozhixin.jhimonolithic.service.dto.BaseQuestionDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

/**
 * Service Interface for managing BaseQuestion.
 */
public interface BaseQuestionService {

    /**
     * Save a baseQuestion.
     *
     * @param baseQuestionDTO the entity to save
     * @return the persisted entity
     */
    BaseQuestionDTO save(BaseQuestionDTO baseQuestionDTO);

    /**
     * Get all the baseQuestions.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<BaseQuestionDTO> findAll(Pageable pageable);

    @Transactional(readOnly = true)
    Page<BaseQuestion> findAllWithAnswers(Pageable pageable);

    /**
     * Get the "id" baseQuestion.
     *
     * @param id the id of the entity
     * @return the entity
     */
    BaseQuestionDTO findOne(Long id);

    /**
     * Delete the "id" baseQuestion.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
