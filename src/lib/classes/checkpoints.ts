import { Rectangle } from '@api/rectangle';

export class Checkpoint {
	x: number;
	y: number;

	sprite: Rectangle;

	constructor(x: number, y: number) {
		this.x = x * 20 + 10;
		this.y = y * 20 + 10;
		this.sprite = new Rectangle(
			15,
			15,
			'#faef7daa',
			'none',
			this.x,
			this.y
		);
	}
}
