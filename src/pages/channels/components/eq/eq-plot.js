'use client'

import { useState } from "react";
import Scale from "./scale";

export default function EQPlot(){
    const h = 400;
    const w = 1000;
    const s = (w / Math.log10(22000)) *1.418;
    //const s = 657.59;
    const cutoff = Math.log10(20);

    const [f1, setF1] = useState(180);
    const [q1, setQ1] = useState(1);
    const [g1, setG1] = useState(0);
    const [x1, setX1] = useState(100);
    const [y1, setY1] = useState(200);

    let filter = {
        "hp": {"f": 40},
        "b1": {"f": f1, "gain": g1, "q": q1},
        "b2": {"f": 500, "gain": 3, "q": 0.3},
        "b3": {"f": 1500, "gain": 1.5, "q": 1},
        "b4": {"f": 10000, "gain": -3, "q": 1}
    }

    function getXinPlot(val){
        return (Math.log10(val) / Math.log(22000)) * w - cutoff;
    }

    function getYinPlot(val){
        return h/2 - (val / 20) * h/2
    }

    function getFrequency(val){
        return (10^(val +cutoff))
    }

    function getGain(val){
        //TODO
        return 0;
    }

    function convertBandToString(band){
        let center = [getXinPlot(band.f) , getYinPlot(band.gain)];
        let c0 = [center[0]-50/band.q, 200]
        let c1 = [center[0]+50/band.q, 200]
        //return " "+ c0[0] + " " + c0[1] + " Q " + center[0] + " " + center [1] + " "+ c1[0]+ " "+ c1[1]
        //return " L "+ c0[0] + " " + c0[1] + " " + center[0] + " " + center [1] + " "+ c1[0]+ " "+ c1[1]
        let out = " L" + c0[0] + " " + c0[1] + " C" + (c0[0] + 20/band.q)+ " " + c0[1] + " "
        out += ", " + (center[0]-20/band.q) + " " + center[1] + " , " + center[0] + " " + center[1]
        out += " M" + center[0] + " " + center[1] + " C" + (center[0] + 20/band.q)+ " " + center[1] + " "
        out += ", " + (c1[0]-20/band.q) + " " + c1[1] + " , " + c1[0] + " " + c1[1]
        return out;
    }

    function convertFilterToString(f){
        let out = "M ";
        out += getXinPlot(20) +" "+ getYinPlot(-200) + " Q " + getXinPlot(f.hp.f-10) + " " + getYinPlot(0) + ", " +  getXinPlot(f.hp.f) + " " + getYinPlot(0);
        out += convertBandToString(f.b1);
        out += convertBandToString(f.b2);
        out += convertBandToString(f.b3);
        out += convertBandToString(f.b4);
        out += " L " + w + " " + 200
        return out;
    }

    let gridlines = [20, 30, 40, 50, 60, 70, 80, 90,
                    100, 200, 300, 400, 500, 600, 700, 800, 900,
                    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
                    10000, 20000]

    let dec = [10, 100, 1000, 10000, 22000]

    let gainlines = [20, 10, 6, 1.5, -1.5, -6, -10, -20]

    async function handleWheel(e){
        setQ1(q1 + e.deltaY / 1000)
    }

    async function dragElement(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x0 - e.clientX;
            yn = y0 - e.clientY;
            setX1(x1 - xn);
            setY1(y1 - yn);
            setF1(getFrequency(x1 - xn))
            setG1(y1)
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    return  <svg height={h} width={w} style={{background: "white"}}>
                <Scale/>
                
                <path id="lineAC" d={convertFilterToString(filter)} stroke="#333333" stroke-width="4" fill="none"/>
                <circle onTouchStart={(e)=>dragElementTouch(e)} onMouseDown={e => dragElement(e)} onWheel={e => handleWheel(e)} cx={x1} cy={y1} r={10} stroke="red" stroke-width="3" fill="#ff000044"/>
            </svg>
}