import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties, Alliegance } from '@utils/playerUtils';
import { Vec } from '@api/vec';
import type { Checkpoint } from './checkpoints';
import type Player from './player';
import { Rectangle } from '@api/rectangle';
import { Bullet } from './bullet';

export default class Enemy extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	healthbar: Rectangle;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	allegiance: Alliegance;
	bulletArr: Bullet[];
	eArr: Enemy[];

	imgR: HTMLImageElement[];
	imgL: HTMLImageElement[];
	imgRS: HTMLImageElement;
	imgLS: HTMLImageElement;

	constructor(
		stage: Stage,
		c: { x: number; y: number },
		r: HTMLImageElement[],
		l: HTMLImageElement[],
		rs: HTMLImageElement,
		ls: HTMLImageElement,
		bulletArr: Bullet[],
		eArr: Enemy[]
	) {
		super();

		this.stage = stage;

		this.imgR = r;
		this.imgL = l;
		this.imgRS = rs;
		this.imgLS = ls;

		this.allegiance = 'axis';
		this.bulletArr = bulletArr;
		this.eArr = eArr;

		this.sprite = new Sprite(this.imgL, 15, 20, c.x, c.y);
		this.healthbar = new Rectangle(15, 2, 'red', 'none', 0, -15);

		this.sprite.add(this.healthbar);

		this.stage.add(this.sprite);
	}

	update(player: Player) {
		if (this.healthbar.width === 0) return;
		if (this.sprite.filter !== 'blur(100%)') return;

		this.v.add(new Vec(0, 1));

		const dx = this.x - player.x;
		const dy = this.y - player.y;

		if (Math.abs(dy) <= 10) {
			if (dx < 0) {
				if (Math.abs(dx) < 4 * 20) {
					this.sprite.frames = this.imgL;

					this.vx += -2;
				} else if (Math.abs(dx) > 6 * 20) {
					this.sprite.frames = this.imgR;

					this.vx += 2;
				} else {
					if (!this.shoot) {
						this.shoot = true;
						this.sprite.frames = [this.imgRS];

						this.bulletArr.push(
							new Bullet(
								this.stage,
								this.x,
								this.y,
								'right',
								'axis',
								this.bulletArr
							)
						);
						setTimeout(() => (this.shoot = false), 500);
					}
				}
			} else {
				if (Math.abs(dx) < 4 * 20) {
					this.sprite.frames = this.imgR;

					this.vx -= -2;
				} else if (Math.abs(dx) > 6 * 20) {
					this.sprite.frames = this.imgL;

					this.vx -= 2;
				} else {
					if (!this.shoot) {
						this.shoot = true;
						this.sprite.frames = [this.imgLS];

						this.bulletArr.push(
							new Bullet(
								this.stage,
								this.x,
								this.y,
								'left',
								'axis',
								this.bulletArr
							)
						);
						setTimeout(() => (this.shoot = false), 500);
					}
				}
			}
		}

		if (this.right) {
			this.v.add(new Vec(2, 0));
		}
		if (this.left) {
			this.v.add(new Vec(-2, 0));
		}

		this.vx = Math.abs(this.vx) <= 5 ? this.vx : 5 * Math.sign(this.vx);
		this.vy = Math.abs(this.vy) <= 15 ? this.vy : 15 * Math.sign(this.vy);

		this.c.add(this.v);
	}
	kill() {
		this.sprite.setFilter('brightness(1000%)');
		setTimeout(() => {
			this.eArr.splice(this.eArr.indexOf(this), 1);
			this.stage.remove(this.sprite);
		}, 1000);
	}
}
