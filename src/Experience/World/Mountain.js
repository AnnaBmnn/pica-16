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



        // Resource
        // this.arbres = this.resources.items.arbres
        this.pont = this.resources.items.pont
        // this.sol = this.resources.items.sol
        this.soleils = this.resources.items.soleils

        // this.arbres.scene.position.y -= 10
        this.pont.scene.position.y -= 10
        // this.sol.scene.position.y -= 10
        this.soleils.scene.position.y -= 10

        // this.scene.add(this.arbres.scene)
        this.scene.add(this.pont.scene)
        // this.scene.add(this.sol.scene)
        this.scene.add(this.soleils.scene)

        console.log(this.resources.items)

        //this.setModel()

        // Debug
        if(this.debug.active && this.model)
        {
            this.debugFolder = this.debug.ui.addFolder('Mountain')

            this.debugFolder
                .add(this.model.position, 'x')
                .name('position x')
                .min(-100)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.model.position, 'y')
                .name('position y')
                .min(-100)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.model.position, 'z')
                .name('position z')
                .min(-100)
                .max(100)
                .step(0.01)

            this.debugFolder
                .add(this.model.scale, 'x')
                .name('scale x')
                .min(-0.01)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.model.scale, 'y')
                .name('scale y')
                .min(-0.01)
                .max(100)
                .step(0.01)
            this.debugFolder
                .add(this.model.scale, 'z')
                .name('scale z')
                .min(-0.01)
                .max(100)
                .step(0.01)
        }
    }

    setModel()
    {
        console.log(this.resource)
        this.model = this.pont.scene

        this.scene.add(this.pont)

        this.model.traverse((child) =>
        {
            if(child instanceof THREE.Mesh)
            {
                child.castShadow = true
            }
        })
    }


    update()
    {
        if(this.experience){
            //let _scale = this.experience.world.audio.frequenceAverage * 0.005
            //this.model.scale.set(_scale, _scale, _scale)

        }

    }
}