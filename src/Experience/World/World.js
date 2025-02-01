import Experience from '../Experience.js'
import Environment from './Environment.js'
import Floor from './Floor.js'
// import Fox from './Fox.js'
import Mask from './Mask.js'
import Mountain from './Mountain.js'
import Snow from './Snow.js'
import Tree from './Tree.js'


import Plans from './Plans.js'
import Plan from './Plan.js'
import Videos from './Videos.js'
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
            // this.fox = new Fox()
            //this.mask = new Mask()
            this.mountain = new Mountain()
            this.snow = new Snow()
            this.tree = new Tree()



            // this.plans = new Plans()
            // this.plan = new Plan()
            // this.videos = new Videos()

            // this.audio = new Audio()

            this.environment = new Environment()
        })
    }

    update()
    {
        if(this.mask)
            this.mask.update()
        if(this.mountain)
            this.mountain.update()
        if(this.snow)
            this.snow.update()
        if(this.plans)
            this.plans.update()
        if(this.plan)
            this.plan.update()
        if(this.videos)
            this.videos.update()
        if(this.audio)
            this.audio.update()
    }
}