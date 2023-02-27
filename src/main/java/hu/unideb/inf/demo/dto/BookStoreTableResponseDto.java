package hu.unideb.inf.demo.dto;

import hu.unideb.inf.demo.entity.BookStoreTable;
import hu.unideb.inf.demo.enums.BookStoreTableStatusEnum;

public class BookStoreTableResponseDto {

    private BookStoreTable table;
    private BookStoreTableStatusEnum[] statusEnums = BookStoreTableStatusEnum.values();

    public BookStoreTableResponseDto(BookStoreTable table) {
        super();
        this.table = table;
    }

    public BookStoreTable getTable() {
        return table;
    }

    public void setBookStoreTable(BookStoreTable table) {
        this.table = table;
    }

    public BookStoreTableStatusEnum[] getStatusEnums() {
        return statusEnums;
    }
}
