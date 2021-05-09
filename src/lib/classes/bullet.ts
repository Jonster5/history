import { rectangleCollision } from '@api/collisions';
import { Rectangle } from '@api/rectangle';
import type { Stage } from '@api/stage';
import type { Alliegance } from '@utils/playerUtils';
import type Ally from './ally';
import type Enemy from './enemy';
import type { Platform } from './platforms';
import type Player from './player';

export class Bullet {
	sprite: Rectangle;

	allegiance: Alliegance;

	stage: Stage;

	arr: Bullet[];

	constructor(
		stage: Stage,
		x: number,
		y: number,
		d: 'right' | 'left',
		a: Alliegance,
		ba: Bullet[]
	) {
		this.stage = stage;

		this.arr = ba;

		this.sprite = new Rectangle(6, 1, 'black', 'none', x, y);

		this.stage.add(this.sprite);

		this.allegiance = a;

		if (d === 'left') {
			this.sprite.vx = -15;
		} else {
			this.sprite.vx = 15;
		}
	}

	update(player: Player, objects: Platform[], axis: Enemy[], allies: Ally[]) {
		this.sprite.x += this.sprite.vx;

		if (
			rectangleCollision(player.sprite, this.sprite) &&
			this.allegiance !== player.allegiance
		) {
			player.healthbar.width -= 5;
			player.sprite.setFilter('brightness(500%)');
			setTimeout(() => {
				player.sprite.setFilter();
			}, 500);
		}

		objects.forEach((o) => {
			if (rectangleCollision(this.sprite, o)) {
				try {
					this.stage.remove(this.sprite);
					this.arr.splice(this.arr.indexOf(this), 1);
				} catch {}
			}
		});

		if (this.allegiance === 'allies') {
			axis.forEach((a) => {
				if (rectangleCollision(this.sprite, a.sprite)) {
					a.healthbar.width -= 5;
					if (a.healthbar.width < 0) a.healthbar.width = 0;

					if (a.healthbar.width === 0) {
						a.kill();
					} else {
						a.sprite.setFilter('brightness(500%)');
						setTimeout(() => {
							a.sprite.setFilter();
						}, 500);
					}

					try {
						this.stage.remove(this.sprite);
						this.arr.splice(this.arr.indexOf(this), 1);
					} catch {}
				}
			});
		} else {
			allies.forEach((a) => {
				if (rectangleCollision(this.sprite, a.sprite)) {
					a.healthbar.width -= 5;
					if (a.healthbar.width < 0) a.healthbar.width = 0;

					if (a.healthbar.width === 0) {
						a.kill();
					} else {
						a.sprite.setFilter('brightness(500%)');
						setTimeout(() => {
							a.sprite.setFilter();
						}, 500);
					}

					try {
						this.stage.remove(this.sprite);
						this.arr.splice(this.arr.indexOf(this), 1);
					} catch {}
				}
			});
		}
	}
}
