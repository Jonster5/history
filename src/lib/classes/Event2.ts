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

		// this.canvas = new Canvas(target, 750);
		this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.background = new Sprite([lvl.background], ...lvl.getDims());
		this.background.coords.set(0, 0);

		this.objects = [...lvl.objects];
		this.checkpoints = [...lvl.checkpoints];

		this.stage.add(
			this.background,
			...lvl.getSprites(),
			...lvl.getPoints(),
			...lvl.getCheckpoints()
		);

		this.player = new Player(this.stage, this.checkpoints[0]);

		this.canvas.update = () => {
			if (this.pause) return;
			this.player.update(this.objects, this.checkpoints);

			if (this.player.y > this.stage.halfHeight) {
				this.player.respawn();
			}
		};

		this.canvas.UPS = 30;

		this.canvas.start();

		this.pause = false;
	}

	kill(): void {
		this.canvas.stop();
	}
}
