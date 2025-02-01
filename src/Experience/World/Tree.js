import * as THREE from 'three'
import Experience from '../Experience.js'

export default class Tree
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug

        this.video = document.querySelector('.js-video-tree')


        // Resource
        this.tree = this.resources.items.arbres.scene

        this.tree.position.y -= 10

        this.tree2 = this.tree.clone()

        this.scene.add(this.tree)
        this.scene.add(this.tree2)


        this.tree.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
                child.receiveShadow = false

            }
        })

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
            // contreee.log('load')
            this.texture = new THREE.VideoTexture( this.video)
            this.texture.flipY = false
            console.log(this.tree)

            this.tree.children[0].material.emissiveMap = this.texture
            this.texture.magFilter = THREE.NearestFilter
            this.texture.minFilter = THREE.NearestFilter
            // this.tree.children[0].material.map = this.texture
            // this.tree.children[0].material.emissive = new THREE.Color('#FFFFFF')

            this.tree.children[0].material.needsUpdate = true   
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