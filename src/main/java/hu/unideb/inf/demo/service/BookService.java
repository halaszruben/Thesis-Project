package hu.unideb.inf.demo.service;

import hu.unideb.inf.demo.dto.BookDto;
import hu.unideb.inf.demo.entity.Book;
import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.repository.BookRepository;
import hu.unideb.inf.demo.repository.BookStoreRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class BookService {

    @Autowired
    private BookRepository bookRepository;
    @Autowired
    private BookStoreRepository bookStoreRepository;

    public Book save(BookDto bookDto, User user) {
        Book book = new Book();
        BookStore bookstore = bookStoreRepository.getReferenceById(bookDto.getBookstoreId());

        book.setBookStore(bookstore);
        book.setTitle(bookDto.getTitle());
        book.setAuthor(bookDto.getAuthor());
        book.setThemes(bookDto.getThemes());
        book.setLanguage(bookDto.getLanguage());
        book.setPages(bookDto.getPages());
        book.setNumberOfBooks(bookDto.getNumberOfBooks());

        return bookRepository.save(book);
    }
}
