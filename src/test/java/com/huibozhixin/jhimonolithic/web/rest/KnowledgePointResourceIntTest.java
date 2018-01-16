package com.huibozhixin.jhimonolithic.web.rest;

import com.huibozhixin.jhimonolithic.JhipsterMonolithicApp;

import com.huibozhixin.jhimonolithic.domain.KnowledgePoint;
import com.huibozhixin.jhimonolithic.repository.KnowledgePointRepository;
import com.huibozhixin.jhimonolithic.service.KnowledgePointService;
import com.huibozhixin.jhimonolithic.service.dto.KnowledgePointDTO;
import com.huibozhixin.jhimonolithic.service.mapper.KnowledgePointMapper;
import com.huibozhixin.jhimonolithic.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;

import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static com.huibozhixin.jhimonolithic.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.huibozhixin.jhimonolithic.domain.enumeration.KnowledgePointType;
/**
 * Test class for the KnowledgePointResource REST controller.
 *
 * @see KnowledgePointResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = JhipsterMonolithicApp.class)
public class KnowledgePointResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final Instant DEFAULT_ADD_TIME = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_ADD_TIME = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_SORT = 1;
    private static final Integer UPDATED_SORT = 2;

    private static final Long DEFAULT_PLAY_COUNT = 1L;
    private static final Long UPDATED_PLAY_COUNT = 2L;

    private static final Boolean DEFAULT_FREE = false;
    private static final Boolean UPDATED_FREE = true;

    private static final String DEFAULT_VIDEO_URL = "AAAAAAAAAA";
    private static final String UPDATED_VIDEO_URL = "BBBBBBBBBB";

    private static final String DEFAULT_PLAY_TIME = "AAAAAAAAAA";
    private static final String UPDATED_PLAY_TIME = "BBBBBBBBBB";

    private static final KnowledgePointType DEFAULT_TYPE = KnowledgePointType.VIDEO;
    private static final KnowledgePointType UPDATED_TYPE = KnowledgePointType.FILE;

    private static final String DEFAULT_FILE_TYPE = "AAAAAAAAAA";
    private static final String UPDATED_FILE_TYPE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    @Autowired
    private KnowledgePointRepository knowledgePointRepository;

    @Autowired
    private KnowledgePointMapper knowledgePointMapper;

    @Autowired
    private KnowledgePointService knowledgePointService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restKnowledgePointMockMvc;

    private KnowledgePoint knowledgePoint;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final KnowledgePointResource knowledgePointResource = new KnowledgePointResource(knowledgePointService);
        this.restKnowledgePointMockMvc = MockMvcBuilders.standaloneSetup(knowledgePointResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static KnowledgePoint createEntity(EntityManager em) {
        KnowledgePoint knowledgePoint = new KnowledgePoint()
            .name(DEFAULT_NAME)
            .addTime(DEFAULT_ADD_TIME)
            .sort(DEFAULT_SORT)
            .playCount(DEFAULT_PLAY_COUNT)
            .free(DEFAULT_FREE)
            .videoUrl(DEFAULT_VIDEO_URL)
            .playTime(DEFAULT_PLAY_TIME)
            .type(DEFAULT_TYPE)
            .fileType(DEFAULT_FILE_TYPE)
            .content(DEFAULT_CONTENT);
        return knowledgePoint;
    }

    @Before
    public void initTest() {
        knowledgePoint = createEntity(em);
    }

    @Test
    @Transactional
    public void createKnowledgePoint() throws Exception {
        int databaseSizeBeforeCreate = knowledgePointRepository.findAll().size();

        // Create the KnowledgePoint
        KnowledgePointDTO knowledgePointDTO = knowledgePointMapper.toDto(knowledgePoint);
        restKnowledgePointMockMvc.perform(post("/api/knowledge-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(knowledgePointDTO)))
            .andExpect(status().isCreated());

        // Validate the KnowledgePoint in the database
        List<KnowledgePoint> knowledgePointList = knowledgePointRepository.findAll();
        assertThat(knowledgePointList).hasSize(databaseSizeBeforeCreate + 1);
        KnowledgePoint testKnowledgePoint = knowledgePointList.get(knowledgePointList.size() - 1);
        assertThat(testKnowledgePoint.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testKnowledgePoint.getAddTime()).isEqualTo(DEFAULT_ADD_TIME);
        assertThat(testKnowledgePoint.getSort()).isEqualTo(DEFAULT_SORT);
        assertThat(testKnowledgePoint.getPlayCount()).isEqualTo(DEFAULT_PLAY_COUNT);
        assertThat(testKnowledgePoint.isFree()).isEqualTo(DEFAULT_FREE);
        assertThat(testKnowledgePoint.getVideoUrl()).isEqualTo(DEFAULT_VIDEO_URL);
        assertThat(testKnowledgePoint.getPlayTime()).isEqualTo(DEFAULT_PLAY_TIME);
        assertThat(testKnowledgePoint.getType()).isEqualTo(DEFAULT_TYPE);
        assertThat(testKnowledgePoint.getFileType()).isEqualTo(DEFAULT_FILE_TYPE);
        assertThat(testKnowledgePoint.getContent()).isEqualTo(DEFAULT_CONTENT);
    }

    @Test
    @Transactional
    public void createKnowledgePointWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = knowledgePointRepository.findAll().size();

        // Create the KnowledgePoint with an existing ID
        knowledgePoint.setId(1L);
        KnowledgePointDTO knowledgePointDTO = knowledgePointMapper.toDto(knowledgePoint);

        // An entity with an existing ID cannot be created, so this API call must fail
        restKnowledgePointMockMvc.perform(post("/api/knowledge-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(knowledgePointDTO)))
            .andExpect(status().isBadRequest());

        // Validate the KnowledgePoint in the database
        List<KnowledgePoint> knowledgePointList = knowledgePointRepository.findAll();
        assertThat(knowledgePointList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllKnowledgePoints() throws Exception {
        // Initialize the database
        knowledgePointRepository.saveAndFlush(knowledgePoint);

        // Get all the knowledgePointList
        restKnowledgePointMockMvc.perform(get("/api/knowledge-points?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(knowledgePoint.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].addTime").value(hasItem(DEFAULT_ADD_TIME.toString())))
            .andExpect(jsonPath("$.[*].sort").value(hasItem(DEFAULT_SORT)))
            .andExpect(jsonPath("$.[*].playCount").value(hasItem(DEFAULT_PLAY_COUNT.intValue())))
            .andExpect(jsonPath("$.[*].free").value(hasItem(DEFAULT_FREE.booleanValue())))
            .andExpect(jsonPath("$.[*].videoUrl").value(hasItem(DEFAULT_VIDEO_URL.toString())))
            .andExpect(jsonPath("$.[*].playTime").value(hasItem(DEFAULT_PLAY_TIME.toString())))
            .andExpect(jsonPath("$.[*].type").value(hasItem(DEFAULT_TYPE.toString())))
            .andExpect(jsonPath("$.[*].fileType").value(hasItem(DEFAULT_FILE_TYPE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())));
    }

    @Test
    @Transactional
    public void getKnowledgePoint() throws Exception {
        // Initialize the database
        knowledgePointRepository.saveAndFlush(knowledgePoint);

        // Get the knowledgePoint
        restKnowledgePointMockMvc.perform(get("/api/knowledge-points/{id}", knowledgePoint.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(knowledgePoint.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.addTime").value(DEFAULT_ADD_TIME.toString()))
            .andExpect(jsonPath("$.sort").value(DEFAULT_SORT))
            .andExpect(jsonPath("$.playCount").value(DEFAULT_PLAY_COUNT.intValue()))
            .andExpect(jsonPath("$.free").value(DEFAULT_FREE.booleanValue()))
            .andExpect(jsonPath("$.videoUrl").value(DEFAULT_VIDEO_URL.toString()))
            .andExpect(jsonPath("$.playTime").value(DEFAULT_PLAY_TIME.toString()))
            .andExpect(jsonPath("$.type").value(DEFAULT_TYPE.toString()))
            .andExpect(jsonPath("$.fileType").value(DEFAULT_FILE_TYPE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingKnowledgePoint() throws Exception {
        // Get the knowledgePoint
        restKnowledgePointMockMvc.perform(get("/api/knowledge-points/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateKnowledgePoint() throws Exception {
        // Initialize the database
        knowledgePointRepository.saveAndFlush(knowledgePoint);
        int databaseSizeBeforeUpdate = knowledgePointRepository.findAll().size();

        // Update the knowledgePoint
        KnowledgePoint updatedKnowledgePoint = knowledgePointRepository.findOne(knowledgePoint.getId());
        // Disconnect from session so that the updates on updatedKnowledgePoint are not directly saved in db
        em.detach(updatedKnowledgePoint);
        updatedKnowledgePoint
            .name(UPDATED_NAME)
            .addTime(UPDATED_ADD_TIME)
            .sort(UPDATED_SORT)
            .playCount(UPDATED_PLAY_COUNT)
            .free(UPDATED_FREE)
            .videoUrl(UPDATED_VIDEO_URL)
            .playTime(UPDATED_PLAY_TIME)
            .type(UPDATED_TYPE)
            .fileType(UPDATED_FILE_TYPE)
            .content(UPDATED_CONTENT);
        KnowledgePointDTO knowledgePointDTO = knowledgePointMapper.toDto(updatedKnowledgePoint);

        restKnowledgePointMockMvc.perform(put("/api/knowledge-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(knowledgePointDTO)))
            .andExpect(status().isOk());

        // Validate the KnowledgePoint in the database
        List<KnowledgePoint> knowledgePointList = knowledgePointRepository.findAll();
        assertThat(knowledgePointList).hasSize(databaseSizeBeforeUpdate);
        KnowledgePoint testKnowledgePoint = knowledgePointList.get(knowledgePointList.size() - 1);
        assertThat(testKnowledgePoint.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testKnowledgePoint.getAddTime()).isEqualTo(UPDATED_ADD_TIME);
        assertThat(testKnowledgePoint.getSort()).isEqualTo(UPDATED_SORT);
        assertThat(testKnowledgePoint.getPlayCount()).isEqualTo(UPDATED_PLAY_COUNT);
        assertThat(testKnowledgePoint.isFree()).isEqualTo(UPDATED_FREE);
        assertThat(testKnowledgePoint.getVideoUrl()).isEqualTo(UPDATED_VIDEO_URL);
        assertThat(testKnowledgePoint.getPlayTime()).isEqualTo(UPDATED_PLAY_TIME);
        assertThat(testKnowledgePoint.getType()).isEqualTo(UPDATED_TYPE);
        assertThat(testKnowledgePoint.getFileType()).isEqualTo(UPDATED_FILE_TYPE);
        assertThat(testKnowledgePoint.getContent()).isEqualTo(UPDATED_CONTENT);
    }

    @Test
    @Transactional
    public void updateNonExistingKnowledgePoint() throws Exception {
        int databaseSizeBeforeUpdate = knowledgePointRepository.findAll().size();

        // Create the KnowledgePoint
        KnowledgePointDTO knowledgePointDTO = knowledgePointMapper.toDto(knowledgePoint);

        // If the entity doesn't have an ID, it will be created instead of just being updated
        restKnowledgePointMockMvc.perform(put("/api/knowledge-points")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(knowledgePointDTO)))
            .andExpect(status().isCreated());

        // Validate the KnowledgePoint in the database
        List<KnowledgePoint> knowledgePointList = knowledgePointRepository.findAll();
        assertThat(knowledgePointList).hasSize(databaseSizeBeforeUpdate + 1);
    }

    @Test
    @Transactional
    public void deleteKnowledgePoint() throws Exception {
        // Initialize the database
        knowledgePointRepository.saveAndFlush(knowledgePoint);
        int databaseSizeBeforeDelete = knowledgePointRepository.findAll().size();

        // Get the knowledgePoint
        restKnowledgePointMockMvc.perform(delete("/api/knowledge-points/{id}", knowledgePoint.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<KnowledgePoint> knowledgePointList = knowledgePointRepository.findAll();
        assertThat(knowledgePointList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(KnowledgePoint.class);
        KnowledgePoint knowledgePoint1 = new KnowledgePoint();
        knowledgePoint1.setId(1L);
        KnowledgePoint knowledgePoint2 = new KnowledgePoint();
        knowledgePoint2.setId(knowledgePoint1.getId());
        assertThat(knowledgePoint1).isEqualTo(knowledgePoint2);
        knowledgePoint2.setId(2L);
        assertThat(knowledgePoint1).isNotEqualTo(knowledgePoint2);
        knowledgePoint1.setId(null);
        assertThat(knowledgePoint1).isNotEqualTo(knowledgePoint2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(KnowledgePointDTO.class);
        KnowledgePointDTO knowledgePointDTO1 = new KnowledgePointDTO();
        knowledgePointDTO1.setId(1L);
        KnowledgePointDTO knowledgePointDTO2 = new KnowledgePointDTO();
        assertThat(knowledgePointDTO1).isNotEqualTo(knowledgePointDTO2);
        knowledgePointDTO2.setId(knowledgePointDTO1.getId());
        assertThat(knowledgePointDTO1).isEqualTo(knowledgePointDTO2);
        knowledgePointDTO2.setId(2L);
        assertThat(knowledgePointDTO1).isNotEqualTo(knowledgePointDTO2);
        knowledgePointDTO1.setId(null);
        assertThat(knowledgePointDTO1).isNotEqualTo(knowledgePointDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(knowledgePointMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(knowledgePointMapper.fromId(null)).isNull();
    }
}
