package com.example.librarydemo.author;

import com.example.librarydemo.book.Book;
import com.example.librarydemo.book.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import javax.transaction.Transactional;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping(path="api/v1/author/")
@CrossOrigin("*")
public class AuthorController {
    @Autowired
    private final AuthorRepository authorRepository;
    @Autowired
    private final BookRepository bookRepository;
    @Autowired
    private AuthorService authorService;

    @Autowired
    private KafkaTemplate<String, Object> kafkaTemplate;

    @Autowired
    AuthorController(AuthorRepository authorRepository, BookRepository bookRepository,AuthorService authorService)
    {
        this.authorRepository =authorRepository;
        this.bookRepository=bookRepository;
        this.authorService= authorService;
    }


    @GetMapping
    public List<Author> getAuthors()
    {
        List<Author> authorList= authorService.getAuthors();

        for (Author author: authorList
             ) {
            kafkaTemplate.send("readings", "Author Received " + author);

        }

        return authorService.getAuthors();
    }

    @GetMapping(path = {"{authorId}"})
    public Optional<Author> getAuthorsById(@PathVariable("authorId" )Long authorId)
    {
        return authorService.getAuthorById(authorId);
    }

    @DeleteMapping(path={"{id}"})
    public void deleteAuthor(@PathVariable Long id)
    {
        Author author = authorRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Author with id " + id+ "does not exist."
        ));
        kafkaTemplate.send("deletions", "Author deleted: "+ author);
        authorService.deleteAuthor(id);
    }

    @PostMapping/////////////////////////////////////////////////////////
    public void registerAuthor(@RequestBody Author author)
    {
        //use if statements to confirm the post request.

        kafkaTemplate.send("posts","Author created: "+ author );
        authorService.addAuthor(author);
        //add post topic to kafka and monitor that.

    }

    @PutMapping(path="{authorId}")
    public void updateAuthor(
            @PathVariable("authorId") Long id,
            @RequestParam(required = false) String name,
            @RequestParam(required = false) String surname,
            @RequestParam(required = false) LocalDate dob

    )
    {

        authorService.updateAuthor(id, name, surname, dob);
        Author author = authorRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Author with id " + id+ "does not exist."
        ));

        kafkaTemplate.send("updates", "Updated Author: "+author);



    }//end of updateAuthor() function




}
