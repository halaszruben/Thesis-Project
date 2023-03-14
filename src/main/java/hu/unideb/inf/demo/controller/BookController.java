package hu.unideb.inf.demo.controller;

import hu.unideb.inf.demo.dto.BookDto;
import hu.unideb.inf.demo.entity.Book;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/books")
public class BookController {

    @Autowired
    private BookService bookService;

    @PostMapping("")
    public ResponseEntity<Book> createBook(@RequestBody BookDto bookDto,
                                           @AuthenticationPrincipal User user) {
        Book book = bookService.save(bookDto, user);

        return ResponseEntity.ok(book);
    }
}
