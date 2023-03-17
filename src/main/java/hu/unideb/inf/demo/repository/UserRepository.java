package hu.unideb.inf.demo.repository;


import hu.unideb.inf.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import java.util.Set;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByUsername(String username);

    @Query("select u from User u")
    Set<User> findAll(User user);

    @Query("select u from User  u " +
            "where u.bookStore.id = :bookstoreId")
    Set<User> findByBookStore(Long bookstoreId);
}
