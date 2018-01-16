package com.huibozhixin.jhimonolithic.service;

import com.huibozhixin.jhimonolithic.service.dto.StudyHistoryDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing StudyHistory.
 */
public interface StudyHistoryService {

    /**
     * Save a studyHistory.
     *
     * @param studyHistoryDTO the entity to save
     * @return the persisted entity
     */
    StudyHistoryDTO save(StudyHistoryDTO studyHistoryDTO);

    /**
     * Get all the studyHistories.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<StudyHistoryDTO> findAll(Pageable pageable);

    /**
     * Get the "id" studyHistory.
     *
     * @param id the id of the entity
     * @return the entity
     */
    StudyHistoryDTO findOne(Long id);

    /**
     * Delete the "id" studyHistory.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
