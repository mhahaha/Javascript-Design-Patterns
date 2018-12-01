var Beverage = function (param = {}) {
    var boilWater = function () {
        console.log('把水煮沸')
    }

    // 考虑代码的健壮性，当然还得校验参数的是function类型，这里就略过啦
    var brew = param.brew || function () {
        throw new Error('必须传递brew方法')
    }

    var pourInCup = param.pourInCup || function () {
        throw new Error('必须传递pourInCup方法')
    }

    var addCondiments = param.addCondiments || function () {
        throw new Error('必须传递addCondiments方法')
    }

    var tempFunction = function () {}

    tempFunction.prototype.init = function () {
        boilWater()
        brew()
        pourInCup()
        addCondiments()
    }

    return tempFunction
}

var Coffee = Beverage({
    brew: function () {
        console.log('用水泡咖啡')
    },
    pourInCup: function () {
        console.log('将咖啡倒进杯子')
    },
    addCondiments: function () {
        console.log('加糖和牛奶')
    }
})

var coffee = new Coffee()
coffee.init()
