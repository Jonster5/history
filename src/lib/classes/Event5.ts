import lvl from '@data/level5';
import { Canvas } from '@api/canvas';
import { Stage } from '@api/stage';
import { GameProperties, GameUtils } from '@utils/gameUtils';
import { Sprite } from '@api/sprite';
import Player from './player';
import type { Checkpoint } from './checkpoints';
import type { Platform } from './platforms';
import { writable, Writable } from 'svelte/store';
import Enemy from './enemy';
import type Ally from './ally';
import type { Bullet } from './bullet';

export default class extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;
	background: Sprite;

	objects: Platform[];
	checkpoints: Checkpoint[];
	pause: boolean;

	enemies: Enemy[];
	allies: Ally[];

	bullets: Bullet[];

	gameOver: Writable<boolean>;

	constructor(target: HTMLElement) {
		super();

		this.canvas = new Canvas(target, 600);
		// this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.background = new Sprite([lvl.background], ...lvl.getDims());
		this.background.coords.set(0, 0);

		this.objects = [...lvl.objects];
		this.checkpoints = [...lvl.checkpoints];
		this.bullets = [];

		this.gameOver = writable(false);

		this.stage.add(
			this.background,
			...lvl.getSprites(),
			...lvl.getCheckpoints()
		);

		this.allies = [];
		this.bullets = [];
		this.enemies = [];

		this.player = new Player(
			this.stage,
			{ x: -29 * 20 + 10, y: 18 * 20 + 10 },
			lvl.pImgRight,
			lvl.pImgLeft,
			lvl.pImgJumpRight,
			lvl.pImgJumpLeft,
			lvl.pImgShootRight,
			lvl.pImgShootLeft,
			lvl.checkpoints[0],
			this.bullets
		);

		this.enemies.push(
			new Enemy(
				this.stage,
				{ x: 32 * 20 + 10, y: 2 * 20 + 10 },
				lvl.eImgRight,
				lvl.eImgLeft,
				lvl.eImgShootRight,
				lvl.eImgShootLeft,
				this.bullets,
				this.enemies
			)
		);

		this.canvas.update = () => {
			if (this.pause) return;
			if (this.enemies.length < 1)
				setTimeout(() => this.gameOver.set(true), 1000);
			this.player.update(this.checkpoints);

			this.objects.forEach((o) =>
				o.update(this.player, this.enemies, this.allies)
			);

			this.enemies.forEach((e) => e.update(this.player));
			this.allies.forEach((a) => a.update(this.player));

			if (this.player.y > this.stage.halfHeight) {
				this.player.respawn(this.stage);
			}

			this.bullets.forEach((b) => {
				b.update(this.player, this.objects, this.enemies, this.allies);
			});

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

		window.addEventListener('keydown', (e) => {
			if (e.key === 'v') {
				this.player.checkpoint = this.checkpoints[
					this.checkpoints.length - 1
				];
				this.player.respawn(this.stage);
			} else if (e.key === '1') {
				this.stage.add(...lvl.getPoints());
			} else if (e.key === '2') {
				this.stage.remove(...lvl.getPoints());
			} else if (e.key === '3') {
				this.canvas.size(lvl.getSize());
			} else if (e.key === '4') {
				this.canvas.size(600);
			} else if (e.key === '5') {
				this.player.sprite.setFilter('brightness(500%)');
				setTimeout(() => {
					this.player.sprite.setFilter();
				}, 200);
			}
		});

		this.canvas.UPS = 30;

		this.canvas.start();

		this.pause = false;
	}

	kill(): void {
		this.canvas.stop();
	}
}
