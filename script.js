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
}