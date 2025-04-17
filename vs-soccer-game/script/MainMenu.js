Game.MainMenu = function(game) {
	this.court = {
		x: 75,
		y: 105,
		width: 450,
		height: 590,
	};
};

Game.MainMenu.prototype = {
	create: function() {
		Game.aiScore = 0;
		Game.playerScore = 0;
		
		this.add.sprite(0, 0, 'field');
		
		this.walls = this.add.group();
		
		var wallbig = this.walls.create(30, this.world.centerY, 'wallbig');
		wallbig.anchor.setTo(0, 0.5);
		wallbig = this.walls.create(525, this.world.centerY, 'wallbig');
		wallbig.anchor.setTo(0, 0.5);
		
		var wallsmall = this.walls.create(30, 65, 'wallsmall');
		wallsmall = this.walls.create(475, 65, 'wallsmall');
		wallsmall = this.walls.create(30, 695, 'wallsmall');
		wallsmall = this.walls.create(475, 695, 'wallsmall');
		
		this.ai = this.add.sprite(this.world.centerX, this.court.y + 50, 'ai');
		this.ai.anchor.setTo(0.5);
		
		this.player = this.add.sprite(this.world.centerX, this.court.y + this.court.height - 50, 'player');
		this.player.anchor.setTo(0.5);
		
		this.ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
		this.ball.anchor.setTo(0.5);
		
		this.scores = this.add.group();
		
		this.scores.create(this.world.centerX, 5, 'scoreboard').anchor.setTo(0.5, 0);
		this.playerScoreText = this.add.bitmapText(this.world.centerX, this.world.height - 47, 'numberfont', '0', 45);
		this.playerScoreText.anchor.setTo(0.5);
		
		this.targetScoreText = this.add.sprite(this.world.centerX, this.world.centerY + 100, 'target');
		this.targetScoreText.anchor.setTo(0.5);
		this.targetScoreText.alpha = 0;
		
		this.add.tween(this.targetScoreText).to({alpha: 1}, 1000, Phaser.Easing.Linear.None).start();
		
		this.scoreToWinText = this.add.bitmapText(this.world.centerX, this.world.centerY + 150, 'numberfont', Game.scoreToWin.toString(), 80);
		this.scoreToWinText.anchor.setTo(0.5);
		this.scoreToWinText.alpha = 0;
		
		this.add.tween(this.scoreToWinText).to({alpha: 1}, 1000, Phaser.Easing.Linear.None).start();
		
		this.increaseButton = this.add.button(this.world.centerX + 80, this.world.centerY + 150, 'button', this.increaseTargetScore, this, 2, 1, 0);
		this.increaseButton.anchor.setTo(0.5);
		this.increaseButton.alpha = 0;
		
		this.add.tween(this.increaseButton).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		this.decreaseButton = this.add.button(this.world.centerX - 80, this.world.centerY + 150, 'button', this.decreaseTargetScore, this, 2, 1, 0);
		this.decreaseButton.anchor.setTo(0.5);
		this.decreaseButton.scale.setTo(-1, 1);
		this.decreaseButton.alpha = 0;
		
		this.add.tween(this.decreaseButton).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		this.scores.create(this.world.centerX, 795, 'scoreboard').anchor.setTo(0.5, 1);
		this.aiScoreText = this.add.bitmapText(this.world.centerX, 53, 'numberfont', '0', 45);
		this.aiScoreText.anchor.setTo(0.5);
		
		this.scores.add(this.playerScoreText);
		this.scores.add(this.aiScoreText);
		
		this.titleText = this.add.sprite(this.world.centerX, this.world.centerY - 130, 'goaleebattle');
		this.titleText.anchor.setTo(0.5, 0.5);
		this.titleText.scale.setTo(0, 0);
		
		this.add.tween(this.titleText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
		
		this.instructionText = this.add.sprite(this.world.centerX, this.world.height - 190, 'play');
		this.instructionText.anchor.setTo(0.5);
		this.instructionText.alpha = 0;
		this.add.tween(this.instructionText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);

		this.cursors = this.input.keyboard.createCursorKeys();
		this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	increaseTargetScore: function(pointer) {
		if (Game.scoreToWin < 25) {
			Game.scoreToWin++;
			this.scoreToWinText.text = Game.scoreToWin;
		}
	},
	decreaseTargetScore: function(pointer) {
		if (Game.scoreToWin > 3) {
			Game.scoreToWin--;
			this.scoreToWinText.text = Game.scoreToWin;
		}
	},
	update: function() {
		if (this.spacebar.isDown) {
			this.state.start('Play');
		}
		
		if (Game.scoreToWin === 25) {
			this.increaseButton.visible = false;
		} else {
			this.increaseButton.visible = true;
		}
		
		if (Game.scoreToWin === 3) {
			this.decreaseButton.visible = false;
		} else {
			this.decreaseButton.visible = true;
		}
	},
};