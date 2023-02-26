package hu.unideb.inf.demo.dto;

import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.enums.BookStoreTableStatusEnum;

public class BookStoreTableResponseDto {

    private BookStoreTable bookStoreTable;
    private BookStoreTableStatusEnum[] statusEnums = BookStoreTableStatusEnum.values();

    public BookStoreTableResponseDto(BookStoreTable bookStoreTable) {
        this.bookStoreTable = bookStoreTable;
    }

    public BookStoreTable getBookStoreTable() {
        return bookStoreTable;
    }

    public void setBookStoreTable(BookStoreTable bookStoreTable) {
        this.bookStoreTable = bookStoreTable;
    }

    public BookStoreTableStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
