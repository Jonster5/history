import { Rectangle } from '@api/rectangle';

export class Checkpoint {
	x: number;
	y: number;
	text: string;

	sprite: Rectangle;

	constructor(x: number, y: number, text: string) {
		this.x = x * 20 + 10;
		this.y = y * 20 + 10;
		this.sprite = new Rectangle(15, 15, '#8f8738', 'none', this.x, this.y);

		this.text = text;
	}
}
