package hu.unideb.inf.demo.dto;

import java.time.ZonedDateTime;

public class CommentDto {
    private Long id;
    private Long tableId;
    private String text;
    private String user;
    private ZonedDateTime createdDate;

    public Long getTableId() {
        return tableId;
    }

    public void setTableId(Long tableId) {
        this.tableId = tableId;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ZonedDateTime getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(ZonedDateTime createdDate) {
        this.createdDate = createdDate;
    }

    @Override
    public String toString() {
        return "CommentDto [id=" + id + ", tableId=" + tableId + ", text=" + text + ", user=" + user
                + ", createdDate=" + createdDate + "]";
    }

}
