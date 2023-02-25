package hu.unideb.inf.demo.service;

import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.BookStoreTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class BookstoreTableService {

    @Autowired
    private BookStoreTableRepository bookStoreTableRepository;

    public BookStoreTable save(Set<User> user) {
        BookStoreTable bookStoreTable = new BookStoreTable();
        bookStoreTable.setStatus("Free Table");
        bookStoreTable.setUser(user);

        return bookStoreTableRepository.save(bookStoreTable);
    }

    public List<BookStoreTable> findAll() {
        return bookStoreTableRepository.findAll();
    }

    public Optional<BookStoreTable> findById(Long tableId) {
        return bookStoreTableRepository.findById(tableId);
    }

    public BookStoreTable save(BookStoreTable bookStoreTable) {
        return bookStoreTableRepository.save(bookStoreTable);
    }
}
