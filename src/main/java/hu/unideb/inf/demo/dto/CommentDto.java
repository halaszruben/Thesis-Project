package hu.unideb.inf.demo.dto;

public class CommentDto {
    private Long id;
    private Long tableId;
    private String text;
    private String user;

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

    @Override
    public String toString() {
        return "CommentDto [tableId=" + tableId + ", text=" + text + ", user=" + user + "]";
    }
}
