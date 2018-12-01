### 只需使用继承就可以实现的非常简单的设计模式

最初看到“模板方法模式“，感觉应该就是一个模板，支持不同的设置。看了书上的解释觉得理解的差不多，就是把相同的剥离出来作为模板（父类），不同的设置放在模板以外（子类）。

>模板方法模式 ＝ 抽象父类 ＋ 具象子类

先通过一个例子加深对模板方法模式的理解。

Coffee or Tea

```
泡一杯咖啡步骤：
    1.把水煮沸
    2.用沸水冲咖啡
    3.把咖啡倒进杯子
    4.加糖和牛奶

泡一壶茶步骤：
    1.把水煮沸
    2.用沸水浸泡茶叶
    3.把茶水倒进杯子
    4.加柠檬
```
    
按照我们上面的理解，我们首先应该做的是找出泡咖啡和泡茶这两个过程的相同点和不同点。
我们可以找出以下不同点：
    － 原料不同：茶 or 咖啡
    － 泡的方式不同：冲泡 or 浸泡
    － 加的调料不同：糖和牛奶 or 柠檬

现在大概可以构思出一个模板方法的大概的框架：
    1.把水煮沸 (boilWater)
    2.用沸水冲饮料 (brew)
    3.把饮料倒进杯子 (pourInCup)
    4.加调料 (addCondiments)

我们先用function来实现该框架第一版：

```javascript
var Beverage = function () {}

Beverage.prototype.boilWater = function () {
    console.log('把水煮沸...')
}
Beverage.prototype.brew = function () {}
Beverage.prototype.pourInCup = function () {}
Beverage.prototype.addCondiments = function () {}

// 模板方法
Beverage.prototype.init = function () {
    this.boilWater()
    this.brew()
    this.pourInCup()
    this.addCondiments()
}
```
上面 `init` 方法就是我们模板方法模式中的 `模板方法`，因为它封装了子类的算法框架，作为一个算法模板来执行一系列方法。

现在我们有了模板父类，我们现在缺具象的实现子类。接下来我们先创建Coffee和Tea子类：

```javascript
// 创建咖啡子类
var Coffee = function () {}
Coffee.prototype = new Beverage ()

Coffee.prototype.brew = function () {
    console.log('用沸水冲咖啡')
}
Coffee.prototype.pourInCup = function () {
    console.log('把咖啡倒进杯子')
}
Coffee.prototype.addCondiments = function () {
    console.log('加糖和牛奶')
}

// 创建Tea子类
var Tea = function () {}
Tea.prototype = new Beverage()

Tea.prototype.brew = function () {
    console.log('用沸水浸泡茶叶')
}
Tea.prototype.pourInCup = function () {
    console.log('把茶水倒进杯子')
}
Tea.prototype.addCondiments = function () {
    console.log('加柠檬')
}

```

实例化：
```javascript
var coffee = new Coffee()
coffee.init()

var tea = new Tea()
tea.init()
```
上面的示例只是为了更好的理解模板方法模式，换在现在的一个需求场景我们可能不会这么去做，可能简单的回调或者是参数判断我们就可以简单实现，而并不是一定要用这种继承方式。

```javascript
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

Tea照葫芦画瓢...
```

上面实现的可以实现同样的效果，模板内部不需要关心子类有没有相应的处理方法，子类负责一些细节处理就好。这里引入了一个新的设计原则——“[好莱坞原则](https://baike.baidu.com/item/%E5%A5%BD%E8%8E%B1%E5%9D%9E%E5%8E%9F%E5%88%99/16019700)” 可以穿插了解一下。
`“不要给我们打电话，我们会给你打电话(don‘t call us, we‘ll call you)”这是著名的好莱坞原则。`

类似的，我们用ES6的class也可以实现，基础示例代码如下：

```javascript
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
```
进一步说明了设计模式中从分析逻辑中`不变的`和`变化的`的同时可以带给我们很好的优化空间，很受用。只有充分的理解了模板方法模式的定义我们才可以更好的去使用它，在合适的场景联想到它。我感觉去做功能框架的时候，真正用得上的话可以省好多重复逻辑的代码哦，想一下项目中哪里可以进行相关优化......
