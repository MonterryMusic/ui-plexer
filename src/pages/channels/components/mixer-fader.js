'use client' // wichtig für Next.js App Router (stellt sicher: läuft nur im Browser)

import { useEffect, useRef , useState} from 'react'
import interact from 'interactjs'

import styles from "@/styles/fader.module.css"

export default function MixerFader() {
  const faderRef = useRef(null)
  const [level, setLevel] = useState(0)
  const [val, setVal] = useState(0)

  useEffect(() => {
    if (!faderRef.current) return

    // Interact.js initialisieren
    interact(faderRef.current).draggable({
      inertia: false,
      axis: "y",
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'self',
          endOnly: true
        })
      ],
      listeners: {
        move(event) {
          const sliderHeight = interact.getElementRect(event.target).height;
          const value = event.pageY / sliderHeight;
          const clampVal =  Math.min(Math.max(value, 0), 1)

          //const y = (parseFloat(target.dataset.y) || 0) - event.dy

          // Begrenzung: z.B. nur innerhalb 0–200 px bewegen
          //const clampedY = Math.min(Math.max(y, 0), 200)

          //target.dataset.y = y
          //event.target.style.translate = `translateY(${value}px)`
          setVal(v => v +clampVal)
          //event.target.style.paddingBottom = ((clampVal) * 100) + '%'
          //target.style.bottom = `${clampedY}px`
        },
        up(event) {
          const sliderHeight = interact.getElementRect(event.target).height;
          const value = event.pageY / sliderHeight;
          const clampVal =  Math.min(Math.max(value, 0), 1)
          setVal(v => v + clampVal)
        }
      }
    })

    // Aufräumen bei Unmount
    //return () => interact(faderRef.current).unset()
  }, [])

  return (
    <div>
      <div ref={faderRef} style={{paddingTop: val*100+"%"}} className={styles.slider}    >
        <div backgroundColor={'#000000'} height={"100%"}></div>
      </div> 
      <span></span>
    </div>
  )
}