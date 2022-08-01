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
            bookRepository.save(new Book(12376512,"Title 1","Red House",213));
            bookRepository.save(new Book(45221346,"Title 12","Blue House",41));
            bookRepository.save(new Book(79787889,"Title 45","Black House",233));
            bookRepository.save(new Book(87111232,"Title 32","White House",111));
            bookRepository.save(new Book(14200000,"Title 11","No House",93));
            bookRepository.save(new Book(52212222,"Title 88","Some House",2131));
            bookRepository.save(new Book(52109231,"Title 213","My House",4442));
            bookRepository.save(new Book(66612372,"Title 123","Lord House",113));
            bookRepository.save(new Book(12313217,"Title 13","King House",22));
            bookRepository.save(new Book(54422114,"Title 10","Duchy House",666));

        //System.out.println((int)((Math.random() * (1996-1933)+1933)));

        };
    }




}
