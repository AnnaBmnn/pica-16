import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Audio
{
    constructor()
    {
        this.experience = new Experience()

        this.scene = this.experience.scene
        this.domAudio = document.querySelector('.js-audio')

        this.experience.trigger.on('trigger-intro', ()=> {
            this.domAudio.play()
        })
        document.addEventListener("visibilitychange", (event) => {
            console.log('visilivity change')

                if(document.visibilityState !== "hidden"){
                    this.domAudio.play()

                }else {
                    this.domAudio.pause()

                }
            
        });
        window.addEventListener("pagehide", (event) => {

            this.domAudio.pause()
        });
        document.addEventListener("pageshow", (event) => {
            this.domAudio.play()
        });
    }
}