import lvl from '@data/level2';
import { Canvas } from '@api/canvas';
import { Stage } from '@api/stage';
import { GameProperties, GameUtils } from '@utils/gameUtils';
import { Sprite } from '@api/sprite';
import { Rectangle } from '@api/rectangle';
import Player from './player';
import { Vec } from '@api/vec';
import type { Checkpoint } from './checkpoints';
import type { Platform } from './platforms';

export default class extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;
	background: Sprite;

	objects: Platform[];
	checkpoints: Checkpoint[];
	pause: boolean;

	constructor(target: HTMLElement) {
		super();

		this.canvas = new Canvas(target, 2000);
		// this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.background = new Sprite([lvl.background], ...lvl.getDims());
		this.background.coords.set(0, 0);

		this.objects = [...lvl.objects];
		this.checkpoints = [...lvl.checkpoints];

		this.stage.add(
			this.background,
			...lvl.getSprites(),
			// ...lvl.getPoints(),
			...lvl.getCheckpoints()
		);

		this.player = new Player(
			this.stage,
			this.checkpoints[0],
			lvl.pImgRight,
			lvl.pImgLeft,
			lvl.pImgJumpRight,
			lvl.pImgJumpLeft
		);

		this.canvas.update = () => {
			if (this.pause) return;
			this.player.update(this.checkpoints);

			this.objects.forEach((o) => o.update(this.player));

			if (this.player.y > this.stage.halfHeight) {
				this.player.respawn();
			}

			this.stage.x = -this.player.x;
			this.stage.y = -this.player.y;

			const w = this.stage.width;
			const h = this.stage.height;
			const c = this.canvas.width;
			const r = this.canvas.ar;

			const xOffset = (w - c) / 2;
			const yOffset = (h * r - c) / (2 * r);

			if (Math.abs(this.stage.x) > xOffset)
				this.stage.setX(xOffset * Math.sign(this.stage.x));
			if (Math.abs(this.stage.y) > yOffset)
				this.stage.setY(yOffset * Math.sign(this.stage.y));
		};

		this.canvas.UPS = 30;

		this.canvas.start();

		this.pause = false;
	}

	kill(): void {
		this.canvas.stop();
	}
}
