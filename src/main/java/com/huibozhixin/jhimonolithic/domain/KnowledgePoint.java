package com.huibozhixin.jhimonolithic.domain;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.huibozhixin.jhimonolithic.domain.enumeration.KnowledgePointType;

/**
 * A KnowledgePoint.
 */
@Entity
@Table(name = "knowledge_point")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class KnowledgePoint implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "add_time")
    private Instant addTime;

    @Column(name = "jhi_sort")
    private Integer sort;

    @Column(name = "play_count")
    private Long playCount;

    @Column(name = "free")
    private Boolean free;

    @Column(name = "video_url")
    private String videoUrl;

    @Column(name = "play_time")
    private String playTime;

    @Enumerated(EnumType.STRING)
    @Column(name = "jhi_type")
    private KnowledgePointType type;

    @Column(name = "file_type")
    private String fileType;

    @Lob
    @Column(name = "content")
    private String content;

    @ManyToOne
    private KnowledgePoint parent;

    @ManyToOne
    private Teacher teacher;

    @ManyToOne
    private Course course;

    @OneToMany(mappedBy = "parent")
    @JsonIgnore
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<KnowledgePoint> children = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public KnowledgePoint name(String name) {
        this.name = name;
        return this;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Instant getAddTime() {
        return addTime;
    }

    public KnowledgePoint addTime(Instant addTime) {
        this.addTime = addTime;
        return this;
    }

    public void setAddTime(Instant addTime) {
        this.addTime = addTime;
    }

    public Integer getSort() {
        return sort;
    }

    public KnowledgePoint sort(Integer sort) {
        this.sort = sort;
        return this;
    }

    public void setSort(Integer sort) {
        this.sort = sort;
    }

    public Long getPlayCount() {
        return playCount;
    }

    public KnowledgePoint playCount(Long playCount) {
        this.playCount = playCount;
        return this;
    }

    public void setPlayCount(Long playCount) {
        this.playCount = playCount;
    }

    public Boolean isFree() {
        return free;
    }

    public KnowledgePoint free(Boolean free) {
        this.free = free;
        return this;
    }

    public void setFree(Boolean free) {
        this.free = free;
    }

    public String getVideoUrl() {
        return videoUrl;
    }

    public KnowledgePoint videoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
        return this;
    }

    public void setVideoUrl(String videoUrl) {
        this.videoUrl = videoUrl;
    }

    public String getPlayTime() {
        return playTime;
    }

    public KnowledgePoint playTime(String playTime) {
        this.playTime = playTime;
        return this;
    }

    public void setPlayTime(String playTime) {
        this.playTime = playTime;
    }

    public KnowledgePointType getType() {
        return type;
    }

    public KnowledgePoint type(KnowledgePointType type) {
        this.type = type;
        return this;
    }

    public void setType(KnowledgePointType type) {
        this.type = type;
    }

    public String getFileType() {
        return fileType;
    }

    public KnowledgePoint fileType(String fileType) {
        this.fileType = fileType;
        return this;
    }

    public void setFileType(String fileType) {
        this.fileType = fileType;
    }

    public String getContent() {
        return content;
    }

    public KnowledgePoint content(String content) {
        this.content = content;
        return this;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public KnowledgePoint getParent() {
        return parent;
    }

    public KnowledgePoint parent(KnowledgePoint knowledgePoint) {
        this.parent = knowledgePoint;
        return this;
    }

    public void setParent(KnowledgePoint knowledgePoint) {
        this.parent = knowledgePoint;
    }

    public Teacher getTeacher() {
        return teacher;
    }

    public KnowledgePoint teacher(Teacher teacher) {
        this.teacher = teacher;
        return this;
    }

    public void setTeacher(Teacher teacher) {
        this.teacher = teacher;
    }

    public Course getCourse() {
        return course;
    }

    public KnowledgePoint course(Course course) {
        this.course = course;
        return this;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Set<KnowledgePoint> getChildren() {
        return children;
    }

    public KnowledgePoint children(Set<KnowledgePoint> knowledgePoints) {
        this.children = knowledgePoints;
        return this;
    }

    public KnowledgePoint addChildren(KnowledgePoint knowledgePoint) {
        this.children.add(knowledgePoint);
        knowledgePoint.setParent(this);
        return this;
    }

    public KnowledgePoint removeChildren(KnowledgePoint knowledgePoint) {
        this.children.remove(knowledgePoint);
        knowledgePoint.setParent(null);
        return this;
    }

    public void setChildren(Set<KnowledgePoint> knowledgePoints) {
        this.children = knowledgePoints;
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
        KnowledgePoint knowledgePoint = (KnowledgePoint) o;
        if (knowledgePoint.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), knowledgePoint.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "KnowledgePoint{" +
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
