import bgSrc from '@assets/bg1.png';

const width = 0,
	height = 0;

const objects = [];

const background = new Image(2000, 1000);
background.src = bgSrc;

export default {
	width,
	height,

	background,
	objects,

	getSize(): number {
		return Math.max(this.width * 20, this.height * 20);
	},

	getDims(): [number, number] {
		return [this.width * 20, this.height * 20];
	},
};
