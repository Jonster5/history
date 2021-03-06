import type {
	DisplayObject,
	DimensionProperties,
	DisplayProperties,
	FrameProperties,
} from './display';
import { Vec } from './vec';

export class Sprite
	implements DisplayProperties, FrameProperties, DimensionProperties {
	frames: HTMLImageElement[];
	frame: number;
	frameShifter: number;

	coords: Vec;
	v: Vec;

	r: number;
	w: number;
	h: number;

	vr: number;
	prevx: number;
	prevy: number;
	prevr: number;

	visible: boolean;
	parent: any;
	children: Set<any>;

	filter: string;
	filterTimeout: number;

	constructor(
		frames: HTMLImageElement[],
		width: number,
		height: number,
		x?: number,
		y?: number
	) {
		this.frames = frames;

		this.frame = 0;
		this.frameShifter = null;

		this.coords = new Vec(x ?? 0, y ?? 0);
		this.v = new Vec(0, 0);

		this.w = width;
		this.h = height;
		this.prevx = x ?? 0;
		this.prevy = x ?? 0;
		this.r = this.rotation ?? 0;
		this.prevr = this.rotation ?? 0;

		this.vr = 0;

		this.visible = true;
		this.children = new Set();

		this.filter = 'blur(100%)';
		this.filterTimeout = null;
	}

	get x(): number {
		return this.coords.x;
	}
	set x(v: number) {
		this.coords.x = v;
	}
	get y(): number {
		return this.coords.y;
	}
	set y(v: number) {
		this.coords.y = v;
	}
	get tx(): number {
		return this.coords.x - this.w / 2;
	}
	set tx(v: number) {
		this.coords.x = v + this.w / 2;
	}
	get ty(): number {
		return this.coords.y - this.h / 2;
	}
	set ty(v: number) {
		this.coords.y = v + this.h / 2;
	}
	get vx(): number {
		return this.v.x;
	}
	set vx(v: number) {
		this.v.x = v;
	}
	get vy(): number {
		return this.v.y;
	}
	set vy(v: number) {
		this.v.y = v;
	}

	get width(): number {
		return this.w;
	}

	set width(v: number) {
		this.w = v;
	}

	get height(): number {
		return this.h;
	}

	set height(v: number) {
		this.h = v;
	}

	get halfWidth(): number {
		return this.w / 2;
	}

	get halfHeight(): number {
		return this.h / 2;
	}

	get gx(): number {
		return (this.parent.gx ?? 0) + this.x;
	}

	get gy(): number {
		return (this.parent.gy ?? 0) + this.y;
	}

	get rotation(): number {
		return this.r;
	}

	set rotation(v: number) {
		this.r = v;
	}

	setX(v: number) {
		this.x = v;
		this.prevx = v;
	}

	setY(v: number) {
		this.y = v;
		this.prevy;
	}

	setR(v: number) {
		this.r = v;
		this.prevr = v;
	}

	add(...sprites: Array<DisplayObject>): void {
		if (sprites.length < 1) return;
		for (let sprite of sprites) {
			if (sprite.parent) sprite.parent.remove(sprite);
			if (sprite.parent === this) continue;
			sprite.parent = this;
			this.children.add(sprite);
		}
	}
	remove(...sprites: Array<DisplayObject>): void {
		if (sprites.length < 1) return;
		for (let sprite of sprites) {
			if (sprite.parent !== this)
				throw new Error('Sprite must already be a child');
			this.children.delete(sprite);
			sprite.parent = null;
		}
	}

	start(delay: number) {
		if (!this.frameShifter)
			this.frameShifter = (setInterval(() => {
				this.frame++;
				if (this.frame >= this.frames.length) this.frame = 0;
			}, delay) as unknown) as number;
	}

	stop() {
		if (this.frameShifter) clearInterval(this.frameShifter);
		this.frameShifter = null;
	}

	setFilter(f?: string, delay?: number) {
		this.filter = f ?? 'blur(100%)';
		if (delay) {
			if (this.frameShifter) clearTimeout(this.frameShifter);
			this.frameShifter = (setTimeout(
				() => this.setFilter(),
				delay
			) as unknown) as number;
		}
	}

	render(
		ctx: CanvasRenderingContext2D,
		lagOffset: number,
		dm: { w: number; h: number }
	): void {
		if (
			!this.visible ||
			this.gx - this.halfWidth > dm.w / 2 ||
			this.gx + this.halfWidth < -dm.w / 2 ||
			this.gy - this.halfHeight > dm.h / 2 ||
			this.gy + this.halfHeight < -dm.h / 2
		)
			return;
		ctx.save();

		const renderX =
			this.prevx !== undefined
				? (this.x - this.prevx) * lagOffset + this.prevx
				: this.x;

		const renderY =
			this.prevy !== undefined
				? (this.y - this.prevy) * lagOffset + this.prevy
				: this.y;

		const renderR =
			this.prevr !== undefined
				? (this.r - this.prevr) * lagOffset + this.prevr
				: this.r;

		ctx.translate(renderX, renderY);
		ctx.rotate(renderR);

		ctx.filter = this.filter;
		try {
			ctx.drawImage(
				this.frames[this.frame],
				-this.halfWidth,
				-this.halfHeight,
				this.width,
				this.height
			);
		} catch {
			ctx.drawImage(
				this.frames[0],
				-this.halfWidth,
				-this.halfHeight,
				this.width,
				this.height
			);
		}

		if (this.children.size > 0)
			for (let child of this.children) child.render(ctx, lagOffset, dm);

		ctx.restore();
	}
}

// export class Text extends displayObject {
// 	constructor(content = '', font = '', ctx) {
// 		super();
// 		this._c = content;
// 		this.font = font;
// 		// this.color = color;
// 		this.ctx = ctx;

// 		this.textBaseline = 'top';
// 		this.strokeText = 'none';

// 		this._w = 0;
// 		this._h = 0;

// 		this.ctx.font = this.font;
// 		this.ctx.strokeStyle = 'none';
// 		this.ctx.lineWidth = 0;
// 		// this.ctx.fillStyle = this.color;

// 		this._w = this.ctx.measureText(this._c).width;
// 		this._h = this.ctx.measureText('M').width;
// 	}
// 	get Width() {
// 		return this._w;
// 	}
// 	get Height() {
// 		return this._h;
// 	}
// 	get halfWidth() {
// 		return this._w / 2;
// 	}
// 	get halfHeight() {
// 		return this._h / 2;
// 	}

// 	get content() {
// 		return this._c;
// 	}
// 	set content(value) {
// 		this.ctx.font = this.font;
// 		this.ctx.strokeStyle = 'none';
// 		this.ctx.lineWidth = 0;
// 		// this.ctx.fillStyle = this.color;

// 		this._w = this.ctx.measureText(this._c).width;
// 		this._h = this.ctx.measureText('M').width;

// 		this._c = value;
// 	}

// 	render(ctx) {
// 		ctx.font = this.font;
// 		ctx.fillStyle = this.color;
// 		ctx.strokeStyle = 'none';
// 		ctx.lineWidth = 0;
// 		ctx.fillStyle = this.color;

// 		ctx.translate(-this.halfWidth, -this.halfHeight);
// 		ctx.fillText(this.content, 0, 0);
// 	}
// }
