package hu.unideb.inf.demo.service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

import hu.unideb.inf.demo.dto.BookStoreTableDto;
import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.enums.BookStoreTableStatusEnum;
import hu.unideb.inf.demo.repository.BookStoreRepository;
import hu.unideb.inf.demo.repository.BookStoreTableRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookstoreTableService {

    @Autowired
    private BookStoreTableRepository bookStoreTableRepository;
    
    @Autowired
    private BookStoreRepository bookStoreRepository;

    public BookStoreTable create(BookStoreTableDto bookStoreTableDto, User user) {

        BookStoreTable bookStoreTable = new BookStoreTable();
        BookStore bookStore = bookStoreRepository.getReferenceById(bookStoreTableDto.getBookStoreId());

        bookStoreTable.setBookStoreId(bookStore);
        bookStoreTable.setChairs(bookStoreTableDto.getChairs());
        bookStoreTable.setAssignedNumber(bookStoreTableDto.getAssignedNumber());
        bookStoreTable.setDescription(bookStoreTableDto.getDescription());
        bookStoreTable.setStatus(BookStoreTableStatusEnum.UNAVAILABLE.getStatus());

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

    public void delete(Long tableId) {
        bookStoreTableRepository.deleteById(tableId);
    }

    public Set<BookStoreTable> getTablesByBookStoreId(Long bookStoreId) {
        Set<BookStoreTable> bookStoreTables = bookStoreTableRepository.findByBookStoreId(bookStoreId);

        return bookStoreTables;
    }
}
