package hu.unideb.inf.demo.repository;

import java.util.Set;

import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookStoreRepository extends JpaRepository<BookStore, Long> {

    Set<BookStore> findByUser(User user);
}
