package com.huibozhixin.jhimonolithic.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the StudyHistory entity.
 */
public class StudyHistoryDTO implements Serializable {

    private Long id;

    private Long userId;

    private String kpointName;

    private Long playercount;

    private String databack;

    private Instant updateTime;

    private Long courseId;

    private Long knowledgePointId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getKpointName() {
        return kpointName;
    }

    public void setKpointName(String kpointName) {
        this.kpointName = kpointName;
    }

    public Long getPlayercount() {
        return playercount;
    }

    public void setPlayercount(Long playercount) {
        this.playercount = playercount;
    }

    public String getDataback() {
        return databack;
    }

    public void setDataback(String databack) {
        this.databack = databack;
    }

    public Instant getUpdateTime() {
        return updateTime;
    }

    public void setUpdateTime(Instant updateTime) {
        this.updateTime = updateTime;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    public Long getKnowledgePointId() {
        return knowledgePointId;
    }

    public void setKnowledgePointId(Long knowledgePointId) {
        this.knowledgePointId = knowledgePointId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        StudyHistoryDTO studyHistoryDTO = (StudyHistoryDTO) o;
        if(studyHistoryDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), studyHistoryDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "StudyHistoryDTO{" +
            "id=" + getId() +
            ", userId=" + getUserId() +
            ", kpointName='" + getKpointName() + "'" +
            ", playercount=" + getPlayercount() +
            ", databack='" + getDataback() + "'" +
            ", updateTime='" + getUpdateTime() + "'" +
            "}";
    }
}
