package hu.unideb.inf.demo.repository;

import hu.unideb.inf.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {
}
