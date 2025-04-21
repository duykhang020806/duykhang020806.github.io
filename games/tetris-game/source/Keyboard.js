class Keyboard {
    constructor(display, scores, shortcuts) {
        this.fastKeys   = [37, 65, 40, 83, 39, 68];
        this.shortcuts  = shortcuts;
        this.keyPressed = null;
        this.count      = 0;
        this.lastKeyPressTime = 0; // Biến để lưu thời gian bấm phím

        this.display    = display;
        this.scores     = scores;

        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        document.addEventListener("keyup", (e) => this.onKeyUp(e));
    }

    holdingKey() {
        if (this.keyPressed) {
            this.count += 1;
            if (this.count > 8) {
                this.onKeyHold();
                this.count -= 3;
            }
        }
    }

    reset() {
        this.count = 0;
    }

    pressKey(key, event) {
        let number = null;
        if (this.scores.isFocused()) {
            if (key === 13) {
                this.shortcuts.gameOver.O();
            }
        } else {
            if (!this.display.isPlaying()) {
                event.preventDefault();
            }
            
            if ([8, 66, 78].indexOf(key) > -1) {            // Backspace / B / N
                key = "B";
            } else if ([13, 79, 84].indexOf(key) > -1) {    // Enter / O / T
                key = "O";
            } else if ([80, 67].indexOf(key) > -1) {        // P / C
                key = "P";
            } else if ([17, 32].indexOf(key) > -1) {        // Ctrl / Space
                key = "C";
            } else if ([38, 87].indexOf(key) > -1) {        // Up    / W
                key = "W";
            } else if ([37, 65].indexOf(key) > -1) {        // Left  / A
                key = "A";
            } else if ([40, 83].indexOf(key) > -1) {        // Down  / S
                key = "S";
            } else if ([39, 68].indexOf(key) > -1) {        // Right / D
                key = "D";
            } else {
                if (key === 48 || key === 96) {
                    number = 10;
                } else if (key > 48 && key < 58) {
                    number = key - 48;
                } else if (key > 96 && key < 106) {
                    number = key - 96;
                }
                key = String.fromCharCode(key);
            }
            
            if (number !== null) {
                this.shortcuts.number(number);
            }
            if (this.shortcuts[this.display.get()][key]) {
                this.shortcuts[this.display.get()][key]();
            }
        }
    }

    onKeyDown(event) {
        const currentTime = Date.now();  // Lấy thời gian hiện tại

        // Kiểm tra nếu phím mũi tên được nhấn và thời gian giữa hai lần bấm phím mũi tên lớn hơn 200ms
        if (this.display.isPlaying() && this.fastKeys.indexOf(event.keyCode) > -1) {
            // Kiểm tra nếu thời gian giữa hai lần bấm phím mũi tên phải/trái quá ngắn (dưới 200ms)
            if (currentTime - this.lastKeyPressTime > 200) {
                this.lastKeyPressTime = currentTime;  // Cập nhật thời gian bấm phím
                this.keyPressed = event.keyCode;  // Lưu lại phím được nhấn lần đầu
                this.pressKey(event.keyCode, event);  // Xử lý bấm phím
            }
        }
    }

    onKeyUp() {
        this.keyPressed = null;
        this.count      = 0;
    }

    onKeyHold() {
        // Không xử lý việc giữ phím nữa
    }
}
