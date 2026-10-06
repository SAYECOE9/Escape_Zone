// ========================
// canvas


const canvas = document.querySelector("#canvas");

const ctx = canvas.getContext("2d");

canvas.width = 900;
canvas.height = 520;

// ==================================
// game


const game = {
    level: 1,
    score: 0,
    coins: 0,
    running: false
};


// ================================
// player



const player = {
    x: 70,
    y: 70,

    width: 24,
    height: 38,
    speed: 185,
    health: 100,
    hurt: 0

};


// ===========================
// input

const keys = {};

window.addEventListener("keydown", e => {
    keys[e.key.toLowerCase()] = true;
});

window.addEventListener("keyup", e => {
    keys[e.key.toLowerCase()] = false;
});




// =============================
// word


const walls = [];
const coins = [];



// =================================
// enemies

const enemies = [

    {
        x: 520,
        y: 430,
        width: 28,
        height: 38,
        speed: 70
    },

    {
        x: 520,
        y: 430,
        width: 28,
        height: 38,
        speed: 70
    },

    {
        x: 520,
        y: 430,
        width: 28,
        height: 38,
        speed: 70
    },

    {
        x: 520,
        y: 430,
        width: 28,
        height: 38,
        speed: 70
    },

    {
        x: 520,
        y: 430,
        width: 28,
        height: 38,
        speed: 70
    }

];

const enemyStarts = [
    [730, 340],
    [760, 90],
    [520, 430],
    [420, 230],
    [100, 360]
];

const enemyBasSpeed = [
    65,
    75,
    70,
    60,
    80
];




// ==========================
// key

const key = {
    x: 590,
    y: 90,
    found: false
};



// ===============================
// puzzle

const switchBoxes = [

    {
        x: 420,
        y: 430,
        active: false
    },
    {
        x: 120,
        y: 430,
        active: false
    },
    {
        x: 790,
        y: 200,
        active: false
    },

];


// puzzle must be solved


let nextSwitch = 0;


// ==========================
// door

const door = {
    x: 835,
    y: 430,
    width: 40,
    height: 55
};

// ==========================
// create walls

function createWalls() {

    walls.length = 0;


    walls.push(

        { x: 0, y: 0, w: 900, h: 25 },

        { x: 0, y: 495, w: 900, h: 25 },

        { x: 0, y: 0, w: 25, h: 520 },

        { x: 875, y: 0, w: 25, h: 520 }

    );


    // buildings

    walls.push(

        { x: 150, y: 70, w: 190, h: 28 },

        { x: 150, y: 70, w: 28, h: 170 },

        { x: 340, y: 70, w: 28, h: 120 },

        { x: 480, y: 150, w: 210, h: 28 },

        { x: 660, y: 150, w: 28, h: 170 },

        { x: 240, y: 300, w: 200, h: 28 },

        { x: 240, y: 300, w: 28, h: 120 },

        { x: 480, y: 360, w: 170, h: 28 },

        { x: 620, y: 360, w: 28, h: 100 }

    );

}




// =======================
// create coins

function createCoins() {
    coins.length = 0;

    const positions = [

        [115, 255],
        [400, 120],
        [550, 250],
        [760, 410],
        [330, 450]
    ];

    positions.forEach(pos => {
        coins.push({
            x: pos[0],
            y: pos[1],
            collected: false
        });
    });

}


// =========================
// reset

function resetLevel() {
    player.x = 65;
    player.y = 55;
    player.health = 100;
    player.hurt = 0;
    enemies.forEach((enemy, i) => {
        enemy.x = enemyStarts[i][0];
        enemy.y = enemyStarts[i][1];
    });

    key.found = false;
    switchBoxes.forEach(sw => {
        sw.active = false;
    });

    nextSwitch = 0;
    createWalls();
    createCoins();

    updateMission();

}


function rectangleCollsion(a, b) {
    return (
        a.x < b.x + b.w &&
        a.x + a.width > b.x &&
        a.y < b.y + b.h &&
        a.y + a.height > b.y
    );
}


function hiWall(object) {
    return walls.some(wall =>

        rectangleCollsion(object, wall)
    );

}

// =============================
// move player

function movePlayer(dx, dy) {
    player.x += dx;
    if (hiWall(player)) {
        player.x -= dx;
    }
    player.y += dy;
    if (hiWall(player)) {
        player.y -= dy;
    }

}



// ===========================

// player update

