import type { Sprite } from '@api/sprite';
import bgSrc from '@assets/images/bg1.png';
import { Platform } from '@utils/levelUtils';

const width = 100,
	height = 50;

const objects = [
	new Platform(-46, 20, 20, 1, 'grass'),
	new Platform(0, 30, 5, 1, 'sand'),
];

const background = new Image(2000, 1000);
background.src = bgSrc;

export default {
	width,
	height,

	background,
	objects,

	getSize(): number {
		return Math.max(this.width * 20, this.height * 20);
	},

	getDims(): [number, number] {
		return [this.width * 20, this.height * 20];
	},

	getSprites(): Sprite[] {
		return objects.map((o) => o.sprites).reduce((a, b) => a.concat(b));
	},
};
