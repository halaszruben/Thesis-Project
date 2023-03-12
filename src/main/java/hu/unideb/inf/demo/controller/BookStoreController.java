package hu.unideb.inf.demo.controller;

import java.util.Optional;
import java.util.Set;

import hu.unideb.inf.demo.entity.BookStore;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.BookStoreService;
import hu.unideb.inf.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/bookstores")
public class BookStoreController {

    @Autowired
    private BookStoreService bookStoreService;
    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createBookstore(@AuthenticationPrincipal User user) {
        BookStore newBookstore = bookStoreService.save(user);

        return ResponseEntity.ok(newBookstore);
    }

    @GetMapping("")
    public ResponseEntity<?> getBookstores(@AuthenticationPrincipal User user) {
        Set<BookStore> bookstoresByUser = bookStoreService.findByUser(user);

        return ResponseEntity.ok(bookstoresByUser);
    }

    @GetMapping("{bookstoreId}")
    public ResponseEntity<?> getBookstore(@PathVariable Long bookstoreId,
                                           @AuthenticationPrincipal User user) {
        Optional<BookStore> bookStoreOpt = bookStoreService.findById(bookstoreId);

        return ResponseEntity.ok(bookStoreOpt.orElse(new BookStore()));
    }

    @PutMapping("{bookstoreId}")
    public ResponseEntity<?> updateBookstore(@PathVariable Long bookstoreId,
                                             @RequestBody BookStore bookStore,
                                             @AuthenticationPrincipal User user) {
        BookStore updatedBookstore = bookStoreService.save(bookStore);

        return ResponseEntity.ok(updatedBookstore);
    }

}