class Beverage {
    constructor (param = {}) {
        this.param = param
    }

    boilWater () {
        console.log('把水煮沸')
    }

    brew () {
        (this.param.brew || function () {
            throw new Error('必须传递brew方法')
        })()
    }

    pourInCup () {
        (this.param.pourInCup || function () {
            throw new Error('必须传递pourInCup方法')
        })()
    }

    addCondiments() {
        (this.param.addCondiments || function () {
            throw new Error('必须传递addCondiments方法')
        })()
    }

    init () {
        this.boilWater()
        this.brew()
        this.pourInCup()
        this.addCondiments()
    }
}

const coffee = new Beverage ({
    brew: function () {
        console.log('用沸水泡咖啡')
    },
    pourInCup: () => {
        console.log('将咖啡倒入杯子')
    },
    addCondiments: () => {
        console.log('加块冰')
    }
})

coffee.init()