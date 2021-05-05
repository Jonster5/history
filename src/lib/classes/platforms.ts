import grass from '@assets/images/grass1.png';
import dirt from '@assets/images/dirt1.png';
import stone from '@assets/images/stone1.png';
import sand from '@assets/images/sand1.png';
import barrier from '@assets/images/barrier1.png';
import wood from '@assets/images/wood1.png';
import bouncy from '@assets/images/bouncy1.png';
import { Rectangle } from '@api/rectangle';
import { Sprite } from '@api/sprite';
import type { LevelObjectType } from '@utils/levelUtils';

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
				: barrier;

		this.sprites = Array.from(
			{ length: w * h },
			(s, i) =>
				new Sprite(
					[img],
					20,
					20,
					(x + (i % w)) * 20 + 10,
					(y + (i % h)) * 20 + 10
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
}
