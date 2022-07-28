package com.example.librarydemo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.function.Consumer;

@RestController
@RequestMapping(path="api/v1/updates")
@CrossOrigin("*")
public class UpdateController {
    @Autowired
    private KafkaTemplate<String,Object> kafkaTemplate;

    @Autowired
    private KafkaListeners kafkaListeners;


    public UpdateController(KafkaTemplate<String,Object> kafkaTemplate, KafkaListeners kafkaListeners)
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
        return kafkaListeners.getUpdateLogs();

    }


}
