package hu.unideb.inf.demo.repository;

import java.util.Set;

import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookStoreRepository extends JpaRepository<BookStore, Long> {

    Set<BookStore> findByUser(User user);

    @Query("select b from BookStore b")
    Set<BookStore> findAll(User user);
}
