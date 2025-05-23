import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'


export default class DeviceOrientation extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()

        this.mapNumRange = this.mapNumRange.bind(this)
        this.handleMotionEvent = this.handleMotionEvent.bind(this)

        this.experience.trigger.on('trigger-intro', ()=> {
            if (typeof DeviceMotionEvent.requestPermission === 'function') {

                DeviceMotionEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        window.addEventListener("devicemotion", this.handleMotionEvent, true);

                    }
                })
                .catch(console.error)
            } else {
                window.addEventListener("devicemotion", this.handleMotionEvent, true);
            }
        })

    }
    mapNumRange(num, inMin, inMax, outMin, outMax)
    {
        return ((num - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;

    }
    handleMotionEvent(event) {
        console.log(event)
        const rangeNumber = this.mapNumRange(event.alpha, 0, 360, 0, 10 )
        console.log(rangeNumber)

        this.experience.world.environment.pointLight.position.x = event.accelerationIncludingGravity.x * 10
        // document.querySelector('.debug').innerHTML = event.accelerationIncludingGravity.x
        // const x = event.accelerationIncludingGravity.x;
        // const y = event.accelerationIncludingGravity.y;
        // const z = event.accelerationIncludingGravity.z;
        // this.experience.world.tree.tree.children[0].material.emissiveIntesity = this.mapNumRange(360 - event.alpha, 0, 360, -5, 5 )
        // this.experience.camera.instance.rotation.x = event.alpha * (Math.PI / 180)
        // this.experience.camera.instance.rotation.y = event.beta * (Math.PI / 180)
        // this.experience.camera.instance.rotation.z = event.gamma * (Math.PI / 180)
      
        // Do something awesome.
    }
    tick()
    {

    }
}