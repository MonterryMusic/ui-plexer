import Scale from "./scale"
import { useState } from "react";
import { getRatioFromY, getThresholdFromX, getYfromRatio, scaleX, scaleY } from "./misc";

export default function Compressor(){
    const h = 1000;
    const w = 1000;

    const [threshold, setThreshold] = useState(-50);
    const [ratio, setRatio] = useState(2)
    const [softKnee, setSoft] = useState(true)
    

    function getCompressionPath(){
        let out = `M0 ${h} ${softKnee?"Q":"L"}${scaleX(threshold)} ${scaleY(threshold)} ${softKnee?" , ":"L"}${scaleX(0)} ${getYfromRatio(threshold, ratio)} `
        return out
    }

    function getFunctionPath(){
        let out = `M0 ${h} L${scaleX(threshold)} ${scaleY(threshold)} L${scaleX(0)} ${getYfromRatio(threshold, ratio)} `
        return out
    }

    async function dragThreshold(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            xn = x0 - e.clientX;
            yn = y0 - e.clientY;
            setThreshold(threshold - getThresholdFromX(xn));
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    async function dragRatio(e){
        var x0, y0, xn, yn;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        function elementDrag(e){
            yn = y0 - e.clientY;
            let yo = getYfromRatio(threshold, ratio);
            let out = getRatioFromY(threshold, yo+yn);
            setRatio(out)
            //setRatio(ratio + getRatioFromY(threshold, (yn*10)));
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }
    }

    return  <div>
            <button onClick={() => {setSoft(!softKnee)}}>soft</button>
            <svg height={h} width={w} style={{background: "white"}}>
                    <Scale height={h} width={w}/>
                    <path id="lineAC" d={getFunctionPath()} stroke="#cccccc" strokeWidth={2} fill="none"/>
                    <path id="lineAC" d={getCompressionPath()} stroke="#333333" strokeWidth={4} fill="none"/>
                    <circle onMouseDown={e => dragThreshold(e)} onWheel={e => handleWheel(e)} cx={scaleX(threshold)} cy={scaleY(threshold)} r={10} stroke="red" stroke-width="3" fill="#ff000044"/>
                    <circle onMouseDown={e => dragRatio(e)} onWheel={e => handleWheel(e)} cx={scaleX(0)} cy={getYfromRatio(threshold, ratio)} r={10} stroke="green" stroke-width="3" fill="#00ff0044"/>
                    <text stroke={"black"} y={100}>1:{String(ratio).slice(0,3)}</text>
            </svg>
            </div>
}