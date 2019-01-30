import { Component, OnInit, Input } from '@angular/core';

@Component({
	selector: 'app-holder',
	templateUrl: './holder.component.html',
	styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {
	@Input() type?: string = "default";
	imgUrl: string;
	constructor() {
	}

	ngOnInit() { 
		switch(this.type) {
			default: 
				this.imgUrl = '/assets/img/logos/adsHolder.png'
		}
	}

}
