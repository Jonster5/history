import type { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import type { Vec } from '@api/vec';
import type { Game } from '@classes/Event1';

export interface PlayerProperties {
	sprite: Sprite;
	stage: Stage;
}

export class PlayerUtils {
	sprite: Sprite;

	get c(): Vec {
		return this.sprite.coords;
	}
	get v(): Vec {
		return this.sprite.v;
	}
}
