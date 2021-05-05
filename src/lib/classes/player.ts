import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties } from '@utils/playerUtils';
import playerimgsrc from '@assets/images/player.png';
import { Vec } from '@api/vec';
import { rectangleCollision, RectHitbox } from '@api/collisions';
import type { Checkpoint } from './checkpoints';
import type { Platform } from './platforms';

export default class extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	checkpoint: Checkpoint;

	constructor(stage: Stage, c: Checkpoint) {
		super();

		this.stage = stage;

		const img = new Image(15, 20);
		img.src = playerimgsrc;

		this.checkpoint = c;

		this.sprite = new Sprite(
			[img],
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
					break;
				case 'd':
				case 'ArrowRight':
					this.right = true;
					break;
				case 'w':
				case 'ArrowUp':
					if (!this.jump) this.v.subtract(new Vec(0, 12));

					this.jump = true;
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

	update(objects: Platform[], checkpoints: Checkpoint[]) {
		this.v.add(new Vec(0, 1));

		if (this.right) {
			this.v.add(new Vec(2, 0));
		}
		if (this.left) {
			this.v.add(new Vec(-2, 0));
		}

		this.vx = Math.abs(this.v.x) > 5 ? 5 * Math.sign(this.v.x) : this.v.x;

		this.c.add(this.v);

		objects.forEach((o) => {
			switch (
				rectangleCollision(
					this.sprite as RectHitbox,
					o as RectHitbox,
					true
				)
			) {
				case 'bottom':
				case 'right':
				case 'left':
				case 'any':
					this.jump = false;
					this.v.multiply(0.5);
			}
		});

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
