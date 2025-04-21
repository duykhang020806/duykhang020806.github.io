class Keyboard {
    constructor(display, scores, shortcuts) {
        this.fastKeys   = [37, 65, 40, 83, 39, 68, 38, 87]; // Mũi tên trái (37), mũi tên lên (38), mũi tên xuống (40), mũi tên phải (39), W (87), A (65), S (83), D (68)
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

            // Gán phím theo các mã phím và hành động tương ứng
            if ([8, 66, 78].indexOf(key) > -1) {            // Backspace / B / N
                key = "B";
            } else if ([13, 79, 84].indexOf(key) > -1) {    // Enter / O / T
                key = "O";
            } else if ([80, 67].indexOf(key) > -1) {        // P / C
                key = "P";
            } else if ([17, 32].indexOf(key) > -1) {        // Ctrl / Space
                key = "C";
            } else if ([38, 87].indexOf(key) > -1) {        // Up / W
                key = "W";
            } else if ([37, 65].indexOf(key) > -1) {        // Left / A
                key = "A";
            } else if ([40, 83].indexOf(key) > -1) {        // Down / S (Chức năng đặc biệt)
                key = "S";
                this.quickDrop();  // Gọi hàm để di chuyển xuống nhanh
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

        // Kiểm tra nếu phím mũi tên được nhấn và thời gian giữa hai lần bấm phím mũi tên lớn hơn 100ms
        if (this.display.isPlaying() && this.fastKeys.indexOf(event.keyCode) > -1) {
            // Kiểm tra nếu thời gian giữa hai lần bấm phím mũi tên phải/trái quá ngắn (dưới 100ms)
            if (currentTime - this.lastKeyPressTime > 100) {
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

    // Hàm di chuyển vật thể xuống nhanh
    quickDrop() {
        console.log("Vật thể đang di chuyển xuống nhanh!");
        // Logic di chuyển vật thể xuống nhanh ở đây
        // Giả sử trò chơi có hàm `movePieceDown()` để di chuyển vật thể xuống:
        this.display.movePieceDown();  // Thay đổi với phương thức thực tế của bạn
    }
}
