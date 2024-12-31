import React, { useEffect } from 'react'

const Test = ({data}) => {
  
  /// Acum={Date,runtime,downtime}
  useEffect(()=>{
    data.reduce((acum,current)=>{
      if(!acum.some(i=>i.date==current[0])){
       if(current[4]=="RUNNING"){
          acum.push({date:current[0],runtime:current[3],downtime:0});
       }else{
         acum.push({date:current[0],runtime:0,downtime:current[3]});
       }
      }
 
       
         console.log(acum)
       return acum
       
 
 
      },[])

  },[])
     
return null
     

}

export default Test
