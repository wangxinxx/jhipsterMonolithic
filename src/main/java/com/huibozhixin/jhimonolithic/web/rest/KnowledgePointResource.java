package com.huibozhixin.jhimonolithic.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.huibozhixin.jhimonolithic.service.KnowledgePointService;
import com.huibozhixin.jhimonolithic.web.rest.errors.BadRequestAlertException;
import com.huibozhixin.jhimonolithic.web.rest.util.HeaderUtil;
import com.huibozhixin.jhimonolithic.web.rest.util.PaginationUtil;
import com.huibozhixin.jhimonolithic.service.dto.KnowledgePointDTO;
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
 * REST controller for managing KnowledgePoint.
 */
@RestController
@RequestMapping("/api")
public class KnowledgePointResource {

    private final Logger log = LoggerFactory.getLogger(KnowledgePointResource.class);

    private static final String ENTITY_NAME = "knowledgePoint";

    private final KnowledgePointService knowledgePointService;

    public KnowledgePointResource(KnowledgePointService knowledgePointService) {
        this.knowledgePointService = knowledgePointService;
    }

    /**
     * POST  /knowledge-points : Create a new knowledgePoint.
     *
     * @param knowledgePointDTO the knowledgePointDTO to create
     * @return the ResponseEntity with status 201 (Created) and with body the new knowledgePointDTO, or with status 400 (Bad Request) if the knowledgePoint has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/knowledge-points")
    @Timed
    public ResponseEntity<KnowledgePointDTO> createKnowledgePoint(@RequestBody KnowledgePointDTO knowledgePointDTO) throws URISyntaxException {
        log.debug("REST request to save KnowledgePoint : {}", knowledgePointDTO);
        if (knowledgePointDTO.getId() != null) {
            throw new BadRequestAlertException("A new knowledgePoint cannot already have an ID", ENTITY_NAME, "idexists");
        }
        KnowledgePointDTO result = knowledgePointService.save(knowledgePointDTO);
        return ResponseEntity.created(new URI("/api/knowledge-points/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /knowledge-points : Updates an existing knowledgePoint.
     *
     * @param knowledgePointDTO the knowledgePointDTO to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated knowledgePointDTO,
     * or with status 400 (Bad Request) if the knowledgePointDTO is not valid,
     * or with status 500 (Internal Server Error) if the knowledgePointDTO couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/knowledge-points")
    @Timed
    public ResponseEntity<KnowledgePointDTO> updateKnowledgePoint(@RequestBody KnowledgePointDTO knowledgePointDTO) throws URISyntaxException {
        log.debug("REST request to update KnowledgePoint : {}", knowledgePointDTO);
        if (knowledgePointDTO.getId() == null) {
            return createKnowledgePoint(knowledgePointDTO);
        }
        KnowledgePointDTO result = knowledgePointService.save(knowledgePointDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, knowledgePointDTO.getId().toString()))
            .body(result);
    }

    /**
     * GET  /knowledge-points : get all the knowledgePoints.
     *
     * @param pageable the pagination information
     * @return the ResponseEntity with status 200 (OK) and the list of knowledgePoints in body
     */
    @GetMapping("/knowledge-points")
    @Timed
    public ResponseEntity<List<KnowledgePointDTO>> getAllKnowledgePoints(Pageable pageable) {
        log.debug("REST request to get a page of KnowledgePoints");
        Page<KnowledgePointDTO> page = knowledgePointService.findAll(pageable);
        HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(page, "/api/knowledge-points");
        return new ResponseEntity<>(page.getContent(), headers, HttpStatus.OK);
    }

    /**
     * GET  /knowledge-points/:id : get the "id" knowledgePoint.
     *
     * @param id the id of the knowledgePointDTO to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the knowledgePointDTO, or with status 404 (Not Found)
     */
    @GetMapping("/knowledge-points/{id}")
    @Timed
    public ResponseEntity<KnowledgePointDTO> getKnowledgePoint(@PathVariable Long id) {
        log.debug("REST request to get KnowledgePoint : {}", id);
        KnowledgePointDTO knowledgePointDTO = knowledgePointService.findOne(id);
        return ResponseUtil.wrapOrNotFound(Optional.ofNullable(knowledgePointDTO));
    }

    /**
     * DELETE  /knowledge-points/:id : delete the "id" knowledgePoint.
     *
     * @param id the id of the knowledgePointDTO to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/knowledge-points/{id}")
    @Timed
    public ResponseEntity<Void> deleteKnowledgePoint(@PathVariable Long id) {
        log.debug("REST request to delete KnowledgePoint : {}", id);
        knowledgePointService.delete(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
