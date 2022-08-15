package com.example.librarydemo.book;


import com.example.librarydemo.author.Author;
import com.example.librarydemo.author.AuthorRepository;
import com.fasterxml.jackson.annotation.JsonInclude;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.Instant;
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


    //CHANGE THIS.
    //we get the booklist, then send booklist with kafka.
    @GetMapping
    public List<Book> getBooks()
    {
        List<Book> bookList = bookService.getBooks();

//        for (Book book : bookList
//             ) {
//                    kafkaTemplate.send("readings", "Book Received: " + book);
//                    //kafkaTemplate.send("readings", book.getClass().getSimpleName()+ " Recieved: " + book);
//        }
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

            kafkaTemplate.send("posts","Book Posted: "+ book );
            bookService.addBook(book);
            //add post topic to kafka and monitor that.

    }

    @DeleteMapping(path={"{id}"})
    public void deleteBook(@PathVariable Long id)
    {
        Instant instant = Instant.now();

        Book book = bookRepository.findById(id).orElseThrow(()-> new IllegalStateException(
                "Book with id " + id+ "does not exist."
        ));
        kafkaTemplate.send("deletions", "Book Deleted: "+ book +" at " + instant  );
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
        Book book = bookRepository.findById(bookId).orElseThrow(()-> new IllegalStateException(
                "Book with id " + bookId+ "  does not exist."
        ));

        Author author = authorRepository.findById(authorId).orElseThrow(()-> new IllegalStateException(
                "Author with id " + authorId+ "  does not exist."
        ));
        kafkaTemplate.send("updates", "Book: "+book+ " Connected To Author: " + author);

    }//end of authorToBook() function

//    @PutMapping(path="{bookId}")
//    public void updateBook(
//            @PathVariable("bookId") Long bookId,
//            @RequestParam(required = false) Integer isbn,
//            @RequestParam(required = false) String title,
//            @RequestParam(required = false) String publisher,
//            @RequestParam(required = false) Integer pageNumber
//    )
//    {
//
//       bookService.updateBook(bookId, isbn, title, publisher, pageNumber);
//        Book book = bookRepository.findById(bookId).orElseThrow(()-> new IllegalStateException(
//                "Book with id " + bookId+ "  does not exist."
//        ));
//
//        kafkaTemplate.send("updates", "Book Updated: "+book);
//        System.out.println("updated");
//    }//end of updatebook() function

    @PutMapping(path="{bookId}")/////////////////////////////////////////////////////////
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public void updateBookBody(@RequestBody Book book,@PathVariable Long bookId )
    {
        bookService.updateBook2(bookId, book);
                Book tempbook = bookRepository.findById(bookId).orElseThrow(()-> new IllegalStateException(
                "Book with id " + bookId+ "  does not exist."
        ));
        kafkaTemplate.send("updates", "Book Updated: "+tempbook);

    }

    @PutMapping(path="{bookId}/sold")/////////////////////////////////////////////////////////
    @JsonInclude(JsonInclude.Include.NON_NULL)
    public void sellBook(@RequestBody Book book,@PathVariable Long bookId )
    {
        bookService.sellBook(bookId, book);
        Book tempbook = bookRepository.findById(bookId).orElseThrow(()-> new IllegalStateException(
                "Book with id " + bookId+ "  does not exist."
        ));
        kafkaTemplate.send("books-sold", "The Book : "+ tempbook.getTitle()+ " was sold for "+ (double)book.getQuantity()*tempbook.getPrice() + " dollars");

    }


//    @Bean
//    CommandLineRunner temp(KafkaTemplate<String, Object> kafkaTemplate)
//    {
//        return args -> {
//          kafkaTemplate.send("readings", "hello kafka");
//
//        };
//    }



}
