import grass from '@assets/images/grass1.png';
import dirt from '@assets/images/dirt1.png';
import stone from '@assets/images/stone1.png';
import sand from '@assets/images/sand1.png';
import barrier from '@assets/images/barrier1.png';
import wood from '@assets/images/wood1.png';
import bouncy from '@assets/images/bouncy1.png';
import { Sprite } from '@api/sprite';

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
		type: LevelObjectType,
		collidable?: boolean
	) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.h = h;

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
			{ length: this.w * this.h },
			(s, i) =>
				new Sprite(
					[img],
					20,
					20,
					this.x + (i % this.w),
					this.y + (i % this.h)
				)
		);
	}
}
