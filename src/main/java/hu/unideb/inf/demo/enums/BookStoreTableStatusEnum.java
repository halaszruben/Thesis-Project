package hu.unideb.inf.demo.enums;

import com.fasterxml.jackson.annotation.JsonFormat;

@JsonFormat(shape = JsonFormat.Shape.OBJECT)
public enum BookStoreTableStatusEnum {
    TABLE_IS_FREE("Table is free",1),

    TABLE_IS_TAKEN("Table is taken",2),

    LEAVING_THE_TABLE("Leaving the table",3);

    private String status;
    private Integer step;

    BookStoreTableStatusEnum(String status, Integer step) {
        this.status = status;
        this.step = step;
    }

    public String getStatus() {
        return status;
    }

    public Integer getStep() {
        return step;
    }
}
