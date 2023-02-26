package hu.unideb.inf.demo.controller;

import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.service.BookstoreTableService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
@RequestMapping("/api/tables")
public class BookStoreTableController {

    @Autowired
    private BookstoreTableService bookstoreTableService;

    @PostMapping("")
    public ResponseEntity<?> createTabele(@AuthenticationPrincipal Set<User> users) {
        BookStoreTable newBookStore = bookstoreTableService.save(users);

        return ResponseEntity.ok(newBookStore);
    }

    @GetMapping("")
    public ResponseEntity<?> getTables() {
        List<BookStoreTable> tablesByUser = bookstoreTableService.findAll();

        return ResponseEntity.ok(tablesByUser);
    }

    @GetMapping("{tableId}")
    public ResponseEntity<?> getTable(@PathVariable Long tableId) {
        Optional<BookStoreTable> bookStoreTableOpt = bookstoreTableService.findById(tableId);

        return ResponseEntity.ok(bookStoreTableOpt.orElse(new BookStoreTable()));
    }

    @PutMapping("{tableId}")
    public ResponseEntity<?> updateTable(@PathVariable Long tableId,
                                         @RequestBody BookStoreTable bookStoreTable) {
        BookStoreTable updatedTable = bookstoreTableService.save(bookStoreTable);
        return ResponseEntity.ok(updatedTable);
    }

    @DeleteMapping("{tableId}")
    public ResponseEntity<?> deleteTable(@PathVariable Long tableId) {

        try {
            bookstoreTableService.delete(tableId);
            return ResponseEntity.ok("Table successfully deleted!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
