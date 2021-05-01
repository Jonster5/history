import type { Sprite } from '@api/sprite';

export interface MapProperties {
	readonly width: number;
	readonly height: number;

	bg: Sprite;
}

export abstract class MapUtils {}
