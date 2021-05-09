import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties, Alliegance } from '@utils/playerUtils';
import { Vec } from '@api/vec';
import { rectangleCollision, RectHitbox } from '@api/collisions';
import type { Checkpoint } from './checkpoints';
import type { Platform } from './platforms';
import { writable, Writable } from 'svelte/store';
import { Rectangle } from '@api/rectangle';
import { Bullet } from './bullet';

export default class Player extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;
	healthbar: Rectangle;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	checkpoint: Checkpoint;

	text: Writable<string>;

	imgR: HTMLImageElement[];
	imgL: HTMLImageElement[];
	imgJR: HTMLImageElement;
	imgJL: HTMLImageElement;
	imgSR: HTMLImageElement;
	imgSL: HTMLImageElement;

	allegiance: Alliegance;
	bulletArr: Bullet[];

	constructor(
		stage: Stage,
		c: { x: number; y: number },
		r: HTMLImageElement[],
		l: HTMLImageElement[],
		jr: HTMLImageElement,
		jl: HTMLImageElement,
		sr: HTMLImageElement,
		sl: HTMLImageElement,
		cp: Checkpoint,
		bulletArr: Bullet[]
	) {
		super();

		this.stage = stage;

		this.imgR = r;
		this.imgL = l;
		this.imgJR = jr;
		this.imgJL = jl;
		this.imgSR = sr;
		this.imgSL = sl;

		this.checkpoint = cp;
		this.checkpoint.sprite.color = '#faef7d';
		this.text = writable('');

		this.sprite = new Sprite(this.imgR, 15, 20, c.x, c.y);
		this.healthbar = new Rectangle(15, 2, 'lime', 'none', 0, -15);

		this.sprite.add(this.healthbar);
		this.stage.add(this.sprite);

		this.allegiance = 'allies';
		this.bulletArr = bulletArr;

		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'a':
				case 'ArrowLeft':
					this.left = true;
					this.sprite.frames = this.imgL;
					this.sprite.start(100);
					break;
				case 'd':
				case 'ArrowRight':
					this.right = true;
					this.sprite.frames = this.imgR;
					this.sprite.start(100);
					break;
				case 'w':
				case 'ArrowUp':
					if (!this.jump) {
						this.sprite.stop();
						this.sprite.frame = 0;
						this.v.subtract(new Vec(0, 10));
					}

					this.jump = true;
					if (this.vx > 0) this.sprite.frames = [this.imgJR];
					else this.sprite.frames = [this.imgJL];
					break;
				case ' ':
					if (!this.shoot) {
						if (this.sprite.frames === this.imgR) {
							this.sprite.frames = [this.imgSR];
							this.bulletArr.push(
								new Bullet(
									this.stage,
									this.x,
									this.y,
									'right',
									'allies',
									this.bulletArr
								)
							);
						} else if (this.sprite.frames === this.imgL) {
							this.sprite.frames = [this.imgSL];
							this.bulletArr.push(
								new Bullet(
									this.stage,
									this.x,
									this.y,
									'left',
									'allies',
									this.bulletArr
								)
							);
						}
					}
					this.shoot = true;
					break;
			}
		});

		window.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'a':
				case 'ArrowLeft':
					this.left = false;
					this.sprite.stop();
					break;
				case 'd':
				case 'ArrowRight':
					this.right = false;
					this.sprite.stop();
					break;
				case ' ':
					this.shoot = false;
					break;
			}
		});
	}

	update(checkpoints: Checkpoint[]) {
		this.v.add(new Vec(0, 1));

		if (this.right) {
			this.v.add(new Vec(2, 0));
		}
		if (this.left) {
			this.v.add(new Vec(-2, 0));
		}

		this.vx = Math.abs(this.vx) <= 5 ? this.vx : 5 * Math.sign(this.vx);
		this.vy = Math.abs(this.vy) <= 15 ? this.vy : 15 * Math.sign(this.vy);

		this.c.add(this.v);

		let L = false;

		checkpoints.forEach((c) => {
			if (
				rectangleCollision(
					this.sprite as RectHitbox,
					c.sprite as RectHitbox,
					false
				)
			) {
				this.text.set(c.text);
				L = true;
				if (c !== this.checkpoint) {
					this.checkpoint.sprite.color = '#faef7daa';
					this.checkpoint = c;
					this.checkpoint.sprite.color = '#faef7d';
				}
			}
		});

		if (!L) this.text.set(null);
	}
	respawn(stage: Stage) {
		this.sprite.setX(this.checkpoint.x);
		this.sprite.setY(this.checkpoint.y);
		this.stage.setX(-this.x);
		this.stage.setY(-this.y);
		this.v.set(0, 0);

		this.sprite.setFilter('brightness(500%)');
		setTimeout(() => {
			this.sprite.setFilter();
		}, 500);
	}
}
