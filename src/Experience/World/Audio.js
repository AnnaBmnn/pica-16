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
    }
}