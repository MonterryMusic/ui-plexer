'use client'
import styles from "@/styles/fader.module.css"
import { useRef, useEffect, createRef } from "react"
import interact from "interactjs"


export default function Slider(){

    const faderRef = useRef<HTMLDivElement>(null)
    const component = createRef()

    useEffect(() => {
        if(!faderRef.current) return

        interact(faderRef.current).draggable({
        origin: 'self',                   // (0, 0) will be the element's top-left
        inertia: true,                    // start inertial movement if thrown
        modifiers: [
        interact.modifiers.restrict({
        restriction: 'self'           // keep the drag coords within the element
            })
        ],
        // Step 3
        listeners: {
            move (event) {                  // call this listener on every dragmove
            const sliderWidth = interact.getElementRect(event.target).width
            const value = event.pageX / sliderWidth

            event.target.style.paddingLeft = (value * 100) + '%'
            event.target.setAttribute('data-value', value.toFixed(2))
            }
        }
        }
        )
    })
    

    return <div className={styles.slider} ref={faderRef} >.</div>
}