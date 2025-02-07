import EventEmitter from '../Utils/EventEmitter.js'


export default class Trigger extends EventEmitter
{
    constructor()
    {
        super()

        this.delay = 6000

        // Setup
        this.firstButton = document.querySelector('.js-button-next')
        this.buttonStimulus = document.querySelector('.js-button-trigger-stimulus')
        this.buttonOrder = document.querySelector('.js-button-trigger-order')
        this.buttonResonnance = document.querySelector('.js-button-trigger-restart')
        this.buttonBack = document.querySelector('.js-credit-back')
        this.buttonCredit = document.querySelector('.js-button-credit')
        this.firstSection = document.querySelector('.js-section-first')
        this.sectionStimulus = document.querySelector('.js-section-stimulus')
        this.sectionOrder = document.querySelector('.js-section-order')
        this.sectionResonnance = document.querySelector('.js-section-resonnance')
        this.sectionCredit = document.querySelector('.js-section-credit')


        // Binding
        this.hideScreen = this.hideScreen.bind(this)
        this.onButtonStimulusClick = this.onButtonStimulusClick.bind(this)
        this.onButtonOrderClick = this.onButtonOrderClick.bind(this)
        this.onButtonResonnanceClick = this.onButtonResonnanceClick.bind(this)
        this.onButtonBackClick = this.onButtonBackClick.bind(this)
        this.onButtonCreditClick = this.onButtonCreditClick.bind(this)


        // Event
        this.firstButton.addEventListener('click', this.hideScreen)
        this.buttonStimulus.addEventListener('click', this.onButtonStimulusClick)
        this.buttonOrder.addEventListener('click', this.onButtonOrderClick)
        this.buttonResonnance.addEventListener('click', this.onButtonResonnanceClick)
        this.buttonBack.addEventListener('click', this.onButtonBackClick)
        this.buttonCredit.addEventListener('click', this.onButtonCreditClick)
    }
    hideScreen()
    {
        this.trigger('trigger-intro')
        this.firstSection.classList.add('is-hidden')

        window.setTimeout(() => {
            this.sectionStimulus.classList.add('is-visible')
        }, this.delay);
    }
    onButtonStimulusClick()
    {

        this.trigger('trigger-stimulus')
        this.sectionStimulus.classList.remove('is-visible')

        window.setTimeout(() => {
            this.sectionOrder.classList.add('is-visible')
        }, this.delay);

    }
    onButtonOrderClick()
    {
        this.trigger('trigger-order')
        this.sectionOrder.classList.remove('is-visible')

        window.setTimeout(() => {
            this.sectionResonnance.classList.add('is-visible')
        }, this.delay * 3);
    }
    onButtonResonnanceClick()
    {
        this.trigger('trigger-restart')
        this.sectionResonnance.classList.remove('is-visible')
        this.firstSection.classList.remove('is-hidden')
    }
    onButtonCreditClick()
    {
        this.sectionCredit.classList.remove('is-hidden')
        this.sectionResonnance.classList.remove('is-visible')

    }
    onButtonBackClick()
    {
        this.sectionCredit.classList.add('is-hidden')
        this.sectionResonnance.classList.add('is-visible')

    }
}