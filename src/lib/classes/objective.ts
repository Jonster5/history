import { Sprite } from '@api/sprite';

export class Objective {
	x: number;
	y: number;
	text: string;

	sprite: Sprite;

	constructor(x: number, y: number, img: HTMLImageElement) {
		this.x = x * 20 + 10;
		this.y = y * 20 + 10;
		this.sprite = new Sprite([img], 20, 20, this.x, this.y);
	}
}
