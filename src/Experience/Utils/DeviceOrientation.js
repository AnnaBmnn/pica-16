import EventEmitter from './EventEmitter.js'

export default class DeviceOrientation extends EventEmitter
{
    constructor()
    {
        super()

        console.log('HEY')
        window.addEventListener("devicemotion", this.handleMotionEvent, true);
    }
    handleMotionEvent(event) {
        console.log(event)
        document.querySelector('.js-title').innerHTML = event
        const x = event.accelerationIncludingGravity.x;
        const y = event.accelerationIncludingGravity.y;
        const z = event.accelerationIncludingGravity.z;
      
        // Do something awesome.
    }
    tick()
    {

    }
}