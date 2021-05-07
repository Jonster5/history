import r1 from '@assets/images/french-right1.png';
import p from '@assets/images/player.png';
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
	new Platform(-40, 14, 3, 1, 'dirt'),
	new Platform(-45, 11, 4, 1, 'wood'),
	new Platform(-46, 2, 1, 10, 'wood'),
	new Platform(-44, 2, 5, 1, 'wood'),
	new Platform(-37, 0, 3, 1, 'wood'),
	new Platform(-33, 1, 2, 1, 'wood'),
	new Platform(-30, 1, 3, 1, 'grass'),
	new Platform(-27, 2, 2, 1, 'dirt'),
	new Platform(-23, -6, 1, 6, 'barrier'),
	new Platform(-23, 0, 1, 3, 'stone'),
	new Platform(-24, 6, 1, 1, 'wood'),
	new Platform(-22, 3, 1, 3, 'stone'),
	new Platform(-21, 6, 1, 4, 'stone'),
	new Platform(-20, 10, 1, 4, 'stone'),
	new Platform(-20, 15, 10, 1, 'wood'),
	new Platform(-11, 14, 1, 1, 'bouncy'),
	new Platform(-9, 9, 4, 1, 'stone'),
];

const checkpoints = [
	new Checkpoint(-46, 19),
	new Checkpoint(-43, 10),
	new Checkpoint(-41, 1),
	new Checkpoint(-26, 1),
	new Checkpoint(-16, 14),
];

const pImgRight = [r1].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgLeft = [r1].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgJumpRight = new Image(15, 20);
pImgJumpRight.src = p;

const pImgJumpLeft = new Image(15, 20);
pImgJumpLeft.src = p;

const background = new Image(2000, 1000);
background.src = bgSrc;

export default {
	width,
	height,

	background,
	objects,
	checkpoints,

	pImgRight,
	pImgJumpRight,
	pImgLeft,
	pImgJumpLeft,

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
