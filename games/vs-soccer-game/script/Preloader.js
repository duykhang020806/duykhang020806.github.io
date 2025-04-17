Game.Preloader = function(game) {
	
};

Game.Preloader.prototype = {
	preload: function() {
		this.preloadbar = this.add.sprite(this.world.centerX - 70, this.world.centerY - 10, 'preloaderBar');
		
		this.add.sprite(this.world.centerX, this.world.centerY, 'preloaderFrame').anchor.setTo(0.5, 0.5);
		
		this.load.setPreloadSprite(this.preloadbar);
		
		this.load.image('field', 'image/field.png');
		this.load.image('player', 'image/player.png');
		this.load.image('ai', 'image/ai.png');
		this.load.image('ball', 'image/ball.png');
		this.load.image('wallbig', 'image/wallbig.png');
		this.load.image('wallsmall', 'image/wallsmall.png');
		this.load.image('scoreboard', 'image/scoreboard.png');
		this.load.image('goaleebattle', 'image/goaleebattle.png');
		this.load.image('continue', 'image/continue.png');
		this.load.image('play', 'image/play.png');
		this.load.image('serve', 'image/serve.png');
		this.load.image('getready', 'image/getready.png');
		this.load.image('playerscored', 'image/playerscored.png');
		this.load.image('opponentscored', 'image/opponentscored.png');
		this.load.image('ballout', 'image/ballout.png');
		this.load.image('won', 'image/won.png');
		this.load.image('lost', 'image/lost.png');
		this.load.image('target', 'image/target.png');
		this.load.image('button', 'image/button.png');
		
		this.load.bitmapFont('numberfont', 'font/numberfont.png', 'font/numberfont.xml');
	},
	create: function() {
		this.preloadbar.cropEnabled = false;
		this.state.start('MainMenu');
	},
};