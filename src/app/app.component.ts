import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit{
  title = 'Weatherapp';

  constructor(private weatherService:WeatherService, private sanitizer: DomSanitizer){}

  search:boolean=false;
  notfound:boolean=false;

  cityName:string = "";

  data = {
    temp: 0,
    feelsLike:'',
    pressure:0,
    humidity:0,
    city:'',
    description:'',
    imageURL:'' as SafeResourceUrl | string,
  }

  ngOnInit(){
    // this.loadData()
  }

  loadData(){
    this.search = true;
    if(this.cityName){
      this.weatherService.fetchData(this.cityName).subscribe(
        (data:any) => {
          if(data){
            console.log(data);
            this.data.city = data.name;
            this.data.feelsLike = data.main.feels_like;
            this.data.pressure = data.main.pressure;
            this.data.humidity = data.main.humidity;
            this.data.temp = data.main.temp;
            this.data.description = data.weather[0].description;
            this.data.imageURL = this.sanitizer.bypassSecurityTrustResourceUrl(`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
            this.notfound = false;
            console.log(this.notfound);
          }
        },
        error => {
          console.log("Error", error);
          this.notfound=true;
          console.log(this.notfound);
        }
      );
    }
    this.cityName='';
  }

}
