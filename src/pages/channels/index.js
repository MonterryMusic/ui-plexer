'use client'
import Channel from "./[no]"
import styles from "@/styles/Home.module.css"

import connHandler from "@/model/connection"
import mixerState from "@/model/mixer"
import EQPlot from "./components/eq/eq-plot"

//import "@/model/mixer"

export default function Channels({channels}) {
    //console.log("Received State:"+mixerState.model)
    return    <div className={styles.mixer}>     {channels.map((chan) => (
                        <Channel key={chan.no} initState={chan}/>
                    ))}
                </div>
    
   /*return <div className={styles.mixer}>
                {Channel(1)}
                {Channel(2)}
                {Channel(3)}
                {Channel(4)}
                {Channel(5)}
                {Channel(6)}
                {Channel(7)}
                {Channel(8)}
            </div>*/
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/state')
  const channels = await res.json()
  return { props: { channels} }
}
