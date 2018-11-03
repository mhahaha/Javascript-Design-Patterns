### 什么是组合模式？
“组合”，顾名思义即多个小个体或者小对象构成的“大对象”，构成组合的小对象本身也可以是更小的对象。

### 一个简单的示例: 万能遥控

```javascript

const closeDoorCommand = {
    execute: () => {
        console.log('关门');
    }
}
const openPcCommand = {
    execute: () => {
        console.log('开电脑');
    }
}
const openQQCommand = {
    execute: () => {
        console.log('登录 QQ');
    }
}
class MacroCommand {
    constructor () {
        this.commandsList = []
    }

    add (command) {
        this.commandsList.push(command)
    }

    execute () {
        for (let i = 0, command; command = this.commandsList[i++];) {
            command.execute()
        }
    }
}

const macroCommand = new MacroCommand()
macroCommand.add(closeDoorCommand)
macroCommand.add(openPcCommand)
macroCommand.add(openQQCommand)
macroCommand.execute()
```
观察代码可以看出，MacroCommand其实是由['closeDoorCommand', 'openPcCommand', 'openQQCommand']三个命令组成的一个命令集，即宏命令(MacroCommand)中包含了一组子命令，组成了一个简单的树结构，marcoCommand就是组合对象，closeDoorCommand、openPcCommand、openQQCommand 都是叶对象。在 macroCommand 的 execute 方法里，并不执行真正的操作，而是遍历它所包含的对象，把真正的 execute 请求委托给这些叶对象。macroCommand 表现得像一个命令，但它实际上只是一组真正命令的“代理”。并非真正的代理，虽然结构上相似，但 macroCommand 只负责传递请求给叶对象，它的目的不在于控制对叶对象的访问。

### 组合模式的用途

组合模式将对象组合成树形结构，以表示“部分-整体”的层次结构。 除了用来表示树形结构之外，组合模式的另一个好处是通过对象的多态表现，使得用户对单个对象和组合对象的使用具有一致性。

上面例子可以看出，我们在添加功能命令时，我们并不会关心这个命令是普通的子命令还是组合了多种功能的宏命令，只要具有execute方法，我们都可以添加成功，且可以自由组合，在实际开发中，拓展性时非常好的。所有我们通常可以用组合模式来完成类似这类“多个功能自由组合”的开发需求。

### 组合模式拓展
我们上面提到的是多个子命令组合成宏命令，也说到宏命令子命令可以“自由组合”，那我们就上面的示例进行一个小小的拓展来验证下我们刚才的总结吧
```javascript
const closeDoorCommand = {
    execute: () => {
        console.log('关门');
    }
}
const openPcCommand = {
    execute: () => {
        console.log('开电脑');
    }
}
const openQQCommand = {
    execute: () => {
        console.log('登录 QQ');
    }
}
class MacroCommand {
    constructor (name) {
        this.name = name
        this.commandsList = []
    }

    add (command) {
        this.commandsList.push(command)
    }

    execute () {
        console.log(`${this.name}:`)
        for (let i = 0, command; command = this.commandsList[i++];) {
            command.execute()
        }
    }
}

const macroCommand1 = new MacroCommand('命令1')
macroCommand1.add(closeDoorCommand)
macroCommand1.add(openPcCommand)
macroCommand1.execute()

const macroCommand2 = new MacroCommand('命令2')
macroCommand2.add(openPcCommand)
macroCommand2.add(openQQCommand)
macroCommand2.execute()

// 组合宏命令
const macroCommand3 = new MacroCommand('命令3')
macroCommand3.add(macroCommand1)
macroCommand3.add(macroCommand2)
macroCommand3.execute()
```
执行以上代码，结果完全符合我们预期，无论组合多么复杂的层级，组合模式都可以不断递归下去。

### 透明性带来的安全问题
组合模式最大的优点在于可以一致地对待组合对象和基本对象，它的透明性使得发起请求的用户不用去顾虑树中组合对象和叶对象的区别，但它们本质上有是区别的，**组合对象可以拥有子节点，叶对象下面就没有子节点**， 所以我们也许会发生一些误操作，比如试图往叶对象中添加子节点。解决方案通常是给叶对象也增加 add 方法，并且在调用这个方法时，抛出一个异常来及时提醒用户

```javascript
const openQQCommand = {
    execute: () => {
        console.log('登录 QQ');
    },
    add: () => {
        throw new Error( '叶对象不能添加子节点' )
    }
}
```

### 一些值得注意的地方
1. 组合模式不是父子关系
组合模式是一种 HAS-A（聚合）的关系，而不是 IS-A。它们能够合作的关键是拥有相同的接口。 

2. 对叶对象操作的一致性
组合模式除了要求组合对象和叶对象拥有相同的接口之外，还有一个必要条件，就是对一组叶对象的操作必须具有一致性。

### 何时使用组合模式
- 表示对象的部分整体层次结构。
- 用户希望统一对待树中的所有对象。

### end
组合模式虽然好，但是我们实际开发时并不是所有场景都适用，只有深入理解才可以在一些场景里面很快想到设计模式的使用，终归是想让自己的代码更好理解，可读性更高，感觉设计模式这东西真的是需要反复地看反复地琢磨>_<，希望自己可以很好地坚持。