function updatePlayer(dt) {
    let dx = 0;
    let dy = 0;

    if (
        keys["w"] ||
        keys["arrowup"]
    ) dy--;

    if (
        keys["s"] ||
        keys["arrowdown"]

    ) dy++;

    if (
        keys["a"] ||
        keys["arrowleft"]

    ) dx--;


    if (
        keys["d"] ||
        keys["arrowright"]

    ) dx++;

    if (dx || dy) {
        const length =
            Math.sqrt(dx * dx + dy * dy);

        dx /= length;
        dy /= length;

    }
    movePlayer(
        dx * player.speed * dt,
        dy * player.speed * dt
    );

    if (player.hurt > 0) {
        player.hurt -= dt;
    }
}






function updateEnemy(dt) {

    enemies.forEach(enemy => {
        const dx =
            player.x - enemy.x;
        const dy =
            player.y - enemy.y;

        const distance =
            Math.sqrt(dx * dx + dy * dy);
        if (distance > 1) {
            const vx = dx / distance;
            const vy = dy / distance;
            const oldX = enemy.x;
            const oldY = enemy.y;
            enemy.x +=
                vx * enemy.speed * dt;
            enemy.y +=
                vy * enemy.speed * dt;


            const box = {
                x: enemy.x,
                y: enemy.y,
                width: enemy.width,
                height: enemy.height
            };


            if (hiWall(box)) {
                enemy.x = oldX;
                enemy.y = oldY;

            }

        }

        if (
            distance < 35 &&
            player.hurt <= 0

        ) {
            player.health -= 15;
            player.hurt = 1;
        }

    });
}


// ===========================
// coins

function updateCoins() {
    coins.forEach(coin => {
        if (coin.collected)
            return;
        const dx =
            player.x - coin.x;

        const dy =
            player.y - coin.y;
        const distance =
            Math.sqrt(dx * dx + dy * dy);
        if (distance < 25) {
            coin.collected = true;
            game.coins++;
            game.score += 100;
            updateMission();

        }
    });
}




// ==========================
// key

function updateKey() {
    if (key.found)
        return;
    const dx =
        player.x - key.x;
    const dy =
        player.y - key.y;

    const distance =
        Math.sqrt(dx * dx + dy * dy);

    if (distance < 30) {
        key.found = true;
        game.score += 400;

        updateMission();
    }
}

// ==============================
// puzzle switch


function updateSwitch() {
    if (!key.found)
        return;

    if (
        nextSwitch >= switchBoxes.length
    ) return;


    const target =
        switchBoxes[nextSwitch];

    const dx = player.x - target.x;
    const dy = player.y - target.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const requiredCoins = [
        1,
        2,
        3,
        5,
    ][nextSwitch];
    if (
        distance < 35 &&
        coins.filter(c => c.collected).length >= requiredCoins

    ) {
        target.active = true;
        nextSwitch++;
        game.score += 600;
        updateMission();
    }

}

// =============================
// check exit

function updateDoor() {
    const allCoins =
        coins.filter(c => c.collected).length >= 5;

    const allSwitches =
        switchBoxes.every(
            sw => sw.active
        );
    if (!key.found ||
        !allCoins ||
        !allSwitches
    ) return;


    const exit = {
        x: door.x,
        y: door.y,
        w: door.width,
        h: door.height
    };

    if (
        rectangleCollsion(player, exit)
    ) {
        nextLevel();
    }
}



// ===============================
// next level
function nextLevel() {


    game.level++;
    game.score += 1000;
    enemies.forEach((enemy, i) => {
        enemy.speed = enemyBasSpeed[i] +
            (game.level - 1) * 15;

    });
    resetLevel();

}


// ========================================
// update


function update(dt) {
    if (!game.running)
        return;

    updatePlayer(dt);
    updateEnemy(dt);
    updateCoins();
    updateKey();
    updateSwitch();
    updateDoor();
    if (player.health <= 0) {
        gameOver();
        return;
    }
    updateUI();
}


// ======================
// ground

function drawGround() {
    ctx.fillStyle = "#34443a";
    ctx.fillRect(
        0,
        0,
        canvas.width,
        canvas.height
    );

    ctx.strokeStyle =
        "rgba(255,255,255,.025)";

    for (let x = 0; x < 900; x += 45) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, 520);
        ctx.stroke();


    }

    for (let y = 0; y < 520; y += 45) {

        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(900, y);
        ctx.stroke();
    }
}


// ========================
// walls

function drawWalls() {
    walls.forEach(wall => {
        ctx.fillStyle =
            "rgba(0,0,0,.35)";

        ctx.fillRect(
            wall.x + 7,
            wall.y + 8,
            wall.w,
            wall.h
        );
        ctx.fillStyle = "#65706b";
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.w,
            wall.h
        );

        ctx.fillStyle = "rgba(255,255,255,.12)";
        ctx.fillRect(
            wall.x,
            wall.y,
            wall.w,
            4
        );
    });
}




