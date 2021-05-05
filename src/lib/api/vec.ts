export class Point {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}
}

export class Vec {
	x: number;
	y: number;

	constructor(x: number, y: number) {
		this.x = x;
		this.y = y;
	}

	clone(): Vec {
		return new Vec(this.x, this.y);
	}

	print(): Vec {
		console.info(this.x, this.y);
		return this;
	}

	set(x: Vec | number, y?: number): this {
		if (typeof x === 'number') {
			if (y) {
				this.x = x;
				this.y = y;
			} else {
				this.x = x;
				this.y = x;
			}
		} else if (x instanceof Vec) {
			this.x = x.x;
			this.y = x.y;
		}
		return this;
	}

	add(x: Vec | number, y?: number): this {
		if (typeof x === 'number') {
			if (y) {
				this.x += x;
				this.y += y;
			} else {
				this.x += x;
				this.y += x;
			}
		} else if (x instanceof Vec) {
			this.x += x.x;
			this.y += x.y;
		}
		return this;
	}

	subtract(x: Vec | number, y?: number): this {
		if (typeof x === 'number') {
			if (y) {
				this.x -= x;
				this.y -= y;
			} else {
				this.x -= x;
				this.y -= x;
			}
		} else if (x instanceof Vec) {
			this.x -= x.x;
			this.y -= x.y;
		}
		return this;
	}

	multiply(x: Vec | number, y?: number): this {
		if (typeof x === 'number') {
			if (y) {
				this.x *= x;
				this.y *= y;
			} else {
				this.x *= x;
				this.y *= x;
			}
		} else if (x instanceof Vec) {
			this.x *= x.x;
			this.y *= x.y;
		}
		return this;
	}

	divide(x: Vec | number, y?: number): this {
		if (typeof x === 'number') {
			if (y) {
				this.x += x;
				this.y += y;
			} else {
				this.x += x;
				this.y += x;
			}
		} else if (x instanceof Vec) {
			this.x /= x.x;
			this.y /= x.y;
		}
		return this;
	}

	normalize(): this {
		return this.divide(this.magnitude);
	}

	get magnitude(): number {
		return Math.hypot(this.x, this.y);
	}

	get angle(): number {
		return Math.atan2(this.y, this.x);
	}
}
