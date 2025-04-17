Game.Play = function(game) {
	this.court = {
		x: 75,
		y: 105,
		width: 450,
		height: 590,
	};
};

Game.Play.prototype = {
	create: function() {
		this.gameover = false;
		this.scored = false;
		this.serve = true;
		this.courtSideX = Math.floor(Math.random() * 2);
		this.courtSideY = Math.floor(Math.random() * 2);
		
		this.physics.startSystem(Phaser.Physics.ARCADE);
		
		this.add.sprite(0, 0, 'field');
		
		this.walls = this.add.group();
		this.walls.enableBody = true;
		this.walls.physicsBodyType = Phaser.Physics.ARCADE;
		
		var wallbig = this.walls.create(30, this.world.centerY, 'wallbig');
		wallbig.anchor.setTo(0, 0.5);
		wallbig.body.bounce.set(1);
		wallbig.body.immovable = true;
		
		wallbig = this.walls.create(525, this.world.centerY, 'wallbig');
		wallbig.anchor.setTo(0, 0.5);
		wallbig.body.bounce.set(1);
		wallbig.body.immovable = true;
		
		var wallsmall = this.walls.create(30, 65, 'wallsmall');
		wallsmall.body.bounce.set(1);
		wallsmall.body.immovable = true;
		
		wallsmall = this.walls.create(475, 65, 'wallsmall');
		wallsmall.body.bounce.set(1);
		wallsmall.body.immovable = true;
		
		wallsmall = this.walls.create(30, 695, 'wallsmall');
		wallsmall.body.bounce.set(1);
		wallsmall.body.immovable = true;
		
		wallsmall = this.walls.create(475, 695, 'wallsmall');
		wallsmall.body.bounce.set(1);
		wallsmall.body.immovable = true;
		
		this.ai = this.add.sprite(this.world.centerX, this.court.y + 50, 'ai');
		this.ai.anchor.setTo(0.5);
		this.physics.enable(this.ai, Phaser.Physics.ARCADE);
		this.ai.body.immovable = true;
		this.ai.body.bounce.set(1);
		
		this.player = this.add.sprite(this.world.centerX, this.court.y + this.court.height - 50, 'player');
		this.player.anchor.setTo(0.5);
		this.physics.enable(this.player, Phaser.Physics.ARCADE);
		this.player.body.immovable = true;
		this.player.body.bounce.set(1);
		
		this.ball = this.add.sprite(this.world.centerX, this.world.centerY, 'ball');
		this.ball.anchor.setTo(0.5);
		this.physics.enable(this.ball, Phaser.Physics.ARCADE);
		this.ball.body.bounce.set(1);
		
		this.scores = this.add.group();
		
		this.scores.create(this.world.centerX, 5, 'scoreboard').anchor.setTo(0.5, 0);
		this.playerScoreText = this.add.bitmapText(this.world.centerX, this.world.height - 47, 'numberfont', Game.playerScore.toString(), 45);
		this.playerScoreText.anchor.setTo(0.5);
		
		this.scores.create(this.world.centerX, 795, 'scoreboard').anchor.setTo(0.5, 1);
		this.aiScoreText = this.add.bitmapText(this.world.centerX, 53, 'numberfont', Game.aiScore.toString(), 45);
		this.aiScoreText.anchor.setTo(0.5);
		
		this.scores.add(this.playerScoreText);
		this.scores.add(this.aiScoreText);
		
		this.getReadyText = this.add.sprite(this.world.centerX, this.world.centerY - 120, 'getready');
		this.getReadyText.anchor.setTo(0.5);
		this.getReadyText.scale.setTo(0);
		this.add.tween(this.getReadyText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
		
		this.serveText = this.add.sprite(this.world.centerX, this.world.height - 190, 'serve');
		this.serveText.anchor.setTo(0.5);
		this.serveText.alpha = 0;
		this.add.tween(this.serveText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		this.continueText = this.add.sprite(this.world.centerX, this.world.height - 190, 'continue');
		this.continueText.anchor.setTo(0.5);
		this.continueText.visible = false;
		this.continueText.alpha = 0;
		this.add.tween(this.continueText).to( { alpha: 1 }, 2000, Phaser.Easing.Linear.None, true, 0, 1000, true);
		
		this.playerScoredText = this.add.sprite(this.world.centerX, this.world.centerX - 50, 'playerscored');
		this.playerScoredText.anchor.setTo(0.5);
		this.playerScoredText.scale.setTo(0);
		this.playerScoredText.visible = false;
		
		this.opponentScoredText = this.add.sprite(this.world.centerX, this.world.centerX - 50, 'opponentscored');
		this.opponentScoredText.anchor.setTo(0.5);
		this.opponentScoredText.scale.setTo(0);
		this.opponentScoredText.visible = false;
		
		this.wonText = this.add.sprite(this.world.centerX, this.world.centerX - 50, 'won');
		this.wonText.anchor.setTo(0.5);
		this.wonText.scale.setTo(0);
		this.wonText.visible = false;
		
		this.lostText = this.add.sprite(this.world.centerX, this.world.centerX - 50, 'lost');
		this.lostText.anchor.setTo(0.5);
		this.lostText.scale.setTo(0);
		this.lostText.visible = false;
		
		this.ballOutText = this.add.sprite(this.world.centerX, this.world.centerY - 120, 'ballout');
		this.ballOutText.anchor.setTo(0.5);
		this.ballOutText.scale.setTo(0);
		this.ballOutText.visible = false;
		
		this.cursors = this.input.keyboard.createCursorKeys();
		this.spacebar = this.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
	},
	update: function() {
		if (this.gameover && this.spacebar.isDown) {
			this.state.start('MainMenu');
			return;
		}
		
		if (this.scored  && this.spacebar.isDown) {
			this.state.start('Play');
			return;
		}
		
		if (this.spacebar.isDown) {
			this.getReadyText.visible = false;
			this.serveText.visible = false;
			this.serveBall();
		}
		
		this.physics.arcade.collide(this.ball, this.walls);
		this.physics.arcade.collide(this.ball, this.player, this.ballHitPaddle, null, this);
		this.physics.arcade.collide(this.ball, this.ai, this.ballHitPaddle, null, this);
		
		if (!this.scored) {
			if (this.ball.y - 10 < this.court.y - 35) {
				this.decision();
				Game.playerScore++;
				this.playerTurn = true;
				this.playerScoreText.text = Game.playerScore;
				if (Game.playerScore === Game.scoreToWin) {
					this.gameover = true;
					this.wonText.visible = true;
					this.add.tween(this.wonText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
				} else {
					this.playerScoredText.visible = true;
					this.add.tween(this.playerScoredText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
				}
			}
			
			if (this.ball.y - 10 > this.court.y + this.court.height + 15) {
				this.decision();
				Game.aiScore++;
				this.playerTurn = false;
				this.aiScoreText.text = Game.aiScore;
				if (Game.aiScore === Game.scoreToWin) {
					this.gameover = true;
					this.lostText.visible = true;
					this.add.tween(this.lostText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
				} else {
					this.opponentScoredText.visible = true;
					this.add.tween(this.opponentScoredText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
				}
			}
		}
		
		if (this.ball.x < 0 || this.ball.x > this.world.width || this.ball.y < 0 || this.ball.y > this.world.height) {
			this.decision();
			this.ballOutText.visible = true;
			this.add.tween(this.ballOutText.scale).to({x: 1, y: 1}, 1000, Phaser.Easing.Bounce.Out).start();
		}
		
		this.player.body.velocity.x = 0;
		
		if ((this.cursors.left.isDown) && (this.player.body.x > this.court.x)) {
			this.player.body.velocity.x = -250;
		} else if ((this.cursors.right.isDown) && (this.player.body.x < this.court.x + this.court.width - 60)) {
			this.player.body.velocity.x = 250;
		}
		
		var destX = this.ball.body.x - 20;
		this.ai.body.x += (destX - this.ai.body.x) * 0.1;
		this.ai.body.x = Math.max(Math.min(this.ai.body.x, this.court.x + this.court.width - 60), this.court.x);
	},
	serveBall: function() {
		if (this.serve) {
			var velX = 0;
			if (this.courtsideX === 0) {
				velX = -100;
			} else if (this.courtSideX === 1) {
				velX = 100;
			}
			this.ball.body.velocity.x = velX;
			
			var velY = 0;
			if (this.courtSideY === 0) {
				velY = -300;
			} else if (this.courtSideY === 1){
				velY = 300;
			}
			this.ball.body.velocity.y = velY;
			this.serve = false;
		}
	},
	decision: function() {
		this.ball.body.velocity.y = 0;
		this.ball.body.velocity.x = 0;
		this.scored = true;
		this.continueText.visible = true;
	},
	ballHitPaddle: function(ball, paddle) {
		var diff = 0;
		
		if (ball.x < paddle.x) {
			diff = paddle.x - ball.x;
			ball.body.velocity.x = (-10 * diff);
		} else if (ball.x > paddle.x) {
			diff = ball.x - paddle.x;
			ball.body.velocity.x = (10 * diff);
		} else {
			ball.body.velocity.x = 2 + Math.random() * 8;
		}
	}
};