import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { IloveyouComponent } from '../components/iloveyou/iloveyou.component';
import { interval, Subscription } from 'rxjs';
import { DatabaseService } from '../services/database.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {

  images = [
    '../../assets/images/foto1.jpeg',
    '../../assets/images/foto2.jpeg',
    '../../assets/images/foto3.jpeg',
    '../../assets/images/foto4.jpeg',
    '../../assets/images/foto5.jpeg',
    '../../assets/images/foto6.jpeg',
    '../../assets/images/foto7.jpeg',
    '../../assets/images/foto8.jpeg',
    '../../assets/images/foto9.jpeg',
    '../../assets/images/foto10.jpeg',
    '../../assets/images/foto11.jpeg',
    '../../assets/images/foto12.jpeg',
    '../../assets/images/foto13.jpeg',
    '../../assets/images/foto14.jpeg',
    '../../assets/images/foto15.jpeg',
    '../../assets/images/foto16.jpeg',
    '../../assets/images/foto17.jpeg',
    '../../assets/images/foto18.jpeg',
    '../../assets/images/foto19.jpeg',
    '../../assets/images/foto20.jpeg',
    '../../assets/images/foto21.jpeg',
    '../../assets/images/foto22.jpeg',
    '../../assets/images/foto23.jpeg',
    '../../assets/images/foto24.jpeg',
    '../../assets/images/foto25.jpeg',
  ];

  currentIndex = 0;

  startDate!: Date;
  durationInSeconds: number = 0;
  timerSubscription!: Subscription;

  constructor(
    public matDialog: MatDialog,
    private databaseService: DatabaseService
  ) { }

  ngOnInit(): void {
    // Obter a data de início do relacionamento do Firebase
    this.databaseService.getStartDate().subscribe((startDateString: any) => {
      if (startDateString) {
        this.startDate = new Date(startDateString);

        // Iniciar o cronômetro
        this.startTimer();
      }
    });
  }

  startTimer(): void {
    // Atualizar o cronômetro a cada segundo
    this.timerSubscription = interval(1000).subscribe(() => {
      const now = new Date();
      this.durationInSeconds = Math.floor((now.getTime() - this.startDate.getTime()) / 1000);

      // Opcional: Atualizar o Firebase com a duração total
      this.databaseService.updateCurrentDuration(this.durationInSeconds);
    });
  }

  formatDuration(): { years: number; months: number; days: number; hours: number; minutes: number; seconds: number } {
    let remainingSeconds = this.durationInSeconds;

    const years = Math.floor(remainingSeconds / (365 * 24 * 60 * 60));
    remainingSeconds %= 365 * 24 * 60 * 60;

    const months = Math.floor(remainingSeconds / (30 * 24 * 60 * 60));
    remainingSeconds %= 30 * 24 * 60 * 60;

    const days = Math.floor(remainingSeconds / (24 * 60 * 60));
    remainingSeconds %= 24 * 60 * 60;

    const hours = Math.floor(remainingSeconds / (60 * 60));
    remainingSeconds %= 60 * 60;

    const minutes = Math.floor(remainingSeconds / 60);
    remainingSeconds %= 60;

    return { years, months, days, hours, minutes, seconds: remainingSeconds };
  }

  ngOnDestroy(): void {
    // Limpar o intervalo ao destruir o componente
    if (this.timerSubscription) {
      this.timerSubscription.unsubscribe();
    }
  }

  prevSlide() {
    if (this.currentIndex === 0) {
      this.currentIndex = this.images.length - 1;
    } else {
      this.currentIndex--;
    }
  }

  nextSlide() {
    if (this.currentIndex === this.images.length - 1) {
      this.currentIndex = 0;
    } else {
      this.currentIndex++;
    }
  }

  get transformStyle() {
    return `translateX(-${this.currentIndex * 100}%)`;
  }

  openDialog() {
    this.matDialog.open(IloveyouComponent);
  }
}
