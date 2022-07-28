package com.example.librarydemo.author;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface AuthorRepository extends JpaRepository<Author,Long> {

    @Query("SELECT a FROM Author a WHERE a.name = ?1")
    Optional<Author>findAuthorByName(String name);

    @Query("SELECT a.bookSet FROM Author a WHERE a.id=?1")
    Optional<Author>findBookSetById(Long id);


}
