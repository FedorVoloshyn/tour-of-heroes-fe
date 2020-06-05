import { Component, OnInit, Input } from '@angular/core';
import { Hero } from '../../shared/models/hero';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { HeroService } from '../hero.service';
import { AuthService } from '../../core/authentication/auth.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {

  @Input() hero: Hero;
  busy: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location,
    private authService: AuthService,
    private spinner: NgxSpinnerService) { }

    ngOnInit(): void {
      this.busy = true;
      this.spinner.show();
      this.getHero(this.authService.authorizationHeaderValue);
    }

    getHero(token: string): void {
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.getHero(id, token)
      .pipe(finalize(() => {
        this.spinner.hide();
        this.busy = false;
      }))
        .subscribe(hero => this.hero = hero);
    }

    save(): void {
      this.busy = true;
      this.spinner.show();
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.updateHero(this.hero, this.authService.authorizationHeaderValue)
      .pipe(finalize(() => {
        this.spinner.hide();
        this.busy = false;
      }))
        .subscribe(() => this.goBack());
    }

    delete(): void {
      this.busy = true;
      this.spinner.show();
      const id = +this.route.snapshot.paramMap.get('id');
      this.heroService.deleteHero(id, this.authService.authorizationHeaderValue)
      .pipe(finalize(() => {
        this.spinner.hide();
        this.busy = false;
      }))
        .subscribe(() => this.goBack());
    }

    goBack(): void {
      this.location.back();
    }

}
