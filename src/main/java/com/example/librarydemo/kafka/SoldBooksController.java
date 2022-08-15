package com.example.librarydemo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/books-sold")
@CrossOrigin("*")
public class SoldBooksController {

    @Autowired
    private KafkaListeners kafkaListeners;


    public SoldBooksController(KafkaListeners kafkaListeners)
    {

        this.kafkaListeners=kafkaListeners;

    }

    @GetMapping
    public ArrayList<Object> getBooksSoldLogs()
    {
        return kafkaListeners.getBooksSoldLogs();

    }

    @GetMapping(path = {"{offset}"})
    public List<Object> getSoldBooksByOffset(@PathVariable("offset" )int offset)
    {
        List<Object> tempArray = kafkaListeners.getBooksSoldLogs();
        tempArray=  tempArray.subList(offset, tempArray.size());
        return tempArray;
    }
}
