package hu.unideb.inf.demo.repository;

import java.util.Set;

import hu.unideb.inf.demo.entity.BookStoreTable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookStoreTableRepository extends JpaRepository<BookStoreTable, Long> {

    @Query("select t from BookStoreTable t" +
            " where t.bookStoreId.id = :bookStoreId")
    Set<BookStoreTable> findByBookStoreId(Long bookStoreId);
}
