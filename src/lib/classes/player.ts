import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties } from '@utils/playerUtils';
import playerimgsrc from '@assets/images/player.png';
import { Vec } from '@api/vec';

export default class extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	constructor(stage: Stage, x: number, y: number) {
		super();

		this.stage = stage;

		const img = new Image(15, 20);
		img.src = playerimgsrc;

		this.sprite = new Sprite([img], 15, 20, x, y);
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
					if (!this.jump) this.v.subtract(new Vec(0, 10));

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

	update() {
		this.v.add(new Vec(0, 1));

		if (this.right) {
			this.v.add(new Vec(1, 0));
		}
		if (this.left) {
			this.v.add(new Vec(-1, 0));
		}

		this.v.x = Math.abs(this.v.x) > 5 ? 5 * Math.sign(this.v.x) : this.v.x;

		this.c.add(this.v);
	}
}
