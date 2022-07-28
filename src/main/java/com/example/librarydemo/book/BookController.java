package com.example.librarydemo.book;


import com.example.librarydemo.author.AuthorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(path="api/v1/book")
@CrossOrigin("*")
public class BookController {

    private KafkaTemplate<String,Object> kafkaTemplate;

    private final BookService bookService;

    @Autowired
    BookRepository bookRepository;

    @Autowired
    AuthorRepository authorRepository;

    @Autowired
    public BookController (BookService bookService, KafkaTemplate <String,Object> kafkaTemplate){
        this.bookService =bookService;
        this.kafkaTemplate =kafkaTemplate;

    }

    //we get the booklist, then send booklist with kafka.
    @GetMapping
    public List<Book> getBooks()
    {
        List<Book> bookList = bookService.getBooks();

        for (Book book : bookList
             ) {
                    kafkaTemplate.send("readings", "Book Received: " + book);
                    //kafkaTemplate.send("readings", book.getClass().getSimpleName()+ " Recieved: " + book);
        }
        return bookService.getBooks();
    }

    //get a specific book by using its id.
    @GetMapping(path = {"{bookId}"})
    public Optional<Book> getBooksById(@PathVariable("bookId" )Long bookId)
    {
        return bookService.getBookById(bookId);
    }//end of getBooksById() function.

    @PostMapping/////////////////////////////////////////////////////////
    public void registerBook(@RequestBody Book book)
    {
             //use if statements to confirm the post request.

            kafkaTemplate.send("posts","Book created: "+ book );
            bookService.addBook(book);
            //add post topic to kafka and monitor that.

    }

    @DeleteMapping(path={"{id}"})
    public void deleteBook(@PathVariable Long id)
    {
        Book book = bookRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Book with id " + id+ "does not exist."
        ));
        kafkaTemplate.send("deletions", "Book deleted: "+ book);
        bookService.deleteBook(id);
    }

    //function to add authors to a book.
    @PutMapping("/{bookId}/author/{authorId}")
    public void authorToBook(
            @PathVariable Long bookId,
            @PathVariable Long authorId
    )
    {
         bookService.registerAuthor(bookId,authorId);

    }//end of authorToBook() function

    @PutMapping(path="{bookId}")
    public void updateBook(
            @PathVariable("bookId") Long bookId,
            @RequestParam(required = false) Integer isbn,
            @RequestParam(required = false) String title,
            @RequestParam(required = false) String publisher,
            @RequestParam(required = false) Integer pageNumber
    )
    {

       bookService.updateBook(bookId, isbn, title, publisher, pageNumber);
        Book book = bookRepository.findById(bookId).orElseThrow(()-> new IllegalStateException(
                "Book with id " + bookId+ "does not exist."
        ));

        kafkaTemplate.send("updates", "Updated Book: "+book);
    }//end of updatebook() function


    @Bean
    CommandLineRunner temp(KafkaTemplate<String, Object> kafkaTemplate)
    {
        return args -> {
          kafkaTemplate.send("readings", "hello kafka");

        };
    }



}
