import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties } from '@utils/playerUtils';
import { Vec } from '@api/vec';
import { rectangleCollision, RectHitbox } from '@api/collisions';
import type { Checkpoint } from './checkpoints';
import type { Platform } from './platforms';

export default class Player extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	checkpoint: Checkpoint;

	imgR: HTMLImageElement[];
	imgL: HTMLImageElement[];
	imgJR: HTMLImageElement;
	imgJL: HTMLImageElement;

	constructor(
		stage: Stage,
		c: Checkpoint,
		r: HTMLImageElement[],
		l: HTMLImageElement[],
		jr: HTMLImageElement,
		jl: HTMLImageElement
	) {
		super();

		this.stage = stage;

		this.imgR = r;
		this.imgL = l;
		this.imgJR = jr;
		this.imgJL = jl;

		console.log(this.imgR);
		console.log(this.imgL);
		console.log(this.imgJR);
		console.log(this.imgJL);

		this.checkpoint = c;

		this.sprite = new Sprite(
			this.imgR,
			15,
			20,
			this.checkpoint.x,
			this.checkpoint.y
		);
		this.stage.add(this.sprite);

		window.addEventListener('keydown', (e) => {
			switch (e.key) {
				case 'a':
				case 'ArrowLeft':
					this.left = true;
					this.sprite.frames = this.imgL;
					break;
				case 'd':
				case 'ArrowRight':
					this.right = true;
					this.sprite.frames = this.imgR;
					break;
				case 'w':
				case 'ArrowUp':
					if (!this.jump) this.v.subtract(new Vec(0, 10));

					this.jump = true;
					if (this.vx > 0) this.sprite.frames = [this.imgJR];
					else this.sprite.frames = [this.imgJL];
					break;
				case ' ':
					this.shoot = true;
					break;
			}
		});

		window.addEventListener('keyup', (e) => {
			switch (e.key) {
				case 'a':
				case 'ArrowLeft':
					this.left = false;
					break;
				case 'd':
				case 'ArrowRight':
					this.right = false;
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

		checkpoints.forEach((c) => {
			if (
				rectangleCollision(
					this.sprite as RectHitbox,
					c.sprite as RectHitbox,
					false
				)
			) {
				this.checkpoint.sprite.color = '#faef7daa';
				this.checkpoint = c;
				this.checkpoint.sprite.color = '#faef7d';
			}
		});
	}
	respawn() {
		this.sprite.setX(this.checkpoint.x);
		this.sprite.setY(this.checkpoint.y);
		this.v.set(0, 0);
	}
}
