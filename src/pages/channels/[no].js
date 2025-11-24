'use client'

import dynamic from 'next/dynamic';

import styles from '@/styles/Home.module.css'
import MuteButton from './components/mute-button';
import SoloButton from './components/solo-button';

const MasterFader = dynamic(()=> import('./components/master-fader'), {ssr: false})

const MixerFader = dynamic(()=> import('./components/mixer-fader'), {ssr: false})

import SendKnob from './components/send-knob';
import PanKnob from './components/pan-knob';

import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import RecordButton from './components/record-button';

export default function Channel({initState}){
    const router = useRouter();
    //console.log(router.asPath)
    const no = initState.no 
    const [data, setData] = useState(null)
    const [isLoading, setLoading] = useState(false)
 
    /*useEffect(() => {
      fetch('/api/'+initState.no+'/state')
        .then((res) => res.json())
        .then((data) => {
          setData(data)
          setLoading(false)
        })
    }, [])
    
    if (isLoading) return <p>Loading...</p>
    if (!data) return <p>No profile data</p>
    */
    //initState = data;

    //console.log(initState)

    var isMute = "#e9e9ed";
    var isSolo = "#e9e9ed";
    var isRecord = "#949494";

    var pan = 0;
    var send = 0;
    
    var level = 0.3;

    function toggle(sign){
      if(sign == 'S'){
        fetch("api/"+ no +"/solo");
        updateSolo();
        //console.log("Solo");
        return;
      }
      if(sign == 'M'){
        fetch("api/"+ no +"/mute");
        updateMute();
        //console.log("Mute");
        return;
      }
      if(sign == 'R'){
        fetch("api/"+ no +"/record");
        updateRecord();
        //console.log("Mute");
        return;
      }
    }

    async function updateSolo(){
      let newSolo = null;
      await fetch('/api/'+no+'/solo')
        .then((response)=>response.json())
        .then(data=>{ newSolo = data.solo})
      if(newSolo){
         isSolo = "yellow";
      } else {
        isSolo = "#e9e9ed";
      }
      document.getElementById("solo"+no).style.background = isSolo;
    }

    async function updateMute(){
      let newMute = null;
      await fetch('/api/'+no+'/mute')
        .then((response)=>response.json())
        .then(data=>{ newMute = data.mute})
      if(newMute){
         isMute = "red";
      } else {
        isMute = "#e9e9ed";
      }
      document.getElementById("mute"+no).style.background = isMute;
    }

    function updateRecord(){
      if(isRecord == "#949494"){
         isRecord = "red";
      } else {
        isRecord = "#949494";
      }
      document.getElementById("record"+no).style.background = isRecord;
    }

    function scrollPan(){
      pan += 10;
      document.getElementById("pan"+no).style.transform = "rotate("+pan+"deg)"
    }

    function clickPan(){
      pan = 0;
      document.getElementById("pan"+no).style.transform = "translateX(-50%) rotate("+pan+"deg)"
    }

    function scrollSend(){
      send += 20;
      document.getElementById("send"+no).style.transform = "translateX(-50%) rotate("+send+"deg)"
    }

    function fadeTo(){
      
    }

    return <div className={styles.channel}>
              <div className={styles.trackHeader}>
                <div className={styles.trackHeaderNext}>
                  <div className={styles.trackColor} style={{backgroundColor: "cyan"}}></div>
                  <span>{initState.name}</span>
                </div>
                <span>in {no}</span>
              </div>
              <div className={styles.buttons}>
                <SoloButton no={no} init={Boolean(initState.isSolo)}/>
                <MuteButton no={no} init={Boolean(initState.isMute)}/>
                <RecordButton no={no} init={false}/>
              </div>
              <div className={styles.knobs}>
                  <div>
                    <PanKnob no={no} init={initState.pan}/>
                    <div style={{textAlign: 'center'}}>Pan</div>
                  </div>
                  <div>
                    <SendKnob no={no} init={0} target={1}/>
                    <div style={{textAlign: 'center'}}>Send</div>
                  </div>
              </div>
              <div className={styles.buttons}>
                <button>EQ</button>
                <button>COMP</button>
              </div>
              <div className={styles.faders}>
                <meter className={styles.vertSlider} value={level}>at 20/100</meter>
                <MixerFader/>
              </div>
            </div>
}

export async function getStaticProps(params) {
  
}