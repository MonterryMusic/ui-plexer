export default function Target(){
    const availableTargets = ["Master", "PC", "TAPE"]
    return <div>
                <div>Target</div>
                {availableTargets.map(target => (
                    <div>{target}</div>
                ))}
            </div>
}