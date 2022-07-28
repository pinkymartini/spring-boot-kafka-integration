package com.example.librarydemo.author;

import com.example.librarydemo.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Service
public class AuthorService {

    private final AuthorRepository authorRepository;
    private final BookRepository bookRepository;

    @Autowired
    public AuthorService(AuthorRepository authorRepository, BookRepository bookRepository)
    {
        this.authorRepository= authorRepository;
        this.bookRepository=bookRepository;

    }

    public void addAuthor(Author author)
    {

        Optional<Author> tempAuthor = authorRepository.findAuthorByName(author.getName());

        if(tempAuthor.isPresent())
        {
            throw new IllegalStateException("Author is existent");
        }

        authorRepository.save(author);

    }

    public void deleteAuthor(Long id)
    { //also can be checked with boolean "exists"
        Optional<Author> tempAuthor = authorRepository.findById(id);

        if(tempAuthor.isEmpty())
        {
            throw new IllegalStateException("Author with that id doesn't exist.");
        }

        authorRepository.deleteById(id);

    }

    public Optional<Author> getAuthorById(Long authorId) {

        Optional<Author> author= authorRepository.findById(authorId);
        return author;
    }

    public List<Author> getAuthors()
    {
        return authorRepository.findAll();
    }

    @Transactional
    public void updateAuthor(Long id, String name, String surname, LocalDate dob)
    {
        Author author = authorRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Author with ID " + id+ "does not exist."
        ));

        //can add business logic
        author.setName(name);
        author.setSurname(surname);
        author.setDob(dob);
    }




}
