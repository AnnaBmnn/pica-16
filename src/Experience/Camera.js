import * as THREE from 'three'
import Experience from './Experience.js'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class Camera
{
    constructor()
    {
        this.experience = new Experience()
        this.sizes = this.experience.sizes
        this.scene = this.experience.scene
        this.canvas = this.experience.canvas
        this.resources = this.experience.resources


        this.setInstance()
        this.resources.on('ready', () =>
        {
            window.setTimeout(() => {
                this.setControls()
                
            }, 100)
        })
        //     window.setTimeout(() => {
        //         this.setControls()
                
        //     }, 10000)

        // this.experience.trigger.on('trigger-order', ()=>{
        //     window.setTimeout(() => {
        //         this.setControls()
                
        //     }, 10000)

        // })
    }

    setInstance()
    {
        this.instance = new THREE.PerspectiveCamera(50, this.sizes.width / this.sizes.height, 0.1, 1000)
        // this.instance.position.set(0, 0, -10)
        this.scene.add(this.instance)
    }

    setControls()
    {
        this.controls = new OrbitControls(this.instance, this.canvas)
        this.controls.enableDamping = true
        this.controls.maxDistance = 160
        this.controls.target = this.experience.world.particles.particles.position
        console.log(this.experience.world)
    }

    resize()
    {
        this.instance.aspect = this.sizes.width / this.sizes.height
        this.instance.updateProjectionMatrix()
    }

    update()
    {
        if(this.controls)
        {
            this.controls.update()
        }
    }
}