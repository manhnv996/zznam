var MapConfigs = {};

MapConfigs.Init = {
	width: 32,
	height: 32,
	defaultScale: 0.4,
	padding: {
		top: 100,
		left: 100,
		bottom: 100,
		right: 100
	}
}

MapConfigs.NhaChinh = {
	position: { x: 14, y: 14 },
	blockSizeX: 2,
	blockSizeY: 2
};

MapConfigs.TruckOrder = {
	position: { x: 14, y: 19 }
}

MapConfigs.MailBox = {
	position: { x: 13, y: 31 }
}

MapConfigs.RoadShop = {
	position: { x: 19, y: 30 }
}

MapConfigs.Song = {
	startX: MapConfigs.Init.width + 2,
	startY: 0,
	endX: MapConfigs.Init.width + 8,
	endY: MapConfigs.Init.height,
	color: { r: 52, g: 141, b: 162 },
	harbor: {
		position: { 
			x: MapConfigs.Init.width + 3,
			y: Math.round(MapConfigs.Init.height * 0.75)
		},
		blockSizeX: 2,
		blockSizeY: 2
	},
	riverside1: {
		blockSizeY: 4
	},
	riverside2: {
		blockSizeY: 2
	}
};

MapConfigs.Road = {
	blockSizeX: 2,
	blockSizeY: 4,
	position: {
		y: MapConfigs.Init.height + 3
	}
};

MapConfigs.Road2 = {
	blockSizeY: 2,
	position: {
		x: MapConfigs.NhaChinh.position.x + 2
	},
	startPoint: (MapConfigs.NhaChinh.position.y + MapConfigs.NhaChinh.blockSizeY / 2) / 2,
	joinSegmentOffset: {
		x: 40,
		y: 10
	}
};

MapConfigs.Nui = {
	blockSizeY: 4,
	x: -3
};

MapConfigs.Forest = {
	topLeft: {
		position: {
			x: -9
		},
		overlap: {
			x: 30,
			y: 300
		}
	},
	topRight: {
		position: {
			y: -3
		},
		overlap: {
			x: 30,
			y: 300
		}
	},
	bottomLeft: {
		position: {
			y: MapConfigs.Init.height + 7
		},
		overlap: {
			x: 50,
			y: 200
		}
	},
	bottomRight: {
		position: {
			x: MapConfigs.Init.width + 9
		},
		overlap: {
			x: 50,
			y: 200
		}
	}
};

MapConfigs.DuongRay = {
	blockSizeY: 2,
	position: {
		x: -7
	},
	offset: {
		x: -33,
		y: -13
	}
};
