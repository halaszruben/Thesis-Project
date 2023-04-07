package hu.unideb.inf.demo.dto;

public class BookStoreTableDto {

    private Long bookStoreId;

    private Integer chairs;

    private Integer assignedNumber;

    private String description;

    private String status;

    public Long getBookStoreId() {
        return bookStoreId;
    }

    public void setBookStoreId(Long bookStoreId) {
        this.bookStoreId = bookStoreId;
    }

    public Integer getChairs() {
        return chairs;
    }

    public void setChairs(Integer chairs) {
        this.chairs = chairs;
    }

    public Integer getAssignedNumber() {
        return assignedNumber;
    }

    public void setAssignedNumber(Integer assignedNumber) {
        this.assignedNumber = assignedNumber;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    @Override
    public String toString() {
        return "BookStoreTableDto{" +
                "bookStoreId=" + bookStoreId +
                ", chairs=" + chairs +
                ", assignedNumber=" + assignedNumber +
                ", description='" + description + '\'' +
                ", status='" + status + '\'' +
                '}';
    }
}
