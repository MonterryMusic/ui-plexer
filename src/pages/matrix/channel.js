import Pin from "./pin";
import styles from "@/styles/Home.module.css"


export default function Channel({initState}){
    const availableTargets = ["Master", "PC", "TAPE"]
    return <div className={styles.matrixChannel}>
        <div>{initState.name}</div>
        {availableTargets.map( t => (
            <Pin no={initState.no}/>
        ))}
    </div>
}