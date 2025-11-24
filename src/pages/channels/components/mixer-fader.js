'use client' // wichtig für Next.js App Router (stellt sicher: läuft nur im Browser)

import { useEffect, useRef , useState} from 'react'
import interact from 'interactjs'

import styles from "@/styles/fader.module.css"

export default function MixerFader() {
  const faderRef = useRef(null)
  const [level, setLevel] = useState(0)

  useEffect(() => {
    if (!faderRef.current) return

    // Interact.js initialisieren
    interact(faderRef.current).draggable({
      origin: 'self',
      inertia: true,
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
          const value = 1- event.pageY / sliderHeight;
          const clampVal =  Math.min(Math.max(value, 0), 1)

          //const y = (parseFloat(target.dataset.y) || 0) - event.dy

          // Begrenzung: z.B. nur innerhalb 0–200 px bewegen
          //const clampedY = Math.min(Math.max(y, 0), 200)

          //target.dataset.y = y
          //event.target.style.translate = `translateY(${value}px)`
          setLevel(clampVal)
          event.target.style.paddingBottom = (clampVal * 100) + '%'
          //target.style.bottom = `${clampedY}px`
        }
      }
    })

    // Aufräumen bei Unmount
    //return () => interact(faderRef.current).unset()
  }, [])

  return (
    <div>
      <div 
        ref={faderRef}

        className={styles.slider}
      >
      </div> 
      <span>{level}</span>
    </div>
  )
}