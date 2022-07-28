package com.example.librarydemo.kafka;


import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.stereotype.Component;

import javax.print.attribute.standard.JobKOctets;
import java.util.ArrayList;

@Component
public class KafkaListeners {

    private ArrayList<Object> readingLogs = new ArrayList<>();
    private ArrayList<Object> deletionLogs = new ArrayList<>();
    private ArrayList<Object> postLogs = new ArrayList<>();
    private ArrayList<Object> updateLogs = new ArrayList<>();


    @KafkaListener(
            topics="readings",
            groupId = "groupId"
    )
    public void listener(String data){
        System.out.println("Reading listener received: "+ data);

        readingLogs.add(data);
    }

    @KafkaListener(
            topics="deletions",
            groupId = "groupId"
    )
    public void deletionListener(String data){
        System.out.println("Deletion listener received: "+ data);
        deletionLogs.add(data);
    }

    @KafkaListener(
            topics="posts",
            groupId = "groupId"
    )
    public void postsListener(String data){
        System.out.println("Posts listener received: "+ data);

        postLogs.add(data);
    }

    @KafkaListener(
            topics="updates",
            groupId = "groupId"
    )
    public void updatesListener(String data){
        System.out.println("Update Listener received: "+ data);

        updateLogs.add(data);
    }


    //getters for logs.
    public ArrayList<Object> getReadingLogs(){
        return readingLogs;
    }
    public ArrayList<Object> getDeletionLogs(){
        return deletionLogs;
    }
    public ArrayList<Object> getPostLogs(){
        return postLogs;
    }
    public ArrayList<Object> getUpdateLogs(){
        return updateLogs;
    }
}
