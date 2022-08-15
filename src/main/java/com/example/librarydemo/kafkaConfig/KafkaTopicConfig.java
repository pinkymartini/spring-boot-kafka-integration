package com.example.librarydemo.kafkaConfig;

import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.TopicBuilder;

@Configuration
public class KafkaTopicConfig {


//    @Bean //gets instantiated runs.
//    public NewTopic events(){
//        return TopicBuilder.name("readings").build();
//
//    }
    @Bean //gets instantiated runs.
    public NewTopic deletionEvents(){
        return TopicBuilder.name("deletions").build();

    }
    @Bean //gets instantiated runs.
    public NewTopic updateEvents(){
        return TopicBuilder.name("updates").build();

    }
    @Bean //gets instantiated runs.
    public NewTopic postEvents(){
        return TopicBuilder.name("posts").build();

    }

    @Bean //gets instantiated runs.
    public NewTopic soldBooksEvents(){
        return TopicBuilder.name("books-sold").build();

    }



}
