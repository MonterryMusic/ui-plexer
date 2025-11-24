'use client'
import { useState } from "react";
import styles from '@/styles/Home.module.css'

export default function RecordButton({no, init}){
    const [record, setRecord] = useState(init)
    const [canRecord, setCanRecord] = useState(false)

    async function updateRecord(){
        if(canRecord)
            await fetch('/api/'+no+'/mute/toggle')
                .then((response)=>response.json())
                .then(data=>{setRecord(data.record)})
        }

    return  <button className={styles.btn} onClick={() => updateRecord}>
                  <div className={styles.record} id={"record"+no} style={{background: record?"red":"#949494"}}></div>
            </button>
}