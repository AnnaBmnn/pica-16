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

        this.debugObject = {
            colorBridge: '#FFFFFF',
            emissiveBridge: '#FFFFFF',
            colorSun: '#FFFFFF',
            emissiveSun: '#FFFFFF',
        }

        // Resource
        // this.arbres = this.resources.items.arbres
        this.pont = this.resources.items.pont
        // this.sol = this.resources.items.sol
        this.soleils = this.resources.items.soleils

        this.pont.scene.children[0].material.color = this.pont.scene.children[0].material.emissive 
        this.soleils.scene.children[0].material.color = this.pont.scene.children[0].material.color 

        // this.pont.scene.children[0].material.emissive = new THREE.Color('#FFFFFF')
        // this.soleils.scene.children[0].material.emissive = new THREE.Color('#FFFFFF')
        this.pont.scene.children[0].material.emissiveIntensity = 0.01
        this.soleils.scene.children[0].material.emissiveIntensity = 0.01
        console.log(this.pont.scene.children[0].material.emissiveIntensity )
        console.log(this.soleils)

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
        if(this.debug.active )
        {
            this.debugFolder = this.debug.ui.addFolder('Bridge')

            this.debugFolder
                .add(this.pont.scene.children[0].material, 'emissiveIntensity')
                .name('emissiveIntensity')
                .min(0)
                .max(15)
                .step(0.01)
            

            this.debugFolder
                .addColor(this.debugObject , 'emissiveBridge')
                .name('emissive')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.emissiveBridge = value
                    this.pont.scene.children[0].material.emissive =  new THREE.Color(this.debugObject.emissiveBridge)
                })

            this.debugFolder
                .addColor(this.debugObject , 'colorBridge')
                .name('color')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.colorBridge = value
                    this.pont.scene.children[0].material.color =  new THREE.Color(this.debugObject.colorBridge)
                })
            this.debugSunFolder = this.debug.ui.addFolder('Sun')

            this.debugSunFolder
                .add(this.soleils.scene.children[0].material, 'emissiveIntensity')
                .name('emissiveIntensity')
                .min(0)
                .max(15)
                .step(0.01)
            
            this.debugSunFolder
                .addColor(this.debugObject , 'emissiveSun')
                .name('emissive')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.emissiveSun = value
                    this.soleils.scene.children[0].material.emissive =  new THREE.Color(this.debugObject.emissiveSun)
                })
            
            this.debugSunFolder
                .addColor(this.debugObject , 'colorSun')
                .name('color')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.colorSun = value
                    this.soleils.scene.children[0].material.color =  new THREE.Color(this.debugObject.colorSun)
                })


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