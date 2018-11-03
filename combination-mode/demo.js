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

const macroCommand3 = new MacroCommand('命令3')
macroCommand3.add(macroCommand1)
macroCommand3.add(macroCommand2)
macroCommand3.execute()
