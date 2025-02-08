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
        this.experience.camera.rotation.x = event.alpha
        this.experience.camera.rotation.y = event.beta
        this.experience.camera.rotation.z = event.gamma
      
        // Do something awesome.
    }
    tick()
    {

    }
}