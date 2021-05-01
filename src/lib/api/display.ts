import type { Rectangle } from './rectangle';
import type { Sprite } from './sprite';
import type { Circle } from './circle';
import type { Stage } from './stage';
import type { Vec } from './vec';

export type DisplayObject = Stage | Rectangle | Sprite | Circle;

export interface DisplayProperties {
	visible: boolean;
	parent: any;
	children: Set<DisplayObject>;
	render(
		ctx: CanvasRenderingContext2D,
		lagOffset: number,
		dm: { w: number; h: number }
	): void;

	add(...sprites: Array<DisplayObject>): void;
	remove(...sprites: Array<DisplayObject>): void;
}

export interface ColorProperties {
	color: string;
	border: { color: string; thickness: number };
}

export interface DimensionProperties {
	coords: Vec;
	v: Vec;

	w: number;
	h: number;

	r: number;
	vr: number;
	prevx: number;
	prevy: number;
	prevr: number;

	x: number;
	y: number;
	vx: number;
	vy: number;
	width: number;
	height: number;
	gx: number;
	gy: number;
	halfWidth: number;
	halfHeight: number;
	rotation: number;

	setX(X: number): void;
	setY(Y: number): void;
	setR(R: number): void;
}

export interface CircularProperties {
	coords: Vec;
	v: Vec;

	r: number;
	ra: number;
	vr: number;
	prevx: number;
	prevy: number;
	prevr: number;

	x: number;
	y: number;
	vx: number;
	vy: number;
	width: number;
	height: number;
	gx: number;
	gy: number;
	halfWidth: number;
	halfHeight: number;
	rotation: number;

	setX(X: number): void;
	setY(Y: number): void;
	setR(R: number): void;
}

export interface FrameProperties {
	frames: HTMLImageElement[];
	frame: number;
	frameShifter: number;

	start(delay: number): void;
	stop(): void;
}
