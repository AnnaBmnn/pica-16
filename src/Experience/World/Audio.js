import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Audio
{
    constructor()
    {
        this.experience = new Experience()

        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.domAudio = document.querySelector('.js-audio')
        this.domButton = document.querySelector('.js-play-audio')

        this.onEnded = this.onEnded.bind(this)

        this.audiosSrc = [
            'audios/Flute_Cliquetis_2M_DoubleCroche.mp3',
            'audios/Flute_Cris_Long_C2_1M_Ronde_02_65.41HZ.mp3',
            'audios/Flute_Indienne_Ascendante_E_G_Wouahwouah_Croche_3M.mp3',
            'audios/Flute_Perc_TrioletNoir_2M.mp3',
            'audios/Flute_RoulementLangue_Longue_05.mp3',
        ]

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Audio')
        }

        // Resource
        this.resource = this.resources.items.foxModel
        this.domButton.addEventListener('click', ()=>{
            if(!this.audioCtx){
                this.audioCtx = new (window.AudioContext || window.webkitAudioContext)()
                this.source = this.audioCtx.createMediaElementSource(this.domAudio)
        
                // Create an analyser
                this.analyser = this.audioCtx.createAnalyser()
                this.analyser.fftSize = 256
                this.bufferLength = this.analyser.frequencyBinCount
                this.dataArray = new Uint8Array(this.bufferLength)
            
                // Connect part
                this.source.connect(this.analyser);
                this.analyser.connect(this.audioCtx.destination);
            }
            if(this.domAudio.paused){
                this.domAudio.play()
                this.domButton.innerHTML = 'pause'
            }else {
                this.domAudio.pause()
                this.domButton.innerHTML = 'play'

            }

        })
        this.domAudio.addEventListener('ended', this.onEnded)

        this.setAudio(0)
    }
    setAudio(index)
    {

        this.domAudio.src = this.audiosSrc[index]
        this.domAudio.load()
        this.domAudio.play()
    }
    onEnded()
    {
        console.log('ended')
        const _index = Math.floor(Math.random() * this.audiosSrc.length);
        this.setAudio(_index)
    }
    getAverage(array) {
        let i = 0;
        const longueur = array.length;
        let value = 0;
        while (i < longueur) {
            value += array[i];
            i++
        }
        return value / longueur
    }
    update()
    {
        if(this.analyser){
            this.analyser.getByteFrequencyData(this.dataArray)
            this.frequenceAverage = this.getAverage(this.dataArray)
        }

    }
}