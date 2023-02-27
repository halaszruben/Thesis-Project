package hu.unideb.inf.demo.entity;

import jakarta.persistence.*;

import java.util.Set;

@Entity
@Table(name = "book_store_tables")
public class BookStoreTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private Integer chairs;
    private Integer assignedNumber;
    @Column(columnDefinition = "TEXT")
    private String description;
    private String status;
    @ManyToMany
    private Set<User> user;
    @ManyToOne
    private User tableClaimer;
    //this might not be a great idea

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public Set<User> getUser() {
        return user;
    }

    public void setUser(Set<User> user) {
        this.user = user;
    }

    public User getTableClaimer() {
        return tableClaimer;
    }

    public void setTableClaimer(User tableClaimer) {
        this.tableClaimer = tableClaimer;
    }
}
