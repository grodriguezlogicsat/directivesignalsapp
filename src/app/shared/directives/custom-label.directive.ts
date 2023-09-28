import { Directive, ElementRef, Input, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';

@Directive({
  selector: '[customLabel]'
})
export default class CustomLabelDirective implements OnInit{

  private htmlElement?: ElementRef<HTMLElement>;
  private _color: string = 'red';
  private _errors?: ValidationErrors | null | undefined;

  @Input() set color(value: string){
    // console.log(value);
    this._color = value;
    this.setStyle();
  }

  @Input() set errors(value: ValidationErrors | null | undefined){
    // console.log(value);
    this._errors = value;
    this.setErrorMessage();
  }

  constructor( private el: ElementRef<HTMLElement>) {
    this.htmlElement = el;

    // this.htmlElement.nativeElement.innerHTML = 'Hola mundo!'
   }

  ngOnInit(): void {

  }

  setStyle():void{
    if(!this.htmlElement) return;

    this.htmlElement!.nativeElement.style.color = this._color;
  }

  setErrorMessage():void{
    if(!this.htmlElement) return;
    if(!this._errors){
      this.htmlElement.nativeElement.innerText = 'No hay errores';
      return;
    }

    const errors = Object.keys(this._errors!);

    if(errors.includes('required')){
      this.htmlElement.nativeElement.innerText = 'Este campo es requerido';
      return;
    }
    if(errors.includes('minlength')){

      const actual = this._errors['minlength']['actualLength'];
      const cantidad = this._errors['minlength']['requiredLength'];
      this.htmlElement.nativeElement.innerText = `Minimo ${actual}/${cantidad}`;
      return;
    }
    if(errors.includes('email')){
      this.htmlElement.nativeElement.innerText = 'Es del tipo email';
      return;
    }

  }

}
