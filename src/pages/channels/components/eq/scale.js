export default function Scale(){
    const h = 400;
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

    let gridlines = [20, 30, 40, 50, 60, 70, 80, 90,
                    100, 200, 300, 400, 500, 600, 700, 800, 900,
                    1000, 2000, 3000, 4000, 5000, 6000, 7000, 8000, 9000,
                    10000, 20000]

    let gainlines = [20, 10, 6, 1.5, -1.5, -6, -10, -20]

    let dec = [10, 100, 1000, 10000, 22000]

    return      <>{gridlines.map((l) => (
                        <line key={l} x1={getXinPlot(l)} y1={0} x2={getXinPlot(l)} y2={h} stroke="grey" stroke-width="1"/>)
                )}
                {gainlines.map((l) => (
                        <line key={l} x1={0} y1={getYinPlot(l)} x2={w} y2={getYinPlot(l)} stroke="grey" stroke-width="1" />)
                )
                }
                <line x1={0} y1={getYinPlot(0)} x2={w} y2={getYinPlot(0)} stroke="black" stroke-width="2" />

                {dec.map((l) => (
                        <line key={l} x1={getXinPlot(l)} y1={0} x2={getXinPlot(l)} y2={h} stroke="black" stroke-width="2"/>)
                )}</>

}