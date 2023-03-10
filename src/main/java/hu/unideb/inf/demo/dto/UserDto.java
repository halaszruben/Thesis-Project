package hu.unideb.inf.demo.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

public class UserDto {
    @JsonProperty("name")
    private String name;
    @JsonProperty("username")
    private String username;
    @JsonProperty("password")
    private String password;
    @JsonProperty("cohortStartDate")
    private LocalDateTime cohortStartDate;
    @JsonProperty("email")
    private String email;
    @JsonProperty("phoneNumber")
    private Long phoneNumber;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public LocalDateTime getCohortStartDate() {
        return cohortStartDate;
    }

    public void setCohortStartDate(LocalDateTime cohortStartDate) {
        this.cohortStartDate = cohortStartDate;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Long getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(Long phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
}
