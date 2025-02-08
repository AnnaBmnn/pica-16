import EventEmitter from './EventEmitter.js'

export default class DeviceOrientation extends EventEmitter
{
    constructor()
    {
        super()

        console.log('HEY')
        DeviceMotionEvent.requestPermission()
        .then(response => {
          if (response == 'granted') {
            window.addEventListener("devicemotion", this.handleMotionEvent, true);

          }
        })
        .catch(console.error)
    }
    handleMotionEvent(event) {
        console.log(event)
        document.querySelector('.js-title').innerHTML = event.accelerationIncludingGravity.x
        const x = event.accelerationIncludingGravity.x;
        const y = event.accelerationIncludingGravity.y;
        const z = event.accelerationIncludingGravity.z;
      
        // Do something awesome.
    }
    tick()
    {

    }
}