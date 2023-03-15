package hu.unideb.inf.demo.repository;

import java.util.Set;

import hu.unideb.inf.demo.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book, Long> {

    @Query("select b from Book b " +
            "where b.bookStore.id = :bookstoreId")
    Set<Book> findByBookStore(Long bookstoreId);
}
