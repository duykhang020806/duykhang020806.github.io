var Game = {
	firstRun: true,
	playerScore: 0,
	aiScore: 0,
	scoreToWin: 3,
};

Game.Boot = function(game) {
	
};

Game.Boot.prototype = {
	init: function() {
		this.input.maxPointers = 1;
		this.stage.disableVisibilityChange = true;
		
		this.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
	},
	preload: function() {
		this.load.image('preloaderFrame', 'image/preloaderframe.png');
		this.load.image('preloaderBar', 'image/preloaderbar.png');
	},
	create: function() {
		this.state.start('Preloader');
	},
};