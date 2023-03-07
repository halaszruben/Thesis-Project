package hu.unideb.inf.demo.controller;

import hu.unideb.inf.demo.dto.BookStoreTableResponseDto;
import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.entity.User;
import hu.unideb.inf.demo.enums.AuthorityEnum;
import hu.unideb.inf.demo.service.BookstoreTableService;
import hu.unideb.inf.demo.service.UserService;
import hu.unideb.inf.demo.util.AuthorityUtil;
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

    @Autowired
    private UserService userService;

    @PostMapping("")
    public ResponseEntity<?> createTable() {
        BookStoreTable newBookStore = bookstoreTableService.save();

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

        BookStoreTableResponseDto response =
                new BookStoreTableResponseDto(bookStoreTableOpt.orElse(new BookStoreTable()));

        return ResponseEntity.ok(response);
    }

    @PutMapping("{tableId}")
    public ResponseEntity<?> updateTable(@PathVariable Long tableId,
                                         @RequestBody BookStoreTable bookStoreTable) {
        if (bookStoreTable.getTableClaimer() != null) {
            User tableClaimer = bookStoreTable.getTableClaimer();
            tableClaimer = userService.findUserByUsername(tableClaimer.getUsername()).orElse(new User());

            if (AuthorityUtil.hasRole(AuthorityEnum.ROLE_CUSTOMER.name(), tableClaimer)) {
                bookStoreTable.setTableClaimer(tableClaimer);
            }
        }

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
