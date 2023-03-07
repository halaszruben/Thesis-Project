package hu.unideb.inf.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "comments")
public class Comment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JsonIgnore
    private BookStoreTable bookStoreTable;
    @ManyToOne
    @JoinColumn(name = "user_id")
    private User createdBy;
    private LocalDateTime createdDate;
    @Column(columnDefinition = "TEXT")
    private String text;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public BookStoreTable getBookStoreTable() {
        return bookStoreTable;
    }

    public void setBookStoreTable(BookStoreTable bookStoreTable) {
        this.bookStoreTable = bookStoreTable;
    }

    public User getCreatedBy() {
        return createdBy;
    }

    public void setCreatedBy(User createdBy) {
        this.createdBy = createdBy;
    }

    public LocalDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(LocalDateTime createdDate) {
        this.createdDate = createdDate;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
