import { scaleY, scaleX } from "./misc";

export default function Scale(width, height){
    const h = 1000;
    const w = 1000;

    const s = (w / Math.log10(22000)) *1.418;

    const cutoff = Math.log10(20)*s; 

    function getXinPlot(val){
        return Math.log10(val) * s - cutoff;
    }

    function getYinPlot(val){
        return 200 - (val / 20) * 200
    }

    function getFrequency(val){
        return 10^(val / w)
    }

    let inLines = [0, -10, -20, -30, -40, -50, -60, -70, -80, -90]

    let outLines = [0, -10, -20, -30, -40, -50, -60, -70, -80, -90]

    return      <>{inLines.map((l) => (
                        <>
                        <line key={l} x1={scaleX(l)} y1={0} x2={scaleX(l)} y2={h} stroke="grey" strokeWidth="1"/>
                        <text x={scaleX(l)} y={h -20} fontSize={11} stroke={"#888888"}>{l}dB</text>
                        </>
                ))}
                {outLines.map((l) => (
                        <>
                        <line key={l} x1={0} y1={scaleY(l)} x2={scaleX(w)} y2={scaleY(l)} stroke="grey" strokeWidth="1" />
                        <text x={w-35} y={scaleY(l)} fontSize={11} stroke={"#888888"}>{l}dB</text>
                        </>)
                )
                }
                </>

}