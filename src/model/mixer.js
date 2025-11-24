const mixerState = {channels: [], loaded: true, model: ''};

if(globalThis.conn != null){
var model = null;
globalThis.conn.deviceInfo.model$.subscribe(newValue => model = newValue);
console.log(model);

mixerState.model = model;

if(mixerState.channels == null || typeof mixerState.channels === 'undefined'){
    mixerState.channels = [];
}

var n = 0;
switch(model) {
    
    case "ui12":
        n = 8;
        break;
    default:
        break;
}

for(var i=0; i < n; i++){
    var channel = globalThis.conn.master.input(i+1);
    var chan={no: i+1,
        name:"",
        isMute:0,
        isSolo:0,
        faderLevel:0,
        faderLevelDB:0
    };
    chan.no = i+1;
    chan.name = ""
    chan.isMute =
    channel.name$.subscribe(x => chan.name = x)
    channel.mute$.subscribe(x => chan.isMute = Boolean(x))
    channel.solo$.subscribe(x => chan.isSolo = Boolean(x))
    channel.faderLevel$.subscribe(x => chan.faderLevel = x)
    channel.pan$.subscribe(x => chan.pan = x)
    channel.faderLevelDB$.subscribe(x => chan.faderLevelDB = x)
    mixerState.channels.push(chan);
}
//console.log(mixerState.channels)
if(mixerState.channels.length > 0){
    console.log("Loading done.")
    mixerState.loaded = true;
}
} else {
    console.log("no conn yet.")
    mixerState.loaded = false;
}

export default mixerState;