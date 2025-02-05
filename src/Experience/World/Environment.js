import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'


export default class Environment
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.debug = this.experience.debug
        this.debugObject = {
            color: '#B265FF',
            pointColor: '#FFFFFF',
            directionnalColor: '#FFFFFF',
        }

        console.log(this.resources.items.environmentMapTexture)

        this.scene.background =  new THREE.Color('#B265FF')

        
        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('environment')
        }

        this.setAmbientLight()
        this.setDirectionalLight()
        this.setPointLight()

        // Wait for resources
        this.setEnvironmentMap()

        this.experience.trigger.on('trigger-stimulus', ()=>{
            gsap.to(
                this.ambientLight,
                {
                    duration: 3,
                    ease: 'power2.inOut',
                    intensity: 1,
                }
            )
        })
        this.experience.trigger.on('trigger-order', ()=>{
            gsap.to(
                this.ambientLight,
                {
                    duration: 6,
                    ease: 'power2.inOut',
                    intensity: 0.04,
                }
            )
        })
        this.experience.trigger.on('trigger-restart', ()=>{
            gsap.to(
                this.ambientLight,
                {
                    duration: 6,
                    ease: 'power2.inOut',
                    intensity: 0.5,
                }
            )
        })

    }
    setAmbientLight()
    {
        this.ambientLight = new THREE.AmbientLight( '#B265FF' , 0.05)
        this.scene.add(this.ambientLight)
        if(this.debug.active){
            this.debugFolder
                .add(this.ambientLight, 'intensity')
                .name('ambientLight Intensity')
                .min(0)
                .max(10)
                .step(0.001)
        }
    }
    setDirectionalLight()
    {
        this.sunLight = new THREE.DirectionalLight('#FFFFFF', 0)
        this.sunLight.castShadow = true
        this.sunLight.shadow.camera.far = 15
        this.sunLight.shadow.mapSize.set(1024, 1024)
        this.sunLight.shadow.normalBias = 0.05
        this.sunLight.position.set(-1.7, 3, - 1.0)
        this.scene.add(this.sunLight)

        // Debug
        if(this.debug.active){
            this.debugFolder
                .add(this.sunLight, 'intensity')
                .name('directionnal light Intensity')
                .min(0)
                .max(10)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'x')
                .name('directionnal light X')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'y')
                .name('directionnal light sunLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.sunLight.position, 'z')
                .name('directionnal light sunLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .addColor(this.debugObject , 'directionnalColor')
                .name('directionnalColor')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.directionnalColor = value
                    this.sunLight.color =  new THREE.Color(this.debugObject.directionnalColor)
                })

        }
    }
    setPointLight()
    {
        this.pointLight = new THREE.PointLight('#FFFFFF', 1)
        this.pointLight.castShadow = true
        this.pointLight.shadow.camera.far = 15
        this.pointLight.shadow.mapSize.set(1024, 1024)
        this.pointLight.shadow.normalBias = 0.05
        this.pointLight.position.set(-1.7, 3, - 1.0)
        this.scene.add(this.pointLight)

        // Debug
        if(this.debug.active){
            this.debugFolder
                .add(this.pointLight, 'intensity')
                .name('pointLightIntensity')
                .min(0)
                .max(100)
                .step(0.001)
            
            this.debugFolder
                .add(this.pointLight.position, 'x')
                .name('pointLightX')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.pointLight.position, 'y')
                .name('pointLightY')
                .min(- 5)
                .max(5)
                .step(0.001)
            
            this.debugFolder
                .add(this.pointLight.position, 'z')
                .name('pointLightZ')
                .min(- 5)
                .max(5)
                .step(0.001)

            this.debugFolder
                .add(this.pointLight, 'decay')
                .name('point light decay')
                .min(0)
                .max(1000)
                .step(0.001)

            this.debugFolder
                .addColor(this.debugObject , 'pointColor')
                .name('Point Light color')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.pointColor = value
                    this.pointLight.color =  new THREE.Color(this.debugObject.pointColor)
                })
        }
    }
    setEnvironmentMap()
    {
        this.environmentMap = {}
        this.environmentMap.intensity = 1
        this.environmentMap.texture = this.resources.items.environmentMapTexture
        this.environmentMap.texture.colorSpace = THREE.SRGBColorSpace
        this.environmentMap.texture.mapping = THREE.EquirectangularReflectionMapping;

        


        this.environmentMap.updateMaterials = () =>
        {
            this.scene.traverse((child) =>
            {
                if(child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial)
                {
                    child.material.envMap = this.environmentMap.texture
                    child.material.envMapIntensity = this.environmentMap.intensity
                    child.material.needsUpdate = true
                }
            })
        }
        // this.scene.backgroundBlurriness = 0.9
        // this.scene.fog = new THREE.Fog( 0xcccccc, 10, 300)

        //this.scene.background = this.debugObject.color 
        // this.scene.environment = this.resources.items.environmentMapTexture
        this.environmentMap.updateMaterials()
        this.scene.environment = this.resources.items.environmentMapTexture
        //this.scene.background = this.resources.items.environmentMapTexture

        console.log(this.scene.environment)


        // Debug
        if(this.debug.active)
        {
            this.debugFolder
                .add(this.environmentMap, 'intensity')
                .name('envMapIntensity')
                .min(0)
                .max(4)
                .step(0.001)
                .onChange(this.environmentMap.updateMaterials)
            
            this.debugFolder
                .addColor(this.debugObject , 'color')
                .name('background color')
                .onChange((value) =>
                {
                    console.log(value)
                    this.debugObject.color = value
                    this.scene.background =  new THREE.Color(this.debugObject.color)
                })
            
        }
    }
}