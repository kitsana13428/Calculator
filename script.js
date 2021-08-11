const numberButtons = document.querySelectorAll('[data-number]'); //เข้าถึง data-number ทุกตัว
const operationButtons = document.querySelectorAll('[data-operation]'); //เข้าถึง data-operation ทุกตัว
const equalsButtons = document.querySelector('[data-equals]'); //ไม่ต้องใช้ All เพราะมีตัวเดียว ปุ่มเท่ากับ
const deleteButtons = document.querySelector('[data-dalete]'); //ปุ่ม ลบ
const allClearButtons = document.querySelector('[data-all-clear]'); //ปุ่ม C

const currentScreenTextElement = document.querySelector('[data-operand-current]'); //หลัง
const previousScreenTextElement = document.querySelector('[data-operand-previous]'); //ก่อน

class Caculator { //เมื่อ Caculator ถูกเรียกใช้งาน จะทำงานข้างใน
    constructor(currentScreenTextElement,previousScreenTextElement){
        this.currentScreenTextElement = currentScreenTextElement;
        this.previousScreenTextElement = previousScreenTextElement;
        this.clear();
    }    

    clear() { //ฟังก์ชั่นปู่ม C
        this.currentOperand = "";
        this.previousOperand = "";
        this.operation = null;
    }

    delete() { //ฟังก์ชั่นลบ
        this.currentOperand = this.currentOperand.toString().slice(0,-1); //ลบจากด้านหลังสุด
    }
    
    appendNumber(number) { //ฟังก์ชั่นการแสดงตัวเลข
        if (number === '.' && this.currentOperand.includes('.')) return; //มีได้แค่จุดเดียว (ไม่ให้เพิ่มมากกว่า 1 จุด)
        this.currentOperand = this.currentOperand.toString() + number.toString(); //พิมพ์ตัวเลขไม่ใช่จุด จะให้ไปรวมกับเลขตัวอื่นๆด้วย
    }

    flushOperator(operation) {
        if (this.currentOperand === "") return; //ถ้าเป็นค่าว่างให้หยุดทำงาน
        if (this.previousOperand !== "") { //ถ้าไม่เท่ากับค่าว่าง ให้ทำงานตามเงื่อนไข
            this.compute(); //คำนวณผลลัพธ์
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = ""; //เมื่อกดเท่ากับ = จะรีเซ็ตค่าบนเครื่องคิดเลข
    }

    compute() { //คำนวณผลลัพธ์
        let computation; //ตัวแปร
        const previous = parseFloat(this.previousOperand); //สร้างตัวแปร แล้วแปลงค่าเป็นตัวเลขทศนิยม
        const current = parseFloat(this.currentOperand); //เหมือนกัน

        if (isNaN(previous) || isNaN(current)) return; //ถ้าไม่ใช่ตัวเลขให้หยุดทำงาน

        switch(this.operation) { //คำนวณ
            case "+":
                computation = previous + current; //บวก
            break;

            case "-":
                computation = previous - current; //ลบ
            break;

            case "x":
                computation = previous * current; //คูณ

            case "÷":
                computation = previous / current; //หาร
            break;

            default
                return; //ถ้าไม่มีการกระทำให้ส่งค่าว่างออกไป
        }
        this.currentOperand = computation; //เก็บค่าผลลัพธ์ไว้
        this.previousOperand = ""; //รีเซ็ตให้เป็นค่าว่าง
        this.operation = undefined;
    }

    updateDisplay() { //เวลาพิมพ์ตัวเลข แล้วให้เลขขึ้นจอ
        this.currentScreenTextElement.innerText = this.currentOperand; //เอาขึ้นจอ แล้วเก็บค่าไว้
        if (this.operation != null) { //ถ้าไม่ใช่ค่าว่างจะทำงานต่อไป
            this.previousScreenTextElement.innerText = `${this.previousOperand} ${this.operation}`;
        }
    }
}

const calculator = new Calculator( //สร้างตัวแปร เพื่อเอาไปใช้งาน
    currentScreenTextElement,
    previousScreenTextElement   
);

ืีnumberButtons.forEach((Button) => { //ทำให้ปุ่มใช้งานได้
    button.addEventListener("click", ()=> { //เมื่้อทำการคลิ๊ก ให้ทำงานต่อ
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    });
});
