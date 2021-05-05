import type { Rectangle } from '@api/rectangle';
import type { Sprite } from '@api/sprite';
import bgSrc from '@assets/images/bg1.png';
import { Checkpoint } from '@classes/checkpoints';
import { Platform } from '@classes/platforms';

const width = 100,
	height = 50;

const objects = [
	new Platform(-48, 20, 7, 1, 'grass'),
	new Platform(-40, 19, 3, 1, 'grass'),
	new Platform(-35, 17, 2, 1, 'wood'),
	new Platform(-40, 14, 3, 1, 'wood'),
	new Platform(-45, 11, 4, 1, 'wood'),
];

const checkpoints = [new Checkpoint(-46, 18), new Checkpoint(-43, 10)];

const background = new Image(2000, 1000);
background.src = bgSrc;

export default {
	width,
	height,

	background,
	objects,
	checkpoints,

	getSize(): number {
		return Math.max(this.width * 20, this.height * 20);
	},

	getDims(): [number, number] {
		return [this.width * 20, this.height * 20];
	},

	getSprites(): Sprite[] {
		return objects.map((o) => o.sprites).reduce((a, b) => a.concat(b));
	},

	getPoints(): Rectangle[] {
		return objects.map((o) => o.points).reduce((a, b) => a.concat(b));
	},

	getCheckpoints(): Rectangle[] {
		return checkpoints.map((o) => o.sprite);
	},
};
