import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  AllQuestions: any;
  CurrentQuestion: any;
  Counter: number = 1;
  result: number = 0.
  correctas: number = 0.
  incorrectas: number = 0;
  resultados: any = [];
  resultado: any = {};

  constructor(private http: HttpClient,private storage: Storage, private router: Router) {
    this.CurrentQuestion = {};
    this.http.get('assets/data.json').subscribe(data => {
      data = this.sanitize(data);
      this.AllQuestions = data;
      this.CurrentQuestion = data[0];
      console.log(this.AllQuestions);
      console.log(this.CurrentQuestion);
    });
  }


  Validate(){
    let flag: boolean = true;
    for (let index = 0; index < this.CurrentQuestion.answers.length; index++) {
      if(this.CurrentQuestion.answers[index].respuesta != this.CurrentQuestion.answers[index].checked){
        flag = false;
      }
    }

    if(flag){
      console.log("Chingon");
      this.result = 1;
      this.correctas++;
    }else{
      console.log("Vales pa pura verga");
      this.result = 2;
      this.incorrectas++;
    }

  }

  exitoContinuar(){
    if(this.AllQuestions.length > this.Counter){
      this.result = 0;
      this.CurrentQuestion = this.AllQuestions[this.Counter];
      this.Counter++;      
    }else{
      console.log("Llegaste al final", this.Counter);
      this.guardarResultado();
    }
    
  }

  errorContinuar(){
    if(this.AllQuestions.length > this.Counter){
    this.result = 0;
    this.CurrentQuestion = this.AllQuestions[this.Counter];
    this.Counter++;    
  }else{
    console.log("Llegaste al final", this.Counter);
    this.guardarResultado();
  }
}

guardarResultado(){
  this.storage.get('resultado').then((val) => {
    console.log('Tu valor es', val);
    if(val == undefined){
      val = [];
    }
    console.log(this.correctas, this.incorrectas);
    this.resultados = [];
    // this.resultados = val;

    if(val.length >= 10){
      this.resultados = val.slice(Math.max(val.length - 10, 1));      
    }else{
      this.resultados = val;
    }    

    this.resultados.push({
      "correctas"   : this.correctas,
      "incorrectas" : this.incorrectas,
      "fecha"       : new Date()
    });
    this.storage.set('resultado', this.resultados);
    this.Counter = 1;
    this.result = 0;
    this.correctas = 0;
    this.incorrectas = 0;
    this.limpiarBox();
    this.AllQuestions = this.sanitize(this.AllQuestions);
    this.CurrentQuestion = this.AllQuestions[0];
    this.router.navigate(['/tabs/tab2'])
  }); 
}

shuffle(a) {
  var j, x, i;
  for (i = a.length - 1; i > 0; i--) {
      j = Math.floor(Math.random() * (i + 1));
      x = a[i];
      a[i] = a[j];
      a[j] = x;
  }
  return a;
}

limpiarBox(){
  for (let i = 0; i < this.AllQuestions.length; i++) {
    for (let index = 0; index < this.AllQuestions[i].answers.length; index++) {
      this.AllQuestions[i].answers[index].checked = false;
    }    
  }
}

 sanitize(x){
  for (let index = 0; index < x.length; index++) {
    x[index].answers =  this.shuffle(x[index].answers);    
  }
  x =  this.shuffle(x);
  return x;
}  

}
