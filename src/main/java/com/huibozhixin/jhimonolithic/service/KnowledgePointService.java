package com.huibozhixin.jhimonolithic.service;

import com.huibozhixin.jhimonolithic.service.dto.KnowledgePointDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing KnowledgePoint.
 */
public interface KnowledgePointService {

    /**
     * Save a knowledgePoint.
     *
     * @param knowledgePointDTO the entity to save
     * @return the persisted entity
     */
    KnowledgePointDTO save(KnowledgePointDTO knowledgePointDTO);

    /**
     * Get all the knowledgePoints.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<KnowledgePointDTO> findAll(Pageable pageable);

    /**
     * Get the "id" knowledgePoint.
     *
     * @param id the id of the entity
     * @return the entity
     */
    KnowledgePointDTO findOne(Long id);

    /**
     * Delete the "id" knowledgePoint.
     *
     * @param id the id of the entity
     */
    void delete(Long id);
}
