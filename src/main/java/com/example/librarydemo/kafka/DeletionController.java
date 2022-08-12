package com.example.librarydemo.kafka;

import com.example.librarydemo.book.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.function.Consumer;

@RestController
@RequestMapping(path="api/v1/deletions")
@CrossOrigin("*")
public class DeletionController {
    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @Autowired
    private KafkaListeners kafkaListeners;


    public DeletionController(KafkaTemplate<String,Object> kafkaTemplate, KafkaListeners kafkaListeners)
    {
        this.kafkaTemplate=kafkaTemplate;
        this.kafkaListeners=kafkaListeners;

    }

//    @PostMapping
//    public void publish(@RequestBody MessageRequest request)
//    {
//        kafkaTemplate.send("deletions", request.message());
//    }

    @GetMapping
    public ArrayList<Object> getDeletionLogs()
    {
        return kafkaListeners.getDeletionLogs();

    }

    @GetMapping(path = {"{offset}"})
    public List<Object> getDeletionsByOffset(@PathVariable("offset" )int offset)
    {
        List<Object> tempArray = kafkaListeners.getDeletionLogs();
        tempArray=  tempArray.subList(offset, tempArray.size());
        return tempArray;
    }


}
