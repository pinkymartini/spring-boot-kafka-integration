package com.example.librarydemo.author;

import com.example.librarydemo.book.Book;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.Collection;
import java.util.HashSet;
import java.util.Set;

@Entity
//@Table
public class Author {

    @Id
//    @SequenceGenerator(
//            name= "author_sequence",
//            sequenceName = "author_sequence",
//            allocationSize = 1
//    )

    @GeneratedValue(
            strategy = GenerationType.IDENTITY
            //generator = "author_sequence"
    )

    private Long id;

    @JsonIgnore
    @ManyToMany(mappedBy = "authors")

    private Collection<Book> bookSet = new HashSet<>();

    private String name;
    private String surname;
    private LocalDate dob;

    public Author()
    {

    }

    public Author(Long id, String name, String surname, LocalDate dob) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.dob = dob;

    }

    public Author(String name, String surname, LocalDate dob) {
        this.name = name;
        this.surname = surname;
        this.dob = dob;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public LocalDate getDob() {
        return dob;
    }

    public void setDob(LocalDate dob) {
        this.dob = dob;
    }

    public Collection<Book> getBookSet() {
        return bookSet;
    }






    @Override
    public String toString() {
        return "Author{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", surname='" + surname + '\'' +
                ", dob=" + dob +
                '}';
    }


}
