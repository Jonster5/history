export type CollisionType = 'top' | 'bottom' | 'right' | 'left' | 'any' | '';

export interface RectHitbox {
	x: number;
	y: number;
	tx: number;
	ty: number;
	halfWidth: number;
	halfHeight: number;
	vx: number;
	vy: number;
}

export function rectangleCollision(
	r1: RectHitbox,
	r2: RectHitbox,
	react?: boolean,
	bounce?: boolean
): CollisionType {
	let collision: CollisionType,
		combinedHalfWidths: number,
		combinedHalfHeights: number,
		overlapX: number,
		overlapY: number,
		vx: number,
		vy: number;

	vx = r1.x - r2.x;
	vy = r1.y - r2.y;

	combinedHalfWidths = r1.halfWidth + r2.halfWidth;
	combinedHalfHeights = r1.halfHeight + r2.halfHeight;

	if (Math.abs(vx) < combinedHalfWidths) {
		if (Math.abs(vy) < combinedHalfHeights) {
			overlapX = combinedHalfWidths - Math.abs(vx);
			overlapY = combinedHalfHeights - Math.abs(vy);

			if (overlapX >= overlapY) {
				if (vy > 0) {
					collision = 'top';
					if (react) r1.ty = r1.ty + overlapY;
				} else {
					collision = 'bottom';
					if (react) r1.ty = r1.ty - overlapY;
				}

				if (react && bounce) {
					if (react) r1.vy *= -1;
				} else {
					if (react) r1.vy = 0;
				}
			} else {
				if (vx > 0) {
					collision = 'left';
					if (react) r1.tx = r1.tx + overlapX;
				} else {
					collision = 'right';
					if (react) r1.tx = r1.tx - overlapX;
				}

				if (bounce) {
					if (react) r1.vx *= -1;
				} else {
					if (react) r1.vx = 0;
				}
			}
		} else {
			collision = '';
		}
	} else {
		collision = '';
	}

	return collision;
}
