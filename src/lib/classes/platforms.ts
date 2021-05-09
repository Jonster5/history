import grass from '@assets/images/grass1.png';
import dirt from '@assets/images/dirt1.png';
import stone from '@assets/images/stone1.png';
import sand from '@assets/images/sand1.png';
import barrier from '@assets/images/barrier1.png';
import wood from '@assets/images/wood1.png';
import bouncy from '@assets/images/bouncy1.png';
import steel from '@assets/images/steel1.png';
import { Rectangle } from '@api/rectangle';
import { Sprite } from '@api/sprite';
import type { LevelObjectType } from '@utils/levelUtils';
import type Player from './player';
import { rectangleCollision } from '@api/collisions';
import type Enemy from './enemy';
import type Ally from './ally';

export class Platform {
	tx: number;
	ty: number;
	x: number;
	y: number;
	vx: number;
	vy: number;
	w: number;
	h: number;
	halfWidth: number;
	halfHeight: number;
	sprites: Sprite[];

	type: LevelObjectType;

	points: Rectangle[];

	constructor(
		x: number,
		y: number,
		w: number,
		h: number,

		type: LevelObjectType
	) {
		const img = new Image(20, 20);
		img.src =
			type === 'grass'
				? grass
				: type === 'dirt'
				? dirt
				: type === 'stone'
				? stone
				: type === 'wood'
				? wood
				: type === 'sand'
				? sand
				: type === 'barrier'
				? barrier
				: type === 'bouncy'
				? bouncy
				: type === 'steel'
				? steel
				: barrier;

		this.type = type;

		this.sprites = Array.from(
			{ length: w * h },
			(s, i) =>
				new Sprite(
					[img],
					20,
					20,
					(x + (i % w)) * 20 + 10,
					(y + Math.floor((1 / w) * i)) * 20 + 10
				)
		);

		this.w = w * 20;
		this.h = h * 20;
		this.halfWidth = this.w / 2;
		this.halfHeight = this.h / 2;
		this.tx = x * 20;
		this.ty = y * 20;
		this.x = this.tx + this.halfWidth;
		this.y = this.ty + this.halfHeight;
		this.vx = 0;
		this.vy = 0;

		const xyPoint = new Rectangle(5, 5, 'blue', 'none', this.tx, this.ty);
		const whPoint = new Rectangle(
			5,
			5,
			'yellow',
			'none',
			this.tx + this.w,
			this.ty + this.h
		);
		const midPoint = new Rectangle(5, 5, 'lime', 'none', this.x, this.y);

		this.points = [xyPoint, whPoint, midPoint];
	}
	update(player: Player, axis: Enemy[], allies: Ally[]) {
		const c = rectangleCollision(player.sprite, this, true);
		switch (this.type) {
			case 'grass':
			case 'sand':
			case 'wood':
			case 'steel':
			case 'dirt':
				if (c && c !== 'top') {
					player.v.multiply(0.4);
					if (player.jump) {
						player.sprite.stop();
						player.v.multiply(0.2);
					}
					player.jump = false;
					player.sprite.frame = 0;
					player.sprite.stop();
					if (player.right && !player.left) {
						player.sprite.frames = player.imgR;
						player.sprite.start(100);
					}
					if (player.left && !player.right) {
						player.sprite.frames = player.imgL;
						player.sprite.start(100);
					}
				}
				break;
			case 'stone':
				if (c && (c === 'right' || c === 'left')) {
					player.sprite.frame = 0;
				} else if (c && (c === 'top' || c === 'bottom')) {
					if (player.jump) {
						player.sprite.stop();
						player.v.multiply(0.2);
					}
					player.jump = false;
					player.v.multiply(0.4);
					if (player.right && !player.left) {
						player.sprite.frames = player.imgR;
						player.sprite.start(100);
					}
					if (player.left && !player.right) {
						player.sprite.frames = player.imgL;
						player.sprite.start(100);
					}
				}
				break;
			case 'barrier':
				break;
			case 'bouncy':
				if (c) {
					player.jump = true;
					player.sprite.frame = 0;
					player.sprite.stop();
					if (player.vx > 0) {
						player.sprite.frames = player.imgR;
						player.sprite.start(100);
					} else {
						player.sprite.frames = player.imgL;
						player.sprite.start(100);
					}
					player.v.multiply(0.4).subtract(0, 40);
				}
		}

		axis.forEach((a) => {
			const c = rectangleCollision(a.sprite, this, true);
			switch (this.type) {
				case 'grass':
				case 'sand':
				case 'wood':
				case 'steel':
				case 'dirt':
					if (c && c !== 'top') {
						a.v.multiply(0.4);

						if (a.right && !a.left) {
							a.sprite.frames = a.imgR;
						}
						if (a.left && !a.right) {
							a.sprite.frames = a.imgL;
						}
					}
					break;
				case 'stone':
					if (c && (c === 'right' || c === 'left')) {
						a.sprite.frame = 0;
					} else if (c && (c === 'top' || c === 'bottom')) {
						a.v.multiply(0.4);
						if (a.right && !a.left) {
							a.sprite.frames = a.imgR;
						}
						if (a.left && !a.right) {
							a.sprite.frames = a.imgL;
						}
					}
					break;
				case 'barrier':
					break;
				case 'bouncy':
					if (c) {
						a.jump = true;
						if (a.vx > 0) {
							a.sprite.frames = a.imgR;
						} else {
							a.sprite.frames = a.imgL;
						}
						a.v.multiply(0.4).subtract(0, 40);
					}
					break;
			}
		});
	}
}
