package com.huibozhixin.jhimonolithic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huibozhixin.jhimonolithic.service.StudyHistoryService;
import com.huibozhixin.jhimonolithic.web.rest.errors.BadRequestAlertException;
import com.huibozhixin.jhimonolithic.web.rest.util.HeaderUtil;
import com.huibozhixin.jhimonolithic.web.rest.util.PaginationUtil;
import com.huibozhixin.jhimonolithic.service.dto.StudyHistoryDTO;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing StudyHistory.
 */
@RestController
@RequestMapping("/api")
public class StudyHistoryResource {

    private final Logger log = LoggerFactory.getLogger(StudyHistoryResource.class);

    private static final String ENTITY_NAME = "studyHistory";

    private final StudyHistoryService studyHistoryService;

    public StudyHistoryResource(StudyHistoryService studyHistoryService) {
        this.studyHistoryService = studyHistoryService;
    }

    /**
     * POST  /study-histories : Create a new studyHistory.
     *
     * @param studyHistoryDTO the studyHistoryDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new studyHistoryDTO, or with status 400 (Bad Request) if the studyHistory has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/study-histories")
    @Timed
    public ResponseEntity<StudyHistoryDTO> createStudyHistory(@RequestBody StudyHistoryDTO studyHistoryDTO) throws URISyntaxException {
        log.debug("REST request to save StudyHistory : {}", studyHistoryDTO);
        if (studyHistoryDTO.getId() != null) {
            throw new BadRequestAlertException("A new studyHistory cannot already have an ID", ENTITY_NAME, "idexists");
        }
        StudyHistoryDTO result = studyHistoryService.save(studyHistoryDTO);
        return ResponseEntity.created(new URI("/api/study-histories/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /study-histories : Updates an existing studyHistory.
     *
     * @param studyHistoryDTO the studyHistoryDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated studyHistoryDTO,
     * or with status 400 (Bad Request) if the studyHistoryDTO is not valid,
     * or with status 500 (Internal Server Error) if the studyHistoryDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/study-histories")
    @Timed
    public ResponseEntity<StudyHistoryDTO> updateStudyHistory(@RequestBody StudyHistoryDTO studyHistoryDTO) throws URISyntaxException {
        log.debug("REST request to update StudyHistory : {}", studyHistoryDTO);
        if (studyHistoryDTO.getId() == null) {
            return createStudyHistory(studyHistoryDTO);
        }
        StudyHistoryDTO result = studyHistoryService.save(studyHistoryDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, studyHistoryDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /study-histories : get all the studyHistories.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of studyHistories in body
     */
    @GetMapping("/study-histories")
    @Timed
    public ResponseEntity<List<StudyHistoryDTO>> getAllStudyHistories(Pageable pageable) {
        log.debug("REST request to get a page of StudyHistories");
        Page<StudyHistoryDTO> page = studyHistoryService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/study-histories");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /study-histories/:id : get the "id" studyHistory.
     *
     * @param id the id of the studyHistoryDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the studyHistoryDTO, or with status 404 (Not Found)
     */
    @GetMapping("/study-histories/{id}")
    @Timed
    public ResponseEntity<StudyHistoryDTO> getStudyHistory(@PathVariable Long id) {
        log.debug("REST request to get StudyHistory : {}", id);
        StudyHistoryDTO studyHistoryDTO = studyHistoryService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(studyHistoryDTO));
    }

    /**
     * DELETE  /study-histories/:id : delete the "id" studyHistory.
     *
     * @param id the id of the studyHistoryDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/study-histories/{id}")
    @Timed
    public ResponseEntity<Void> deleteStudyHistory(@PathVariable Long id) {
        log.debug("REST request to delete StudyHistory : {}", id);
        studyHistoryService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
