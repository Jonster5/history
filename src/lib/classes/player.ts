import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties } from '@utils/playerUtils';
import type { Game } from './Event1';

export default class extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	constructor(stage: Stage, x: number, y: number) {
		super();

		this.stage = stage;

		this.sprite = new Sprite([], 15, 20, x, y);
		this.stage.add(this.sprite);
	}
}
