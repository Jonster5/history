import lvl from '@data/level2';
import { Canvas } from '@api/canvas';
import { Stage } from '@api/stage';
import { GameProperties, GameUtils } from '@utils/gameUtils';
import type Player from './player';

export class Game extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;

	constructor(target: HTMLElement) {
		super();

		this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.update = () => {};

		this.canvas.start();
	}

	kill(): void {}
}
