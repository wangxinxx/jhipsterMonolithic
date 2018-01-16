package com.huibozhixin.jhimonolithic.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.Objects;

/**
 * A StudyHistory.
 */
@Entity
@Table(name = "study_history")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class StudyHistory implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "kpoint_name")
    private String kpointName;

    @Column(name = "playercount")
    private Long playercount;

    @Column(name = "databack")
    private String databack;

    @Column(name = "update_time")
    private Instant updateTime;

    @ManyToOne
    private Course course;

    @ManyToOne
    private KnowledgePoint knowledgePoint;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public StudyHistory userId(Long userId) {
        this.userId = userId;
        return this;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getKpointName() {
        return kpointName;
    }

    public StudyHistory kpointName(String kpointName) {
        this.kpointName = kpointName;
        return this;
    }

    public void setKpointName(String kpointName) {
        this.kpointName = kpointName;
    }

    public Long getPlayercount() {
        return playercount;
    }

    public StudyHistory playercount(Long playercount) {
        this.playercount = playercount;
        return this;
    }

    public void setPlayercount(Long playercount) {
        this.playercount = playercount;
    }

    public String getDataback() {
        return databack;
    }

    public StudyHistory databack(String databack) {
        this.databack = databack;
        return this;
    }

    public void setDataback(String databack) {
        this.databack = databack;
    }

    public Instant getUpdateTime() {
        return updateTime;
    }

    public StudyHistory updateTime(Instant updateTime) {
        this.updateTime = updateTime;
        return this;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Course getCourse() {
        return course;
    }

    public StudyHistory course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public KnowledgePoint getKnowledgePoint() {
        return knowledgePoint;
    }

    public StudyHistory knowledgePoint(KnowledgePoint knowledgePoint) {
        this.knowledgePoint = knowledgePoint;
        return this;
    }

    public void setKnowledgePoint(KnowledgePoint knowledgePoint) {
        this.knowledgePoint = knowledgePoint;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }
        StudyHistory studyHistory = (StudyHistory) o;
        if (studyHistory.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studyHistory.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudyHistory{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", kpointName='" + getKpointName() + "'" +
            ", playercount=" + getPlayercount() +
            ", databack='" + getDataback() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            "}";
    }
}
