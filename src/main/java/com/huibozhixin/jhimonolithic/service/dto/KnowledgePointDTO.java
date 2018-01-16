package com.huibozhixin.jhimonolithic.service.dto;


import java.time.Instant;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;
import javax.persistence.Lob;
import com.huibozhixin.jhimonolithic.domain.enumeration.KnowledgePointType;

/**
 * A DTO for the KnowledgePoint entity.
 */
public class KnowledgePointDTO implements Serializable {

    private Long id;

    private String name;

    private Instant addTime;

    private Integer sort;

    private Long playCount;

    private Boolean free;

    private String videoUrl;

    private String playTime;

    private KnowledgePointType type;

    private String fileType;

    @Lob
    private String content;

    private Long parentId;

    private Long teacherId;

    private Long courseId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getAddTime() {
        return addTime;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    public Integer getSort() {
        return sort;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Long getPlayCount() {
        return playCount;
    }

    public void setPlayCount(Long playCount) {
        this.playCount = playCount;
    }

    public Boolean isFree() {
        return free;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getPlayTime() {
        return playTime;
    }

    public void setPlayTime(String playTime) {
        this.playTime = playTime;
    }

    public KnowledgePointType getType() {
        return type;
    }

    public void setType(KnowledgePointType type) {
        this.type = type;
    }

    public String getFileType() {
        return fileType;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Long getParentId() {
        return parentId;
    }

    public void setParentId(Long knowledgePointId) {
        this.parentId = knowledgePointId;
    }

    public Long getTeacherId() {
        return teacherId;
    }

    public void setTeacherId(Long teacherId) {
        this.teacherId = teacherId;
    }

    public Long getCourseId() {
        return courseId;
    }

    public void setCourseId(Long courseId) {
        this.courseId = courseId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        KnowledgePointDTO knowledgePointDTO = (KnowledgePointDTO) o;
        if(knowledgePointDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), knowledgePointDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KnowledgePointDTO{" +
            "id=" + getId() +
            ", name='" + getName() + "'" +
            ", addTime='" + getAddTime() + "'" +
            ", sort=" + getSort() +
            ", playCount=" + getPlayCount() +
            ", free='" + isFree() + "'" +
            ", videoUrl='" + getVideoUrl() + "'" +
            ", playTime='" + getPlayTime() + "'" +
            ", type='" + getType() + "'" +
            ", fileType='" + getFileType() + "'" +
            ", content='" + getContent() + "'" +
            "}";
    }
}
