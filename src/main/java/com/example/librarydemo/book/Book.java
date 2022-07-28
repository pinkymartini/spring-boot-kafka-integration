package com.example.librarydemo.book;

import com.example.librarydemo.author.Author;

import javax.persistence.*;
import java.util.*;

@Entity
//@Table
public class Book {

    @Id
//    @SequenceGenerator(
//            name= "book_sequence",
//            sequenceName = "book_sequence",
//            allocationSize = 1
//    )

    @GeneratedValue(
           // strategy = GenerationType.SEQUENCE,
            strategy = GenerationType.IDENTITY
              //  generator = "book_sequence"
    )
    private Long id;

    @ManyToMany
    @JoinTable(
            name= "new_table",
            joinColumns = @JoinColumn(name="book_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )

    private Collection<Author> authors = new HashSet<>();

    private Integer isbn;
    private String title;
    private String publisher;
    private Integer pageNumber;

    public Book()
    {

    }//end of constructor.

    public Book(Long id, Integer isbn, String title, String publisher, Integer pageNumber) {
        this.id = id;
        this.isbn = isbn;
        this.title = title;

        this.publisher = publisher;
        this.pageNumber = pageNumber;

    }//end of constructor

    //constructor without id. (will be used to send post requests.)
    public Book(Integer isbn, String title, String publisher, Integer pageNumber) {
        this.isbn = isbn;
        this.title = title;
        this.publisher = publisher;
        this.pageNumber = pageNumber;

    }//end of constructor without id.

    //getters and setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getIsbn() {
        return isbn;
    }

    public void setIsbn(Integer isbn) {
        this.isbn = isbn;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getPublisher() {
        return publisher;
    }

    public void setPublisher(String publisher) {
        this.publisher = publisher;
    }

    public Integer getPageNumber() {
        return pageNumber;
    }

    public void setPageNumber(Integer pageNumber) {
        this.pageNumber = pageNumber;
    }

    public Collection<Author> getAuthors() {
        return authors;
    }

    public void connectAuthor(Author author) {

        authors.add(author);
    }

    @Override
    public String toString() {
        return "Book{" +
                "id=" + id +
                ", isbn=" + isbn +
                ", authors=" + authors +
                ", title='" + title + '\'' +
                ", publisher='" + publisher + '\'' +
                ", pageNumber=" + pageNumber +
                '}';
    }


}
