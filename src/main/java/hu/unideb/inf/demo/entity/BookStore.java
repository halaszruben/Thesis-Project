package hu.unideb.inf.demo.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "book_stores")
public class BookStore {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    @Column(columnDefinition = "TEXT")
    private String description;
    @OneToMany
    private List<User> workerUsers;

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

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public List<User> getWorkerUsers() {
        return workerUsers;
    }

    public void setWorkerUsers(List<User> workerUsers) {
        this.workerUsers = workerUsers;
    }
}
