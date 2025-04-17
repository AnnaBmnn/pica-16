import Experience from '../Experience.js'
import Environment from './Environment.js'
import DeviceOrientation from './../Utils/DeviceOrientation.js'

import Floor from './Floor.js'
import Decor from './Decor.js'
import Particles from './Particles.js'
import Tree from './Tree.js'

import Audio from './Audio.js'



export default class World
{
    constructor()
    {
        this.experience = new Experience()
        this.scene = this.experience.scene
        this.resources = this.experience.resources

        // Wait for resources
        this.resources.on('ready', () =>
        {
            // Setup
            this.floor = new Floor()
            this.decor = new Decor()
            this.particles = new Particles()
            this.tree = new Tree()



            this.audio = new Audio()

            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.decor)
            this.decor.update()
        if(this.particles)
            this.particles.update()
        if(this.tree)
            this.tree.update()
        if(this.plans)
            this.plans.update()
        if(this.plan)
            this.plan.update()
        if(this.videos)
            this.videos.update()
    }
}