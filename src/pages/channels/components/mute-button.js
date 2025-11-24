'use client'
import { useState } from "react";
import styles from '@/styles/Home.module.css'

export default function MuteButton({no, init}){
    const [mute, setMute] = useState(init)

    async function updateMute(){
      await fetch('/api/'+no+'/mute/toggle')
        .then((response)=>response.json())
        .then(data=>{setMute(data.mute)})
      /*if(newMute){
         isMute = "red";
      } else {
        isMute = "#e9e9ed";
      }*/
      //document.getElementById("mute"+no).style.background = isMute;
    }

    return <button onClick={updateMute} className={`${styles.btn},${styles.mute}`} style={{background: mute?"red":"#e9e9ed"}} >M</button>
}