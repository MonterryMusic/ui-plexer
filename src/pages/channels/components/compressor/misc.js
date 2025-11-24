const h = 1000;
const w = 1000;

export function scaleX(val){
        return w + (val / 100) * w
}

export function scaleY(val){
        return (val / 100) * -h
}

export function getThresholdFromX(val){
    return val / w * 100
}

export function getYfromRatio(threshold, ratio){
    return scaleY(threshold - threshold * (1/ratio))
}

export function getRatioFromY(threshold, val){
    //val  = getYfromRatio(threshold, val);
    let maxY = scaleY(threshold);
    if(val <= 0) return Infinity;
    if(val >= maxY) return 1;
    return maxY / val;
}