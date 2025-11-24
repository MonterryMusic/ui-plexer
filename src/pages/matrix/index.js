import styles from "@/styles/Home.module.css"
import Target from "./target"
import Channel from "./channel"

export default function Matrix({channels}){
    const availableTargets = ["Master", "PC", "TAPE"]
    return    <div className={styles.mixer}>
                        <Target/>
                             {channels.map((chan) => (
                            <Channel key={chan.no} initState={chan} targets={availableTargets}/>
                        ))}
                    </div>
}

export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/state')
  const channels = await res.json()
  return { props: { channels} }
}