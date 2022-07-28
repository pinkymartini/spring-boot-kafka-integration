package com.example.librarydemo.author;

import com.example.librarydemo.book.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

@Configuration
public class AuthorConfig {


    @Bean
    CommandLineRunner commandLineRunner2 (AuthorRepository repository)
    {
        return args ->{

            repository.save( new Author(
                    "Robert",
                    "Hussein",
                    LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)),4,23)));

            repository.save( new Author(
                    "Some",
                    "Name",
                    LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)),11,10)));
            repository.save( new Author(
                    "Hugh",
                    "Mungus",
                    LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)),8,14)));
            repository.save( new Author(
                    "Dummy",
                    "Name",
                    LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)),6,2)));
            repository.save( new Author(
                    "Cousin",
                    "Larva",
                    LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)),2,17)));




        };
    }
}


///LocalDate.of((int) ((Math.random() * (1996 - 1933) + 1933)