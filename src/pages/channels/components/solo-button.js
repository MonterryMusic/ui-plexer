'use client'
import { useState } from "react";
import styles from '@/styles/Home.module.css'

export default function SoloButton({no, init}){
    const [solo, setSolo] = useState(init)

    async function updateSolo(){
      await fetch('/api/'+no+'/solo/toggle')
        .then((response)=>response.json())
        .then(data=>{setSolo(data.solo)})
    }

    return <button className={`${styles.btn},${styles.solo}`} style={{background: solo?"yellow":"#e9e9ed"}} onClick={updateSolo} >S</button>
}