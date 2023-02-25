package hu.unideb.inf.demo.repository;

import hu.unideb.inf.demo.entity.BookStoreTable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookStoreTableRepository extends JpaRepository<BookStoreTable, Long> {
}
