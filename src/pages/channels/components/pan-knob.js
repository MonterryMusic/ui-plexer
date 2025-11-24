'use client'
import { useState } from "react";
import styles from '@/styles/Home.module.css'

export default function PanKnob({no, init}){
    const [pan, setPan] = useState(init)
    const [panString, setString] = useState('translateX(-80%) rotate('+init+'deg)')

    async function updatePan(val){
        await fetch('/api/'+no+'/master/pan/'+val)
            .then((response)=>response.json())
            .then(data=>{setPan(data.level)})
        setString('translateX(-80%) rotate('+(pan*240-120)+'deg)')
    }

    async function scrollPan(e){
        let temp = pan;
        temp += e.deltaY / -1500 //Math.max(pan + e.deltaY / -100, 0);
        //temp = Math.min(temp, 1)
        await updatePan(temp)
        //console.log(send)
       /* await fetch('/api/'+no+'/master/pan/'+temp)
            .then((response)=>response.json())
            .then(data=>{setPan(data.level)})*/
        
    }

    async function dragPan(e){
        let temp = pan + e.movementX / -10;
        console.log(e)
        setString('translateX(-80%) rotate('+(temp + 200)+'deg)')
        setPan(temp)
        //console.log(send)
        /*await fetch('/api/'+no+'/mute/toggle')
            .then((response)=>response.json())
            .then(data=>{setRecord(data.record)})
        */
    }

    async function reset(e){
        if(e.button == 1){
            await updatePan(0.5);
        }
    }

    return  <div className={styles.knob} onWheel={(event) => scrollPan(event)} onMouseUp={(e) => reset(e)}>
                <div id={"pan"+no} className={styles.knobHandle} style={{transform: panString}}></div>
            </div>
}