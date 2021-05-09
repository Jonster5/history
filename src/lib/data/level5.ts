import r1 from '@assets/images/american-right1.png';
import rjump from '@assets/images/american-right-jump.png';
import l1 from '@assets/images/american-left1.png';
import ljump from '@assets/images/american-left-jump.png';
import r from '@assets/images/GS Static Pose.png';
import l from '@assets/images/GS Static Pose Left.png';
import rs from '@assets/images/GS shooting.png';
import ls from '@assets/images/GS shooting left.png';
import type { Rectangle } from '@api/rectangle';
import type { Sprite } from '@api/sprite';
import bgSrc from '@assets/images/bg2.png';
import data from './dday.json';
import { Checkpoint } from '@classes/checkpoints';
import { Platform } from '@classes/platforms';
import { Objective } from '@classes/objective';

const width = 100,
	height = 50;

const objects = [
	new Platform(-30, 19, 7, 1, 'steel'),
	new Platform(-30, 13, 1, 6, 'steel'),
	new Platform(-30, 7, 1, 6, 'barrier'),
	new Platform(-26, 20, 10, 1, 'sand'),
	new Platform(-17, 19, 7, 1, 'sand'),
	new Platform(-17, 19, 7, 1, 'sand'),
	new Platform(-12, 18, 10, 1, 'sand'),

	new Platform(-7, 17, 2, 1, 'steel'),
	new Platform(-8, 15, 1, 2, 'steel'),
	new Platform(-9, 15, 1, 1, 'steel'),

	new Platform(-3, 17, 6, 1, 'sand'),

	new Platform(0, 16, 2, 1, 'steel'),
	new Platform(-2, 15, 2, 1, 'steel'),
	new Platform(-1, 14, 1, 1, 'steel'),

	new Platform(2, 16, 3, 1, 'sand'),
	new Platform(4, 15, 3, 1, 'sand'),
	new Platform(6, 14, 6, 1, 'sand'),
	new Platform(10, 13, 4, 1, 'sand'),
	new Platform(13, 12, 3, 1, 'sand'),
	new Platform(16, 12, 3, 1, 'stone'),
	new Platform(18, 11, 3, 1, 'stone'),
	new Platform(20, 10, 2, 1, 'stone'),
	new Platform(21, 9, 5, 1, 'stone'),
	new Platform(25, 8, 3, 1, 'stone'),

	new Platform(22, 8, 1, 1, 'bouncy'),

	new Platform(26, 4, 1, 4, 'barrier'),
	new Platform(26, 3, 9, 1, 'steel'),
	new Platform(35, 3, 2, 1, 'stone'),
	new Platform(36, 2, 2, 1, 'stone'),

	new Platform(37, -4, 1, 6, 'barrier'),
];

const checkpoints = [new Checkpoint(-25, 18, '')];

const pImgRight = [r1].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgLeft = [l1].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const pImgJumpRight = new Image(15, 20);
pImgJumpRight.src = rjump;

const pImgJumpLeft = new Image(15, 20);
pImgJumpLeft.src = ljump;

const eImgRight = [r].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const eImgLeft = [l].map((x) => {
	const l = new Image(15, 20);
	l.src = x;
	return l;
});

const eImgShootRight = new Image(15, 20);
eImgShootRight.src = rs;

const eImgShootLeft = new Image(15, 20);
eImgShootLeft.src = ls;

const background = new Image(2000, 1000);
background.src = bgSrc;
2;

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

	eImgLeft,
	eImgRight,
	eImgShootLeft,
	eImgShootRight,

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
