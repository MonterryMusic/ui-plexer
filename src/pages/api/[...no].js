import mixerState from "@/model/mixer";
 

export default function handler(req, res) {
    const {no} = req.query
    var parms = {no}["no"]
    //console.log(parms)
    if(parms.length == 1){
        switch(parms[0]){
            case "state":
            res.status(200).json(mixerState.channels)
            break;
        }
    }
    if(parms.length == 2){
        switch(parms[1]){
            case "state":
                if(parms[0] == "all"){
                    res.status(200).json(mixerState.channels)
                    break;
                }
                res.status(200).json(mixerState.channels[parms[0]-1]);
                break;
            case "mute":
                var isMute = 0;
                globalThis.conn.master.input(parms[0]).mute$.subscribe(newValue => isMute = newValue)
                res.status(200).json({mute: Boolean(isMute) });
                break;
            case "solo":
                var isSolo = 0;
                globalThis.conn.master.input(parms[0]).solo$.subscribe(newValue => isSolo = newValue)
                res.status(200).json({solo: Boolean(isSolo) });
                break;
            case "record":
                //TODO
                res.status(200).json({name: "John Doe" });
                break;
            default:
                res.status(200).json({name: "John Doe" });
        }
        return;
    }
    if(parms.length == 3){
        switch(parms[1]){
            case "mute":
                if(parms[2] == "toggle"){
                    globalThis.conn.master.input(parms[0]).toggleMute();
                    var isMute = 0;
                    globalThis.conn.master.input(parms[0]).mute$.subscribe(newValue => isMute = newValue)
                    res.status(200).json({mute: Boolean(isMute) });
                }
                break;
            case "solo":
                if(parms[2] == "toggle"){
                    globalThis.conn.master.input(parms[0]).toggleSolo();
                    var isSolo = 0;
                    globalThis.conn.master.input(parms[0]).solo$.subscribe(newValue => isSolo = newValue)
                    res.status(200).json({solo: Boolean(isSolo) });
                }
                break;
            case "record":
                res.status(200).json({name: "John Doe" });
                //globalThis.conn.master.input(parms[0]).multiTrackToggle();
                break;
            case "aux":      
                var faderLevel = 0;
                globalThis.conn.aux(parms[2]).input(parms[0]).faderLevel$.subscribe(newValue =>  faderLevel = newValue);
                res.status(200).json({level: faderLevel });
                break;
            default:
                res.status(500).json({error: "Stalled at "+ parms});
                break;
        }return;
    }
    if(parms.length == 4){
        switch(parms[1]){
            //api/[no]/master/[command]/[val]
            case "master":
                switch(parms[2]){
                    case "fadeto":
                        var faderLevel = 0;
                        globalThis.conn.master.input(parms[0]).setFaderLevel(parms[3]);
                        globalThis.conn.master.input(parms[0]).faderLevel$.subscribe(newValue =>  faderLevel = newValue);
                        res.status(200).json({level: faderLevel });
                        break;
                    case "pan":
                        var pan = 0;
                        globalThis.conn.master.input(parms[0]).setPan(parms[3]);
                        globalThis.conn.master.input(parms[0]).pan$.subscribe(newValue =>  pan = newValue);
                        res.status(200).json({level: pan });
                        break;
                    default:
                        res.status(500).json({error: "Stalled at "+ parms});
                        break;
                } break;
            //api/[no]/aux/[target]
            default:
                res.status(500).json({error: "Stalled at "+ parms});
                break;
        }
        return;
    }
    //api/[no]/aux/[target]/fadeto/[val]
    if(parms.length == 5){
        switch(parms[1]){
            case "aux":
                switch(parms[3]){
                    case "fadeto":
                        var faderLevel = 0;
                        globalThis.conn.aux(parms[2]).input(parms[0]).setFaderLevel(parms[4]);
                        globalThis.conn.aux(parms[2]).input(parms[0]).faderLevel$.subscribe(newValue =>  faderLevel = newValue);
                        res.status(200).json({level: faderLevel });
                        break;
                    default:
                        res.status(500).json({error: "Stalled at "+ parms});
                        break;
                    }
                break;
            default:
                res.status(500).json({error: "Stalled at "+ parms});
                break;
        }

    }
}

export async function getStaticPaths() {
  /*const res = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await res.json()

  const paths = users.map((user) => ({
    params: { id: user.id.toString() },
  }))

  return { paths, fallback: false }*/
}