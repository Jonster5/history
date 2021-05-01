import type { Canvas } from '@api/canvas';
import type { Stage } from '@api/stage';
import type Player from '@classes/player';

export interface GameProperties {
	canvas: Canvas;
	stage: Stage;

	player: Player;

	kill(): void;
}

export abstract class GameUtils {}
