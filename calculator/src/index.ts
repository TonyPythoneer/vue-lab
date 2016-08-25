import * as Vue from "vue";


//
Vue.config.devtools = true


//
class Calculator extends Vue {
    /* vue data */
    monitor = "0";
    static buttonBoard: string[][] = [
        [null, '7', '8', '9', '/'],
        [null, '4', '5', '6', '*'],
        ['c', '1', '2', '3', '+'],
        ['ac', '0', '.', '=', '-'],
    ];
    /* class data */
    needInit = true;
    memory = "";
    operator = "";
    /* vue constructor */
    constructor() {
        super();
        const option: vuejs.ComponentOption = {
            el: '#app',
            data: {
                monitor: this.monitor,
                buttonBoard: Calculator.buttonBoard,
            },
            methods: {
                clickButton: this.clickButton,
            }
        }
        this._init(option)
    }
    /* vue methods */
    clickButton(input: string) {
        switch (input) {
            case "0":
            case "1":
            case "2":
            case "3":
            case "4":
            case "5":
            case "6":
            case "7":
            case "8":
            case "9":
                this.appendNumber(input);
                break;
            case "+":
            case "-":
            case "*":
            case "/":
                this.storeOperator(input);
                break;
            case "=":
                this.excuteExpression();
                break;
            case ".":
                this.appendPoint();
                break;
            case "c":
                this.clean();
                break;
            case "ac":
                this.allClean();
                break;
            default:
                console.log("BUG!")
                break;
        }
    }
    /* class method */
    triggerInit(initNum: string = ""){
        if (this.needInit) {
            this.monitor = initNum;
            this.needInit = false;
        };
    }
    triggerMemorize(){
        if (!this.needInit) {
            this.memory = this.monitor;
            this.needInit = true;
        }
    }
    appendNumber(newNum: string) {
        this.triggerInit();
        this.monitor += newNum;
    }
    appendPoint() {
        let noIncludingPoint: boolean = this.monitor.indexOf(".") == -1;
        this.triggerInit("0");
        if (noIncludingPoint) {
            this.monitor += ".";
        }
    }
    storeOperator(op: string) {
        let hasMemory = !!this.memory;
        let hasInput = !this.needInit;
        if (hasMemory && hasInput) {
            this.excuteExpression();
        }else{
            this.triggerMemorize()
            if (this.operator !== op) {
                this.operator = op;
            }
        }
    }
    excuteExpression() {
        let [op1, op2] = [Number(this.memory), Number(this.monitor)]
        let result:number;
        switch (this.operator) {
            case "+":
                result = op1 + op2;
                break;
            case "-":
                result = op1 - op2;
                break;
            case "*":
                result = op1 * op2;
                break;
            case "/":
                result = op1 / op2;
                break;
        }
        this.monitor = this.memory = result.toString();
        this.needInit = true;
    }
    clean() {
        this.monitor = "0";
        this.needInit = true;
    }
    allClean() {
        this.monitor = "0";
        this.memory = this.operator = "";
        this.needInit = true;
    }
}
const calculator = new Calculator();
