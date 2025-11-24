import { act, useState } from "react";

import styles from "@/styles/Home.module.css"

export default function Pin(no, target)
{
    const [active, setActive] = useState(false);
    
    async function press(){
        setActive(!active);
    }
    return <div onClick={press} className={styles.pin} background={active?"black":"white"} color={active?"black":"white"}>
            .{active?"x":" "}
        </div>
}