package hu.unideb.inf.demo.dto;

public class BookDto {

    private Long id;

    private Long bookstoreId;

    private String title;

    private String author;

    private String themes;

    private String language;

    private Integer pages;
    
    private Integer numberOfBooks;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getBookstoreId() {
        return bookstoreId;
    }

    public void setBookstoreId(Long bookstoreId) {
        this.bookstoreId = bookstoreId;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getThemes() {
        return themes;
    }

    public void setThemes(String themes) {
        this.themes = themes;
    }

    public String getLanguage() {
        return language;
    }

    public void setLanguage(String language) {
        this.language = language;
    }

    public Integer getPages() {
        return pages;
    }

    public void setPages(Integer pages) {
        this.pages = pages;
    }

    public Integer getNumberOfBooks() {
        return numberOfBooks;
    }

    public void setNumberOfBooks(Integer numberOfBooks) {
        this.numberOfBooks = numberOfBooks;
    }

    @Override
    public String toString() {
        return "BookDto{" +
                "bookstoreId=" + bookstoreId +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", themes='" + themes + '\'' +
                ", language='" + language + '\'' +
                ", pages=" + pages +
                ", numberOfBooks=" + numberOfBooks +
                '}';
    }
}
