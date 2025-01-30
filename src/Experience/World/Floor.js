import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Mask
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.video = document.querySelector('.js-video-floor')


        // Resource
        this.sol = this.resources.items.sol.scene

        this.sol.position.y -= 10

        this.scene.add(this.sol)

        console.log(this.resources.items)

        //this.setModel()
        this.loadTexture()

        // Debug
        if(this.debug.active && this.model)
        {
            this.debugFolder = this.debug.ui.addFolder('Floor')

            this.debugFolder
                .add(this.model.position, 'x')
                .name('position x')
                .min(-100)
                .max(100)
                .step(0.01)

        }
    }
    loadTexture()
    {
        this.video.addEventListener('canplaythrough', ()=> {
            console.log('load')
            this.texture = new THREE.VideoTexture( this.video)
            this.texture.flipY = false
            console.log(this.sol)

            this.sol.children[0].material.map = this.texture
            this.sol.children[0].material.needsUpdate = true   
        }, {once: true})
    }

    update()
    {
        if(this.experience){
            //let _scale = this.experience.world.audio.frequenceAverage * 0.005
            //this.model.scale.set(_scale, _scale, _scale)

        }

    }
}