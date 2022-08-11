import React from "react";
import KafkaAll from "./KafkaAll";
import KafkaDeletions from "./KafkaDeletions";
import KafkaPosts from "./KafkaPosts";
import KafkaReadings from "./KafkaReadings";
import KafkaUpdates from "./KafkaUpdates";


class KafkaMonitors extends React.Component{

    

    render()
    {
        return (

        <div style={{display:'flex', flex:1,flexDirection:'column',}}>
        <h1 style={{color:'blueviolet'}}>Kafka Monitor</h1>
        <div style={{display:'flex', flex:1,flexDirection:'row',flexWrap:'wrap',justifyContent:'flex-start', alignContent:'flex-start',fontSize:5}}>
         
        <KafkaAll></KafkaAll>
        {/* <KafkaDeletions></KafkaDeletions>
        <KafkaPosts></KafkaPosts>
        <KafkaReadings></KafkaReadings>
        <KafkaUpdates></KafkaUpdates> */}
        
        </div>
        </div>
        
        )
      
    }

}

export default KafkaMonitors;