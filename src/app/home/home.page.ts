import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  expression: string = '';
  result: string = '';

  press(value: string) {
    switch (value) {
      case '=':
        this.calculate();
        break;

      case '√':
        try {
          const val = eval(this.expression);
          if (val < 0) {
            this.result = 'Error: raíz de número negativo';
          } else {
            const res = Math.sqrt(val);
            this.expression = `√(${val})`;
            this.result = res.toString();
          }
        } catch {
          this.result = 'Error: expresión inválida';
        }
        break;

      case 'log':
        try {
          const val = eval(this.expression);
          if (val <= 0) {
            this.result = 'Error: logaritmo negativo o cero';
          } else {
            const res = Math.log(val) / Math.LN10;
            this.expression = `log(${val})`;
            this.result = res.toString();
          }
        } catch {
          this.result = 'Error: expresión inválida';
        }
        break;

      case '^':
        this.expression += '**';
        break;

      case '%':
        this.expression += '/100';
        break;

      case 'sin':
      case 'cos':
      case 'tan':
        try {
          const val = eval(this.expression);
          const rad = (val * Math.PI) / 180;
          const res = Math[value](rad);
          this.expression = `${value}(${val})`;
          this.result = res.toString();
        } catch {
          this.result = 'Error: expresión inválida';
        }
        break;

      case '←':
        if (this.expression.length > 0) {
          this.expression = this.expression.slice(0, -1);
        }
        break;

      default:
        if (this.result && /^[0-9.]$/.test(value)) {
          this.expression = '';
          this.result = '';
        }
        this.expression += value;
    }
  }

  clear() {
    this.expression = '';
    this.result = '';
  }

  calculate() {
    try {
      if (this.expression.trim() === '') {
        this.result = 'Error: expresión vacía';
        return;
      }

      // Detecta división por cero
      if (this.expression.includes('/0')) {
        const divByZero = /\/0+(?![0-9])/g.test(this.expression);
        if (divByZero) {
          this.result = 'Error';
          return;
        }
      }

      const result = eval(this.expression);

      if (!isFinite(result)) {
        this.result = 'Error: operación inválida';
      } else {
        this.result = result.toString();
        this.expression = this.result; // Aquí asignas el resultado a la expresión
      }
    } catch (e) {
      this.result = 'Error: expresión inválida';
    }
  }
}
