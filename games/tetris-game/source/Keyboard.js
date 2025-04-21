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

            // Đoạn mã kiểm tra các phím và gán chức năng
            // ...

        }
    }

    onKeyDown(event) {
        const currentTime = Date.now();  // Lấy thời gian hiện tại
        if (this.display.isPlaying() && this.fastKeys.indexOf(event.keyCode) > -1) {
            if (this.keyPressed === null) {
                this.keyPressed = event.keyCode;
            } else {
                return;  // Nếu đã nhấn phím, không làm gì thêm
            }
        }

        // Kiểm tra nếu thời gian giữa hai lần bấm phím mũi tên phải/trái quá ngắn (dưới 200ms)
        if (currentTime - this.lastKeyPressTime > 200) {
            this.lastKeyPressTime = currentTime;  // Cập nhật thời gian bấm phím
            this.pressKey(event.keyCode, event);  // Xử lý bấm phím
        }
    }

    onKeyUp() {
        this.keyPressed = null;
        this.count      = 0;
    }

    onKeyHold() {
        if (this.keyPressed !== null && this.display.isPlaying()) {
            this.pressKey(this.keyPressed);
        }
    }
}
