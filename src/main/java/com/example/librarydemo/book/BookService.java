package com.example.librarydemo.book;

import com.example.librarydemo.author.Author;
import com.example.librarydemo.author.AuthorRepository;
import net.bytebuddy.implementation.bytecode.Throw;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Service;


import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class BookService {

    //business logic.

    private final BookRepository bookRepository;

    private  AuthorRepository authorRepository;

    @Autowired
    public BookService(BookRepository bookRepository, AuthorRepository authorRepository)
    {
        this.bookRepository=bookRepository;
        this.authorRepository = authorRepository;

    }


    public List<Book> getBooks()
    {
          return bookRepository.findAll();
    }

    public void addBook(Book book)
    {

        Optional<Book> tempBook = bookRepository.findBookByTitle(book.getTitle());

        if(tempBook.isPresent())
        {
            throw new IllegalStateException("Book is already in the system");
        }

        bookRepository.save(book);

    }

    public void deleteBook(Long id)
    { //also can be checked with boolean "exists"
        Optional<Book> tempBook = bookRepository.findById(id);

        if(tempBook.isEmpty())
        {
            throw new IllegalStateException("Book with that id doesn't exist.");
        }

        bookRepository.deleteById(id);

    }

    public Optional<Book> getBookById(Long bookId) {

        Optional<Book> book= bookRepository.findById(bookId);
        return book;
    }

    //function used to register the author. many-to-many mapping.
    public void registerAuthor(Long bookId, Long authorId)
    {
        Book book = bookRepository.findById(bookId).get();
        Author author = authorRepository.findById(authorId).get();

        book.connectAuthor(author);

        bookRepository.save(book);

    }
@Transactional
    public void updateBook(Long id, Integer isbn, String title, String publisher, Integer pageNumber)
    {
        Book book = bookRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Book with ID " + id+ "does not exist."
        ));

        //can add business logic
        book.setTitle(title);
        book.setPublisher(publisher);
        book.setPageNumber(pageNumber);
        book.setIsbn(isbn);

    }

}
