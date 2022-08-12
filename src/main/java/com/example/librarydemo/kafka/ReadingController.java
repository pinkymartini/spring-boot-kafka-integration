package com.example.librarydemo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping(path="api/v1/readings")
@CrossOrigin("*")
public class ReadingController {
    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @Autowired
    private KafkaListeners kafkaListeners;


    public ReadingController(KafkaTemplate<String,Object> kafkaTemplate, KafkaListeners kafkaListeners)
    {
        this.kafkaTemplate=kafkaTemplate;
        this.kafkaListeners=kafkaListeners;

    }

    //to try it out
    @PostMapping
    public void publish(@RequestBody MessageRequest request)
    {
        kafkaTemplate.send("readings", request.message());
    }

    @GetMapping
    public ArrayList<Object> getReadingLogs()
    {
        return kafkaListeners.getReadingLogs();

    }
    @GetMapping(path = {"{offset}"})
    public List<Object> getReadingsByOffset(@PathVariable("offset" )int offset)
    {
        List<Object> tempArray = kafkaListeners.getReadingLogs();
        tempArray=  tempArray.subList(offset, tempArray.size());
        return tempArray;
    }


}
