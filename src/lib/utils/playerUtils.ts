import type { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import type { Vec } from '@api/vec';

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

	get x() {
		return this.sprite.coords.x;
	}
	get y() {
		return this.sprite.coords.y;
	}
	set x(v: number) {
		this.sprite.coords.x = v;
	}
	set y(v: number) {
		this.sprite.coords.y = v;
	}
	get vx() {
		return this.sprite.v.x;
	}
	get vy() {
		return this.sprite.v.y;
	}
	set vx(v: number) {
		this.sprite.v.x = v;
	}
	set vy(v: number) {
		this.sprite.v.y = v;
	}
	get hw() {
		return this.sprite.halfWidth;
	}
	get hh() {
		return this.sprite.halfHeight;
	}
}
