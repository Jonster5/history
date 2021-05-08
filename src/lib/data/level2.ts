import r1 from '@assets/images/french-right1.png';
import r2 from '@assets/images/french-right2.png';
import r3 from '@assets/images/french-right3.png';
import rjump from '@assets/images/french-right-jump.png';
import l1 from '@assets/images/french-left1.png';
import l2 from '@assets/images/french-left2.png';
import l3 from '@assets/images/french-left3.png';
import ljump from '@assets/images/french-left-jump.png';
import eSrc from '@assets/images/door.png';
import type { Rectangle } from '@api/rectangle';
import type { Sprite } from '@api/sprite';
import bgSrc from '@assets/images/bg1.png';
import data from './blitz.json';
import { Checkpoint } from '@classes/checkpoints';
import { Platform } from '@classes/platforms';
import { Objective } from '@classes/objective';

const width = 100,
	height = 50;

const objects = [
	new Platform(-48, 20, 7, 1, 'grass'),
	new Platform(-40, 19, 3, 1, 'grass'),
	new Platform(-35, 17, 2, 1, 'wood'),
	new Platform(-40, 14, 3, 1, 'wood'),
	new Platform(-45, 11, 4, 1, 'wood'),
	new Platform(-46, 2, 1, 10, 'wood'),
	new Platform(-44, 2, 5, 1, 'wood'),
	new Platform(-37, 0, 3, 1, 'wood'),
	new Platform(-33, 1, 2, 1, 'wood'),
	new Platform(-30, 1, 3, 1, 'wood'),
	new Platform(-27, 2, 2, 1, 'wood'),
	new Platform(-23, -6, 1, 6, 'barrier'),
	new Platform(-23, 0, 1, 3, 'stone'),
	new Platform(-24, 6, 1, 1, 'wood'),
	new Platform(-22, 3, 1, 3, 'stone'),
	new Platform(-21, 6, 1, 4, 'stone'),
	new Platform(-20, 10, 1, 4, 'stone'),
	new Platform(-20, 15, 10, 1, 'wood'),
	new Platform(-11, 14, 1, 1, 'bouncy'),
	new Platform(-9, 9, 4, 1, 'stone'),
	new Platform(-15, 7, 4, 1, 'stone'),
	new Platform(-15, 6, 1, 1, 'bouncy'),
	new Platform(-17, -1, 1, 3, 'wood'),
	new Platform(-17, -2, 1, 1, 'bouncy'),
	new Platform(-10, -4, 1, 1, 'wood'),
	new Platform(-10, -5, 6, 1, 'wood'),
	new Platform(1, 4, 1, 1, 'wood'),
	new Platform(1, 3, 1, 1, 'bouncy'),
	new Platform(7, 4, 1, 1, 'wood'),
	new Platform(7, 3, 1, 1, 'bouncy'),
	new Platform(11, 0, 5, 1, 'dirt'),
	new Platform(18, 0, 2, 2, 'wood'),
	new Platform(22, 1, 2, 2, 'wood'),
	new Platform(26, -1, 2, 2, 'wood'),
	new Platform(30, 1, 2, 2, 'wood'),
	new Platform(40, -13, 10, 38, 'stone'),
	new Platform(39, -1, 1, 2, 'stone'),
	new Platform(34, 2, 6, 1, 'stone'),
	new Platform(38, 3, 2, 2, 'stone'),
];

const checkpoints = [
	new Checkpoint(-46, 19, data.a),
	new Checkpoint(-43, 10, data.b),
	new Checkpoint(-41, 1, data.c),
	new Checkpoint(-26, 1, data.d),
	new Checkpoint(-16, 14, data.e),
	new Checkpoint(-6, -6, data.f),
	new Checkpoint(14, -1, data.g),
	new Checkpoint(35, 1, data.h),
];

const eImg = new Image(20, 20);
eImg.src = eSrc;

const exit = new Objective(39, 1, eImg);

const pImgRight = [r1, r2, r3].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgLeft = [l1, l2, l3].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgJumpRight = new Image(15, 20);
pImgJumpRight.src = rjump;

const pImgJumpLeft = new Image(15, 20);
pImgJumpLeft.src = ljump;

const background = new Image(2000, 1000);
background.src = bgSrc;
2;

export default {
	width,
	height,

	background,
	objects,
	checkpoints,
	exit,

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
