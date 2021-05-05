import lvl from '@data/level2';
import { Canvas } from '@api/canvas';
import { Stage } from '@api/stage';
import { GameProperties, GameUtils } from '@utils/gameUtils';
import type { Platform } from '@utils/levelUtils';
import { Sprite } from '@api/sprite';
import { Rectangle } from '@api/rectangle';
import Player from './player';
import { Vec } from '@api/vec';

export default class extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;
	background: Sprite;

	objects: Platform[];

	constructor(target: HTMLElement) {
		super();

		// this.canvas = new Canvas(target, 750);
		this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.background = new Sprite([lvl.background], ...lvl.getDims());
		this.background.coords.set(0, 0);

		this.objects = [...lvl.objects];

		this.stage.add(this.background, ...lvl.getSprites());

		this.player = new Player(this.stage, -45 * 20 - 10, 18 * 20 - 10);

		this.canvas.update = () => {
			this.player.update();
			this.objects.forEach((o) => o.checkCollision(this.player));
		};

		this.canvas.start();
	}

	kill(): void {
		this.canvas.stop();
	}
}
