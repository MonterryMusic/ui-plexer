'use client'

import { useState } from "react";
import Scale from "./scale";

export default function EQPlot(){
    const h = 400;
    const w = 1000;
    const s = (w / Math.log10(22000)) *1.418;
    //const s = 657.59;
    const cutoff =  Math.log10(20);
    const fMin = 20;
    const fMax = 22000;

    const [f1, setF1] = useState(180);
    const [f2, setF2] = useState(300);
    const [f3, setF3] = useState(1500);
    const [f4, setF4] = useState(10000);

    const [q1, setQ1] = useState(1);
    const [q2, setQ2] = useState(0.3);
    const [q3, setQ3] = useState(1);
    const [q4, setQ4] = useState(1);

    const [g1, setG1] = useState(1);
    const [g2, setG2] = useState(0);
    const [g3, setG3] = useState(1.5);
    const [g4, setG4] = useState(-3);


    const [x1, setX1] = useState(getXinPlot(f1));
    const [x2, setX2] = useState(getXinPlot(f2));
    const [x3, setX3] = useState(getXinPlot(f3));
    const [x4, setX4] = useState(getXinPlot(f4));

    const [y1, setY1] = useState(getYinPlot(g1));
    const [y2, setY2] = useState(getYinPlot(g2));
    const [y3, setY3] = useState(getYinPlot(g3));
    const [y4, setY4] = useState(getYinPlot(g4));

    const [hpf, setHPF] = useState(40);

    let filter = {
        "hp": {"f": hpf},
        "b1": {"f": f1, "gain": g1, "q": q1},
        "b2": {"f": f2, "gain": g2, "q": q2},
        "b3": {"f": f3, "gain": g3, "q": q3},
        "b4": {"f": f4, "gain": g4, "q": q4}
    }

    function getXinPlot(val){
        return w * (Math.log10(val / fMin) / Math.log10(fMax / fMin))
    }
    
    /*function getXinPlot(val){
        return Math.log10(val) / Math.log10(22000) * w - cutoff
        //return (Math.log10(val) / Math.log(22000)) * w - cutoff;
    }*/

    function getYinPlot(val){
        return h/2 - (val / 20) * h/2
    }

    function getFrequency(val) {
        let out =  fMin * Math.pow(fMax / fMin, val / w)
        if(out > 22000) return 22000;
        if(out < 20) return 20;
        return out;
    }

/*    function getFrequency(val){
        let out =  10^((val + cutoff) / w) * 22000
        if(out > 22000) return 22000;
        if(out < 20) return 20;
        return out;
    }*/

    function getGain(val){
        let out = 20 - (val / h) * 40
        if(out < -20) return -20;
        if(out > 20) return 20;
        return out;
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
        out += getXinPlot(hpf/3) +" "+ getYinPlot(-20) + " Q " + getXinPlot(hpf/2) + " " + getYinPlot(0) + ", " +  getXinPlot(f.hp.f+5) + " " + getYinPlot(0);
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

    async function handleWheel1(e){
        setQ1(q1 + e.deltaY / 1000)
    }

    async function handleWheel2(e){
        setQ2(q2 + e.deltaY / 1000)
    }

    async function handleWheel3(e){
        setQ3(q3 + e.deltaY / 1000)
    }

    async function handleWheel4(e){
        setQ4(q4 + e.deltaY / 1000)
    }

    async function dragB1(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x1 - (x0 - e.clientX);
            yn = y1 - (y0 - e.clientY);
            setX1(xn);
            setY1(yn);
            setF1(getFrequency(xn))
            setG1(getGain(yn))
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    async function dragB2(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x2 - (x0 - e.clientX);
            yn = y2 - (y0 - e.clientY);
            setX2(xn);
            setY2(yn);
            setF2(getFrequency(xn))
            setG2(getGain(yn))
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    async function dragB3(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x3 - (x0 - e.clientX);
            yn = y3 - (y0 - e.clientY);
            setX3(xn);
            setY3(yn);
            setF3(getFrequency(xn))
            setG3(getGain(yn))
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    async function dragB4(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x4 - (x0 - e.clientX);
            yn = y4 - (y0 - e.clientY);
            setX4(xn);
            setY4(yn);
            setF4(getFrequency(xn))
            setG4(getGain(yn))
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    async function dragHP(e){
        var x0, xn;
        x0 = e.clientX;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x0 - e.clientX;
            let old = getXinPlot(filter.hp.f)
            old -= xn;
            setHPF(getFrequency(old))
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }

    return  <div>
                <svg height={h} width={w} style={{background: "white"}}>
                    <Scale/>
                    <path id="lineAC" d={convertFilterToString(filter)} stroke="#333333" stroke-width="4" fill="none"/>
                    <text x={100} y={h -20} fontSize={11} stroke={"#888888"}>{Number.parseInt(f1)}Hz</text>
                    <text x={100} y={h -10} fontSize={11} stroke={"#888888"}>{Number.parseInt(g1)}dB</text>
                    <text x={100} y={h} fontSize={11} stroke={"#888888"}>{q1}</text>
                    <circle id="hp" onMouseDown={e => dragHP(e)} cx={getXinPlot(filter.hp.f)} cy={getYinPlot(0)} r={10} stroke="blue" stroke-width="3" fill="#0000ff44"/>
                    <circle id="b1" onMouseDown={e => dragB1(e)} onWheel={e => handleWheel1(e)} cx={x1} cy={y1} r={10} stroke="green" stroke-width="3" fill="#00ff0044"/>
                    <circle id="b2" onMouseDown={e => dragB2(e)} onWheel={e => handleWheel2(e)} cx={getXinPlot(filter.b2.f)} cy={getYinPlot(filter.b2.gain)} r={10} stroke="red" stroke-width="3" fill="#ff000044"/>
                    <circle id="b3" onMouseDown={e => dragB3(e)} onWheel={e => handleWheel3(e)} cx={getXinPlot(filter.b3.f)} cy={getYinPlot(filter.b3.gain)} r={10} stroke="violet" stroke-width="3" fill="#8800ff44"/>
                    <circle id="b4" onMouseDown={e => dragB4(e)} onWheel={e => handleWheel4(e)} cx={getXinPlot(filter.b4.f)} cy={getYinPlot(filter.b4.gain)} r={10} stroke="orange" stroke-width="3" fill="#ff990044"/>
                </svg>
            </div>
}