import {Component, OnInit, ViewChild} from '@angular/core';
import { Storage } from '@ionic/storage';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page{
  private doughnutChart1: Chart;
  private doughnutChart2: Chart;
  private doughnutChart3: Chart;
  @ViewChild("doughnutCanvas1", {static: true}) doughnutCanvas1;
  @ViewChild("doughnutCanvas2", {static: true}) doughnutCanvas2;
  @ViewChild("doughnutCanvas3", {static: true}) doughnutCanvas3;
  resultados: any = [];
  resultado: any = {};

  constructor(private storage: Storage) {
    
  }


  ionViewWillEnter() {
    this.cargarDatos();
  }

  async cargarDatos(){
    await this.storage.get('resultado').then((val) => {
      console.log('Tu valor es', val);
      this.resultados = [];
      this.resultados = val.reverse();      
    });
    this.yourCustomFunctionName();
  }
  

  public async  yourCustomFunctionName() {

    this.resultado = await this.resultados[0];
      this.doughnutChart1 = new Chart(this.doughnutCanvas1.nativeElement, {
        type: "doughnut",
        data: {
          labels: ["Incorrectas", "Correctas"],
          datasets: [
            {
              label: "# of Votes",
              data: [this.resultado.incorrectas, this.resultado.correctas],
              backgroundColor: [
                "rgba(255, 99, 132, 0.2)",
                "rgba(75, 192, 192, 0.2)",
              ],
              hoverBackgroundColor: ["#FF6384", "#36A2EB"]
            }
          ]
        }
      });

  }

}