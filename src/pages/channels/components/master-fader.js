'use client'
import { useState, useEffect, useRef} from "react";
import interact from "interactjs";

import styles from '@/styles/fader.module.css'


export default function MasterFader({no, init}){
    const [level, setLevel] = useState(init)

    const faderRef = useRef<HTMLDivElement>(null)

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




    async function updateLevel(value){
      await fetch('/api/'+no+'/master/fadeto/'+ value)
        .then((response)=>response.json())
        .then(data=>{setLevel(data.level)})
    }





    async function scrollFader(e) {
      if(e.shiftKey){
        let temp = Math.max(level + e.deltaY / -2900, 0)
        temp = Math.min(temp, 1);
        await updateLevel(temp);
      } else {
        let temp = Math.max(level + e.deltaY / -1200, 0)
        temp = Math.min(temp, 1);
        //console.log(send)
        await updateLevel(temp);
      }
    }

    async function reset(e){
      if(e.button == 1){
        await updateLevel(0.765);
      }
    }

    async function dragElement(e){
        if(e.button != 0) return;
        var x0, y0, x1, y1;
        x0 = e.clientX;
        y0 = e.clientY;

        document.onmouseup = closeDrag;
        document.onmousemove = elementDrag;

        async function elementDrag(e){
            x1 = e.clientX - x0;
            y1 = e.clientY - y0;
            await updateLevel(level + y1 / -500);
        }

        function closeDrag(e){
            document.onmouseup = null;
            document.onmousemove = null;
        }

    }


    

    return <div id={"s"+no} className={styles.slider}>    </div>
    //return <meter id={"s"+no} min={0} max={1} step={0.01} value={level} className={styles.vertSlider} onMouseUp={e => reset(e)} onMouseDown={(e)=>dragElement(e)} onChange={e => updateLevel(e.target.value)} onWheel={e=>scrollFader(e)}></meter>

}