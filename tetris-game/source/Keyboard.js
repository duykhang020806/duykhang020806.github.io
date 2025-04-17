class Keyboard {
    constructor(display, scores, shortcuts) {
        this.fastKeys   = [ 37, 65, 40, 83, 39, 68 ]; // Mã phím di chuyển
        this.shortcuts  = shortcuts;
        this.keyPressed = null;
        this.count      = 0;
        this.display    = display;
        this.scores     = scores;

        this.speed = 0.5; // Tốc độ di chuyển mặc định = 0.5 (chậm)
        this.lastPressedTime = 0;
        this.moveDelay = 150; // Thời gian delay (ms) giữa các lần di chuyển

        document.addEventListener("keydown", (e) => this.onKeyDown(e));
        document.addEventListener("keyup",   (e) => this.onKeyUp(e));
    }

    onKeyDown(event) {
        let currentTime = Date.now();
        
        // Kiểm tra xem thời gian giữa các lần nhấn có đủ lâu không (so với moveDelay)
        if (currentTime - this.lastPressedTime > this.moveDelay) {
            this.lastPressedTime = currentTime; // Cập nhật thời gian nhấn lần này
            if (this.display.isPlaying() && this.fastKeys.indexOf(event.keyCode) > -1) {
                if (this.keyPressed === null) {
                    this.keyPressed = event.keyCode;
                    this.pressKey(this.keyPressed, event); // Di chuyển khối
                }
            }
        }
    }

    onKeyUp(event) {
        // Đặt lại trạng thái khi phím được nhả ra
        if (this.keyPressed === event.keyCode) {
            this.keyPressed = null;
        }
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

            // Xử lý các phím chức năng khác
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

            // Giảm tốc độ di chuyển tại đây (tốc độ = 0.5 nếu bạn muốn di chuyển chậm hơn)
            if (this.speed === 0.5) {
                // Tốc độ di chuyển chậm
                this.shortcuts[this.display.get()][key]();
            } else if (this.speed === 1) {
                // Tốc độ di chuyển nhanh
                this.shortcuts[this.display.get()][key]();
            }
        }
    }

    // Phương thức để điều chỉnh tốc độ di chuyển
    setSpeed(speed) {
        if (speed === 0.5 || speed === 1) {
            this.speed = speed; // Thay đổi tốc độ
        }
    }
}
