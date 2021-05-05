import grass from '@assets/images/grass1.png';
import dirt from '@assets/images/dirt1.png';
import stone from '@assets/images/stone1.png';
import sand from '@assets/images/sand1.png';
import barrier from '@assets/images/barrier1.png';
import wood from '@assets/images/wood1.png';
import bouncy from '@assets/images/bouncy1.png';
import { Sprite } from '@api/sprite';
import type Player from '@classes/player';
import { Vec } from '@api/vec';

export type LevelObjectType =
	| 'grass'
	| 'dirt'
	| 'stone'
	| 'sand'
	| 'wood'
	| 'barrier'
	| 'bouncy';

export class Platform {
	x: number;
	y: number;
	w: number;
	h: number;
	sprites: Sprite[];

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
				: barrier;

		this.sprites = Array.from(
			{ length: w * h },
			(s, i) =>
				new Sprite(
					[img],
					20,
					20,
					(x + (i % w)) * 20 - 10,
					(y + (i % h)) * 20 - 10
				)
		);

		this.x = x * 20 - 10;
		this.y = y * 20 - 10;
		this.w = w * 20;
		this.h = h * 20;
	}
	checkCollision(p: Player) {
		if (p.x + p.hw > this.x && p.x - p.hw < this.x + this.w) {
			if (p.y + p.hh > this.y && p.y - p.hh < this.y + this.h) {
				p.v.y = 0;
				p.y = this.y - p.hh - 10;
				p.v.x * 0.9;
				p.jump = false;
			}
		} else {
		}
	}
}
