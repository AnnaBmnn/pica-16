


import * as THREE from 'three'
import Experience from '../Experience.js'
import gsap from 'gsap'


// https://fusefactory.github.io/openfuse/strange%20attractors/particle%20system/Strange-Attractors-GPU/

export default class Particles
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources
        this.time = this.experience.time
        this.debug = this.experience.debug
        this.camera = this.experience.camera

        this.isOrder = false
        this.finalCamera = {
            x: 118.26296736230518,
            y: 45.74696178109149,
            z: 17
        }
        this.timeDelay = 0
        // Resource
        this.resources = 
        [
            this.resources.items.snowFlakeTexture1
        ]


        this.parameters = [
            [[ 0.0, 0.0, 1.0 ], this.resources[0], 1.0 ]
        ]


        // Geometry
        this.particlesGeometry = new THREE.BufferGeometry()
        this.count = 50000

        // Position
        this.positions = new Float32Array(this.count * 3)
        this.setPositions()

        this.particlesGeometry.setAttribute('position', new THREE.BufferAttribute(this.positions, 3));

        // Materials
        this.particlesMaterial = new THREE.PointsMaterial({
            size: 0.5,
            sizeAttenuation: true,
            color: new THREE.Color('#000000'),
            map: this.resources[0],
            transparent: true,
            alphaMap: this.resources[0],
            alphaTest: 0.5,
            //depthTest: false,
            depthWrite: false,
            // emissive: 10
            // blending: THREE.AdditiveBlending,
            // vertexColors: true,
        });


        // Points
        this.particles = new THREE.Points(this.particlesGeometry, this.particlesMaterial);
        this.particles.position.set(-2.1, 2.9, 0);
        this.particles.rotation.set(0, -1.82, 0);
        this.particles.scale.set(9, 20.98, 5.73);
        this.particles.visible = false;
        this.scene.add(this.particles);

        this.initialParams = {
            Attractor: "Lorenz variation",
            sigma: 10,
            rho: 28,
            beta: 8 / 3,
            kappa: 200,
            speed: 0.001,
            autoRotate: true
        };
        // attractor chua
        this.dt = 0.03; // Time step for attractor simulation
        // this.dt = 0.0001;
        this.attractor = this.attractor.bind(this)
        this.attractorChau = this.attractorChau.bind(this)

        // const axesHelper = new THREE.AxesHelper( 5 )
        // this.scene.add( axesHelper );

        this.initialPositions = []
        this.resetInitialPositions()

        this.experience.trigger.on('trigger-restart', ()=>{
            this.particles.visible = false
            this.isOrder = false
            this.isAnimDone = false

            gsap.to(
                this.particlesMaterial.color,
                {
                    duration: 7,
                    ease: 'power2.inOut',
                    r: 0,
                    g: 0,
                    b: 0
                }
            )
        })

        this.experience.trigger.on('trigger-stimulus', ()=>{
            this.particles.visible = true
        })

        this.experience.trigger.on('trigger-order', ()=>{
            this.isOrder = true
            window.setTimeout(() => {
                gsap.to(
                    this.camera.instance.position,
                    {
                        duration: 7,
                        ease: 'power2.inOut',
                        x: 45,
                        y: 19,
                        z: 7
                    },
                )
                // gsap.to(
                //     this.camera.instance.rotation,
                //     {
                //         duration: 7,
                //         ease: 'power2.inOut',
                //         x: -2.00189670707885,
                //         y: 1.16826503509461,
                //         z: 2.034372083999237
                //     }
                // )
            }, 800);

            gsap.to(
                this.particlesMaterial.color,
                {
                    duration: 7,
                    ease: 'power2.inOut',
                    r: 1,
                    g: 1,
                    b: 0.4
                }
            )
            // this.particlesMaterial
            window.setTimeout(() => {
                this.isAnimDone = true
            }, 7000);

        })

        // Debug
        if(this.debug.active)
        {
            this.debugFolder = this.debug.ui.addFolder('Attractor')

            
            this.debugFolder
                .add(this.particles.position, 'x')
                .name('position x')
                .min(-100)
                .max(100)
                .step(0.1)
 
            this.debugFolder
                .add(this.particles.position, 'y')
                .name('position y')
                .min(-100)
                .max(100)
                .step(0.1)

            this.debugFolder
                .add(this.particles.position, 'z')
                .name('position z')
                .min(-100)
                .max(100)
                .step(0.1)  

            this.debugFolder
                .add(this.particles.rotation, 'y')
                .name('rotation y')
                .min(-3.14)
                .max(3.14)
                .step(0.01)  

            this.debugFolder
                .add(this.particles.scale, 'x')
                .name('scale x')
                .min(0)
                .max(100)
                .step(0.01)  

            this.debugFolder
                .add(this.particles.scale, 'y')
                .name('scale y')
                .min(0)
                .max(100)
                .step(0.01)  

            this.debugFolder
                .add(this.particles.scale, 'z')
                .name('scale z')
                .min(0)
                .max(100)
                .step(0.01)  

                this.debugFolder
                .add(this, 'dt')
                .name('vitesse particules')
                .min(0)
                .max(2)
                .step(0.00001)  
        }
    }
    resetInitialPositions (){
        this.initialPositions = []

        //chua 
        const size = 1.0;
        
        // const size = 40;

        for (let i = 0; i < this.count; i++) {
            this.initialPositions.push({
                x: (Math.random() - 0.5) * size,
                y: (Math.random() - 0.5) * size,
                z: (Math.random() - 0.5) * size
            });
        }
    }
    setPositions()
    {
        for (let i = 0; i < this.count * 3; i++) {
            this.positions[i] = (Math.random() - 0.5) * 1;
        }
    }
    setVertices()
    {
        for ( let i = 0; i < count; i ++ ) {

            const x = Math.random() * 0.5 - 1.0
            const y = Math.random() * 0.5 - 1.0
            const z = Math.random() * 0.5 - 1.0

            this.vertices.push( x, y, z )

        }
    }
    attractor(x, y, z) 
    {
        /*
        const { sigma, rho, beta, kappa, speed } = this.initialPositions;

        const dx = (sigma * (y - x) + (Math.sin(y / 5) * Math.sin(z / 5) * kappa)) * speed;
        const dy = (x * (rho - z) - y + (Math.sin(x / 5) * Math.sin(z / 5) * kappa)) * speed;
        const dz = (x * y - beta * z + Math.cos(y / 5) * Math.cos(x / 5) * kappa) * speed;

        return { dx, dy, dz };
        */
        const b = 0.19
        const timestep = 1000
        const dx = (-b*x + Math.sin(y)) * timestep
        const dy = (-b*y + Math.sin(z)) * timestep
        const dz = (-b*z + Math.sin(x)) * timestep


        return { dx, dy, dz };

    }

    lerp(x, y, a){
       return  x * (1 - a) + y * a
    }
    attractorChau(x, y, z)
    {
        const c1 = 15.6
        const c2 = 1
        const c3 = 28
        const m0 = -1.143
        const m1 = -0.714

        const timestep = 0.025
        const dx = c1*(y-x-(m1*x+(m0-m1)/2*(Math.abs(x+1)-Math.abs(x-1)))) * timestep
        const dy = c2*(x-y+z) * timestep
        const dz = -c3*y * timestep

        return { dx, dy, dz };         
    }
    update()
    {
        if(this.experience){
            
            for (let i = 0; i < this.count; i++) {
                const { x, y, z } = this.initialPositions[i];
                const { dx, dy, dz } = this.attractorChau(x, y, z);
        
                this.initialPositions[i].x += dx * this.dt;
                this.initialPositions[i].y += dy * this.dt;
                this.initialPositions[i].z += dz * this.dt;

        
                const i3 = i * 3;
                this.positions[i3] = this.initialPositions[i].x;
                this.positions[i3 + 1] = this.initialPositions[i].y;
                this.positions[i3 + 2] = this.initialPositions[i].z;
                
                
                    if(i == 200){
                        const position = this.particles.localToWorld( 
                            new THREE.Vector3(
                                this.initialPositions[i].x,
                                this.initialPositions[i].y,
                                this.initialPositions[i].z
                            )
                        )

                        const positionBefore = this.particles.localToWorld( 
                            new THREE.Vector3(
                                x,
                                y,
                                z
                            )
                        )                        

                        if(!this.isOrder){
                            this.camera.instance.position.set(
                                position.x,
                                position.y ,
                                position.z
                            )

                        }
                    }
                
            }
        
            this.particlesGeometry.attributes.position.needsUpdate = true;
        }
        
    }
}