// ============================
// coins draw

function drawCoins() {
    coins.forEach(coin => {
        if (coin.collected)
            return;
        ctx.save();
        ctx.shadowColor =
            "#ffd84d";

        ctx.shadowBlur = 16;
        ctx.fillStyle =
            "#ffd84d";
        ctx.beginPath();
        ctx.arc(
            coin.x,
            coin.y,
            9,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle =
            "#fff2a8";
        ctx.fillRect(
            coin.x - 2,
            coin.y - 5,
            3,
            10
        );
        ctx.restore();
    });
}



// ===============================
// key draw


function drawKey() {
    if (key.found)
        return;
    ctx.save();
    ctx.shadowColor =
        "#ffe27a";
    ctx.shadowBlur = 18;

    ctx.strokeStyle =
        "#ffe27a";

    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(
        key.x,
        key.y,
        8,
        0,
        Math.PI * 2
    );


    ctx.stroke();
    ctx.moveTo(
        key.x + 7,
        key.y
    );
    ctx.lineTo(
        key.x + 25,
        key.y
    );
    ctx.stroke();
    ctx.restore();
}


// =============================
// switch Draw


function drawSwitch() {
    switchBoxes.forEach((sw, index) => {
        const isNext =
            index === nextSwitch &&
            !sw.active;
        ctx.save();


        ctx.shadowColor =
            sw.active
                ? "#00e5a0"
                : "transparent";
        ctx.shadowBlur =
            sw.active || isNext
                ? 16
                : 0;

        ctx.fillStyle =
            sw.active
                ? "#00e5a0"
                : "#29352f";
        ctx.fillRect(
            sw.x - 15,
            sw.y - 15,
            30, 30
        );



        ctx.fillStyle =
            sw.active
                ? "#dffff4"
                : isNext
                    ? "#ffe27a"
                    : "#65736b";

        ctx.beginPath();
        ctx.arc(
            sw.x,
            sw.y,
            7,
            0,
            Math.PI * 2
        );

        ctx.fill();

        // Number

        ctx.fillStyle =
            "#17231f";
        ctx.font =
            "bold 9px Arial";
        ctx.textAlign =
            "center";
        ctx.textBaseline =
            "middle";
        ctx.fillText(
            index + 1,
            sw.x,
            sw.y
        );
        ctx.restore();

    });
}



// ==========================
// door

function drawDoor() {
    const unlocked =
        key.found &&
        coins.filter(
            c => c.collected

        ).length >= 5 &&
        switchBoxes.every(
            sw => sw.active
        );


    ctx.save();
    ctx.shadowColor =
        unlocked
            ? "#00e5a0"
            : "transparent";

    ctx.shadowBlur =
        unlocked ? 20 : 0;
    ctx.fillStyle =
        unlocked
            ? "#168b68"
            : "#493b2d";

    ctx.fillRect(
        door.x,
        door.y,
        door.width,
        door.height
    );

    ctx.fillStyle =
        unlocked
            ? "#d4fff0"
            : "#8a6e4f";

    ctx.fillRect(
        door.x + 8,
        door.y + 8,
        24,
        38
    );


    ctx.fillStyle =
        unlocked ? "#00e5a0"
            : "#d49b46";

    ctx.beginPath();
    ctx.arc(
        door.x + 28,
        door.y + 28,
        3,
        0,
        Math.PI * 2
    );

    ctx.fill();
    ctx.restore();


}



// ================================
// player



function drawPlayer() {
    ctx.save();
    if (
        player.hurt > 0 &&
        Math.floor(player.hurt * 10) % 2

    ) {
        ctx.globalAlpha = .4;
    }

    ctx.fillStyle = "rgba(0,0,0,.4)";

    ctx.beginPath();
    ctx.ellipse(
        player.x + 12,
        player.y + 38,

        16,
        6,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle =
        "#20252a";

    ctx.fillRect(
        player.x + 5,
        player.y + 28,
        6,
        10
    );

    ctx.fillRect(
        player.x + 14,
        player.y + 28,
        6,
        10
    );

    ctx.fillStyle =
        "#2479d8";
    ctx.beginPath();
    ctx.roundRect(
        player.x + 3,
        player.y + 12,
        19,
        18,
        5
    );
    ctx.fill();



    ctx.fillStyle = "#dce8f0";
    ctx.fillRect(
        player.x + 10,
        player.y + 15,
        5,
        13
    );

    ctx.fillStyle = "#c88e68";
    ctx.fillRect(
        player.x - 1,
        player.y + 15,
        5,
        13
    );

    ctx.fillRect(
        player.x + 20,
        player.y + 15,
        5,
        13
    );

    ctx.fillStyle =
        "#c88e68";

    ctx.fillRect(
        player.x + 9,
        player.y + 8,
        7,
        7

    );

    ctx.fillStyle =
        "#d8a078";

    ctx.beginPath();
    ctx.arc(
        player.x + 12,
        player.y + 8,
        9,
        0,
        Math.PI * 2
    );


    ctx.fill();


    ctx.fillStyle = "#241b17";
    ctx.beginPath();
    ctx.arc(
        player.x + 12,
        player.y + 6,
        9,
        Math.PI,
        Math.PI * 2
    );
    ctx.fill();

    ctx.fillStyle = "#201814";
    ctx.fillRect(
        player.x + 15,
        player.y + 7,
        2,
        2

    );
    ctx.restore();


}


// ========================================
// enemy

function drawEnemy(enemy) {
    ctx.save();

    ctx.fillStyle = "rgba(0,0,0,.45)";

    ctx.beginPath();
    ctx.ellipse(
        enemy.x + 14,
        enemy.y + 39,
        18,
        7,
        0,
        0,
        Math.PI * 2
    );

    ctx.fill();

    ctx.fillStyle = "#171b1d";
    ctx.fillRect(
        enemy.x + 5,
        enemy.y + 27,
        7,
        11
    );


    ctx.fillStyle = "#a33d45";
    ctx.beginPath();
    ctx.roundRect(
        enemy.x + 3,
        enemy.y + 12,
        23,
        20,
        6
    );


    ctx.fill();


    ctx.fillStyle = "#b96f55";
    ctx.beginPath();
    ctx.arc(
        enemy.x + 14,
        enemy.y + 8,
        10,
        0,
        Math.PI * 2
    );

    ctx.fill();

    // hair

    ctx.fillStyle = "#151719";
    ctx.beginPath();
    ctx.arc(
        enemy.x + 14,
        enemy.y + 6,
        10,
        Math.PI,
        Math.PI * 2
    );
    ctx.fill();



    ctx.fillStyle = "#ffdfdf";
    ctx.fillRect(
        enemy.x + 7,
        enemy.y + 8,
        4,
        3
    );
    ctx.fillRect(
        enemy.x + 17,
        enemy.y + 8,
        4,
        3
    );
    ctx.restore();

}


// =================================
// door

function draw() {
    drawGround();
    drawWalls();
    drawCoins();
    drawKey();
    drawSwitch();
    drawDoor();
    enemies.forEach(enemy => {
        drawEnemy(enemy);
    });

    drawPlayer();
}


// =====================================
// missions

function updateMission() {
    const collectedCoins =
        coins.filter(
            c => c.collected
        ).length;

    const allSwitches =
        switchBoxes.every(
            sw => sw.active
        );
    document.querySelector("#missionKey")
        .classList.toggle("done", key.found);

    document.querySelector("#missionCoins")
        .classList.toggle(
            "done", collectedCoins >= 5
        );

    document.querySelector("#missionSwitch")
        .classList.toggle(
            "done",
            allSwitches
        );

    const ready =
        key.found && collectedCoins >= 5 &&
        allSwitches;


    document.querySelector("#missionExit")
        .classList.toggle(
            "done",
            ready
        );
}


// ==================================
// UI

function updateUI() {
    document.querySelector("#health")
        .textContent = Math.max(
            player.health
        );

    document.querySelector("#coins")
        .textContent =
        game.coins;

    document.querySelector("#level")
        .textContent =
        game.level;

    document.querySelector("#score")
        .textContent =
        game.score;
}

function gameOver() {
    game.running = false;

    document.querySelector("#title")
        .textContent =
        "MISSIN FAILED";
    document.querySelector("#text").textContent =
        `level ${game.level} - Score ${game.score}`;

    document.querySelector("#start")
        .textContent =
        "TRY AGAIN";

    document.querySelector("#screen")
        .classList.remove(
            "hidden"
        );


}



// ==============================
// start


document.querySelector("#start")
    .addEventListener(
        "click",
        () => {
            game.level = 1;
            game.score = 0;
            game.coins = 0;

            enemies.forEach(
                (enemy, i) => {
                    enemy.speed =
                        enemyBasSpeed[i];
                }
            );

            resetLevel();
            game.running = true;

            document.querySelector("#screen")
                .classList.add(
                    "hidden"
                );

        }
    );





// ================================
// game loop

let lastTime = 0;
function loop(time) {
    const dt =
        Math.min(
            (time - lastTime) / 1000,
            0.05
        );

    lastTime = time;
    update(dt);

    draw();
    requestAnimationFrame(loop);
}

// ========================
// init

resetLevel();
requestAnimationFrame(loop);