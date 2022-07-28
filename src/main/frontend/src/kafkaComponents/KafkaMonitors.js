import React from "react";
import KafkaDeletions from "./KafkaDeletions";
import KafkaPosts from "./KafkaPosts";
import KafkaReadings from "./KafkaReadings";
import KafkaUpdates from "./KafkaUpdates";


class KafkaMonitors extends React.Component{

    

    render()
    {
        return (
            
        <div style={{display:'flex', flexDirection:'row',flexWrap:'wrap',flexShrink:3}}>
        <KafkaDeletions></KafkaDeletions>
        <KafkaPosts></KafkaPosts>
        <KafkaReadings></KafkaReadings>
        <KafkaUpdates></KafkaUpdates>
        </div>
        
        )
      
    }

}

export default KafkaMonitors;