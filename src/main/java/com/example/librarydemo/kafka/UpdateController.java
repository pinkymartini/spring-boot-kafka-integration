package com.example.librarydemo.kafka;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
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

    @GetMapping
    public ArrayList<Object> getUpdateLogs()
    {
        return kafkaListeners.getUpdateLogs();

    }
    @GetMapping(path = {"{offset}"})
    public List<Object> getUpdatesByOffset(@PathVariable("offset" )int offset)
    {
        List<Object> tempArray = kafkaListeners.getUpdateLogs();
        tempArray=  tempArray.subList(offset, tempArray.size());
        return tempArray;
    }


}
