package com.example.librarydemo.book;

import com.example.librarydemo.author.Author;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;


@Configuration
public class BookConfig {

    @Bean
    @Autowired
    CommandLineRunner commandLineRunner(BookRepository bookRepository)
    {
        return args -> {
            bookRepository.save(new Book(123,"Title 1","Red House",213));
            bookRepository.save(new Book(456,"Title 12","Blue House",41));
            bookRepository.save(new Book(789,"Title 45","Black House",233));
            bookRepository.save(new Book(872,"Title 32","White House",111));
            bookRepository.save(new Book(142,"Title 11","No House",93));
            bookRepository.save(new Book(522,"Title 88","Some House",2131));
            bookRepository.save(new Book(521,"Title 213","Jesus House",4442));
            bookRepository.save(new Book(666,"Title 123","Lord House",113));
            bookRepository.save(new Book(123,"Title 13","Christ House",22));
            bookRepository.save(new Book(544,"Title 10","Antichrist House",666));

        //System.out.println((int)((Math.random() * (1996-1933)+1933)));

        };
    }




}
