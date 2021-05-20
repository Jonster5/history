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
import { rectangleCollision } from '@api/collisions';
import type { Objective } from './objective';
import type { SaveData } from '@data/data';
import { writable, Writable } from 'svelte/store';
import type { Bullet } from './bullet';
import type Enemy from './enemy';
import type Ally from './ally';

export default class extends GameUtils implements GameProperties {
	canvas: Canvas;
	stage: Stage;
	player: Player;
	background: Sprite;

	objects: Platform[];
	checkpoints: Checkpoint[];
	pause: boolean;
	objective: Objective;
	enemies: Enemy[];
	allies: Ally[];

    timeW: Writable<number>;
    time: number;
    timeU: () => void;

	bullets: Bullet[];

	gameOver: Writable<boolean>;

	constructor(target: HTMLElement, timer: Writable<number>) {
		super();

		this.canvas = new Canvas(target, 600);
		// this.canvas = new Canvas(target, lvl.getSize());
		this.stage = new Stage(...lvl.getDims());

		this.canvas.add(this.stage);

		this.background = new Sprite([lvl.background], ...lvl.getDims());
        this.background.coords.set(0, 0);
        
        this.time = 0;
        this.timeW = timer;
        this.timeU = this.timeW.subscribe((v) => this.time = v);

		this.objects = [...lvl.objects];
		this.checkpoints = [...lvl.checkpoints];
		this.objective = lvl.exit;

		this.gameOver = writable(false);

		this.stage.add(
			this.background,
			...lvl.getSprites(),
			...lvl.getCheckpoints(),
			this.objective.sprite
		);

		this.bullets = [];
		this.enemies = [];
		this.allies = [];

		this.player = new Player(
			this.stage,
			{ x: -48 * 20 + 10, y: 19 * 20 + 10 },
			lvl.pImgRight,
			lvl.pImgLeft,
			lvl.pImgJumpRight,
			lvl.pImgJumpLeft,
			lvl.pImgJumpRight,
			lvl.pImgJumpLeft,
			lvl.checkpoints[0],
			this.bullets
		);

		this.canvas.update = () => {
			if (this.pause) return;
			this.player.update(this.checkpoints);

			this.objects.forEach((o) =>
				o.update(this.player, this.enemies, this.allies)
			);

			if (
				rectangleCollision(
					this.player.sprite,
					this.objective.sprite,
					false
				)
			) {
				const c: SaveData = JSON.parse(localStorage.getItem('game'));

				c.e2 = true;

				localStorage.setItem('game', JSON.stringify(c));
				this.gameOver.set(true);
			}
			this.bullets.forEach((b) => {
				b.update(this.player, this.objects, this.enemies, this.allies);
			});

			if (this.player.y > this.stage.halfHeight) {
				this.player.respawn(this.stage);
				this.player.sprite.setFilter('brightness(500%)');
				setTimeout(() => {
					this.player.sprite.setFilter();
				}, 200);
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

		window.addEventListener('keydown', (e) => {
			if (e.key === '1') {
				this.canvas.size(lvl.getSize());
			} else if (e.key === '2') {
				this.canvas.size(600);
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
