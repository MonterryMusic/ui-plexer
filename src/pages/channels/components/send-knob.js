'use client'
import { useState, useEffect } from "react";
import styles from '@/styles/Home.module.css'

export default function SendKnob({no, init, targetInit}){
    const [send, setSend] = useState(init)
    const [target, setTarget] = useState(targetInit)
    const [sendString, setString] = useState('translateX(-80%) rotate('+(init+200)+'deg)')

    async function updateNewSend(val){
        await fetch('/api/'+no+'/aux/'+1+'/fadeto/'+val)
            .then((response)=>response.json())
            .then(data=>{
                setSend(Number(data.level))
                setString('translateX(-80%) rotate('+(send*270 + 200)+'deg)')
            })
    }

    async function updateSend(){
        await fetch('/api/'+no+'/aux/'+1)
            .then((response)=>response.json())
            .then(data=>{
                setSend(Number(data.level));
                setString('translateX(-80%) rotate('+(data.level*270 + 200)+'deg)');
                        })
    }

    /*useEffect(() => {
    const interval = setInterval(() => {
      updateSend();
    }, 2000);

    return () => clearInterval(interval);
  }, []);*/

    async function scrollSend(e){
        let temp = Math.max(send + e.deltaY / -1500, 0)
        temp = Math.min(temp, 1);
        //console.log(send)
        await updateNewSend(temp);
    }

    async function reset(e){
        if(e.button == 1){
            await updateNewSend(0.765)
        }
    }

    async function dragElement(e){
        if(e.button != 0) return;
        var x0, y0, x1, y1;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            x1 = e.clientX - x0;
            y1 = e.clientY - y0;
            updateNewSend(send + x1 / 40);
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    return  <div className={styles.knob} onWheel={(event) => scrollSend(event)} onMouseDown={e=>dragElement(e)} onMouseUp={(e) => reset(e)}>
                <div id={"send"+no} className={styles.knobHandle} style={{transform: sendString}}></div>
            </div>
}