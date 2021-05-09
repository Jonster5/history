import { Sprite } from '@api/sprite';
import type { Stage } from '@api/stage';
import { PlayerUtils, PlayerProperties, Alliegance } from '@utils/playerUtils';
import { Vec } from '@api/vec';
import type { Checkpoint } from './checkpoints';
import type Player from './player';
import { Rectangle } from '@api/rectangle';
import type { Bullet } from './bullet';

export default class Ally extends PlayerUtils implements PlayerProperties {
	sprite: Sprite;
	stage: Stage;

	healthbar: Rectangle;

	left: boolean;
	right: boolean;
	jump: boolean;
	shoot: boolean;

	allegiance: Alliegance;
	bulletArr: Bullet[];
	aArr: Ally[];

	imgR: HTMLImageElement[];
	imgL: HTMLImageElement[];
	imgRS: HTMLImageElement;
	imgLS: HTMLImageElement;

	constructor(
		stage: Stage,
		c: { x: number; y: number },
		r: HTMLImageElement[],
		l: HTMLImageElement[],
		rs: HTMLImageElement,
		ls: HTMLImageElement,
		bulletArr: Bullet[],
		aArr: Ally[]
	) {
		super();

		this.stage = stage;

		this.imgR = r;
		this.imgL = l;
		this.imgRS = rs;
		this.imgLS = ls;

		this.allegiance = 'allies';
		this.bulletArr = bulletArr;

		this.sprite = new Sprite(this.imgL, 15, 20, c.x, c.y);
		this.healthbar = new Rectangle(15, 2, 'lime', 'none', 0, -15);

		this.sprite.add(this.healthbar);

		this.stage.add(this.sprite);
	}

	update(player: Player) {
		this.v.add(new Vec(0, 1));

		if (player.x < this.x) {
			this.sprite.frame = 0;
			this.sprite.frames = this.imgL;
		} else {
			this.sprite.frames = this.imgR;
			this.sprite.frame = 0;
		}

		this.vx = Math.abs(this.vx) <= 5 ? this.vx : 5 * Math.sign(this.vx);
		this.vy = Math.abs(this.vy) <= 15 ? this.vy : 15 * Math.sign(this.vy);
	}
	kill() {
		this.sprite.setFilter('brightness(1000%)');
		setTimeout(() => {
			this.aArr.splice(this.aArr.indexOf(this), 1);
			this.stage.remove(this.sprite);
		}, 1000);
	}
}
