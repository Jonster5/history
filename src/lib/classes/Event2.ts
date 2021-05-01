import lvl from '@data/level2';
import { Canvas } from '@api/canvas';
import { Stage } from '@api/stage';
import { GameProperties, GameUtils } from '@utils/gameUtils';
import type Player from './player';
import type { Platform } from '@utils/levelUtils';

export default class extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;

	objects: Platform[];

	constructor(target: HTMLElement) {
		super();

		this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.canvas.update = () => {};

		this.canvas.start();
	}

	kill(): void {}
}
