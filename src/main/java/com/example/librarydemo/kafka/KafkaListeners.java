package com.example.librarydemo.kafka;


import org.apache.kafka.clients.consumer.Consumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.kafka.annotation.PartitionOffset;
import org.springframework.kafka.annotation.TopicPartition;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.stereotype.Component;

import javax.print.attribute.standard.JobKOctets;
import java.time.Instant;
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
//           ,topicPartitions =
//                    { @TopicPartition(topic = "readings",
//                            partitionOffsets = @PartitionOffset(partition = "0", initialOffset = "0"))}
    )
    public void listener(String data){
        //System.out.println("Reading listener received: "+ data);

        readingLogs.add(data);
    }

    @KafkaListener(
            topics="deletions",
            groupId = "groupId",
            topicPartitions =
            { @TopicPartition(topic = "deletions",
                    partitionOffsets = @PartitionOffset(partition = "0", initialOffset = "0"))}

    )

    public void deletionListener(String data){
        Instant instant = Instant.now();
        System.out.println("Deletion listener received: "+ data + "at " + instant);
        deletionLogs.add(data);
    }

    @KafkaListener(
            topics="posts",
            groupId = "groupId",
            topicPartitions =
            { @TopicPartition(topic = "posts",
                    partitionOffsets = @PartitionOffset(partition = "0", initialOffset = "0"))}

    )
    public void postsListener(String data){

        postLogs.add(data);
    }

    @KafkaListener(
            topics="updates",
            groupId = "groupId",
            topicPartitions =
                    { @TopicPartition(topic = "updates",
                            partitionOffsets = @PartitionOffset(partition = "0", initialOffset = "0"))}
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
