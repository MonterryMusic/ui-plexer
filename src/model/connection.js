import { SoundcraftUI } from 'soundcraft-ui-connection';

//const conn = new SoundcraftUI('192.168.178.38');


class Connection{
    constructor(newIp){
        this.ip = newIp;
        this.conn = null;
        this.connected = false;
        this.connect()
    }


    async connect(){
        if(this.conn != null){
            console.log("Already connected to " + this.ip);
            return;
        }
        if(this.ip != null){
            this.conn = new SoundcraftUI(this.ip);
            await this.conn.connect();
            console.log("Connected to " + this.ip);
            this.connected = true;
            //this.conn.master.setFaderLevel(0);
            globalThis.conn = this.conn;
        } else {
            console.log("No IP set.")
        }
    }

    getInputChannel(i){
        return this.conn.master.input(i);
    }

    toggleMute(i){
        if(this.conn != null){
            var channel = this.conn.getInputChannel(i);
            channel.toggleMute();
            return channel.getChannelName;
        }
        return -1;
    }

    toggleSolo(i){
        if(this.conn != null){
            var channel = this.conn.getInputChannel(1);
            channel.toggleSolo();
            return channel.getChannelName;
        }
        return -1;
    }
}
const connHandler = new Connection('192.168.178.38');
export default connHandler;