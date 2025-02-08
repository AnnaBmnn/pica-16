import EventEmitter from './EventEmitter.js'
import Experience from '../Experience.js'


export default class DeviceOrientation extends EventEmitter
{
    constructor()
    {
        super()
        this.experience = new Experience()

        this.experience.trigger.on('trigger-intro', ()=> {
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {

                DeviceOrientationEvent.requestPermission()
                .then(response => {
                    if (response == 'granted') {
                        window.addEventListener("deviceorientation", this.handleMotionEvent, true);

                    }
                })
                .catch(console.error)
            } else {
                window.addEventListener("deviceorientation", this.handleMotionEvent, true);
            }
        })

    }
    handleMotionEvent(event) {
        console.log(event)
        document.querySelector('.js-title').innerHTML = event.alpha + ' ' + event.beta + ' ' + event.gamma
        // const x = event.accelerationIncludingGravity.x;
        // const y = event.accelerationIncludingGravity.y;
        // const z = event.accelerationIncludingGravity.z;
        this.experience.world.snow.dt = event.alpha * 0.01
        // this.experience.camera.instance.rotation.y = event.beta
        // this.experience.camera.instance.rotation.z = event.gamma
      
        // Do something awesome.
    }
    tick()
    {

    }
}