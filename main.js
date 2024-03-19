const canvas = document.querySelector('canvas');
const c = canvas.getContext('2d');

canvas.width = 1200;
canvas.height = 600;
c.fillStyle = 'green';
c.fillRect(0, 0, canvas.width, canvas.height);

function sleep(ms = 0) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

class Sprite {
    constructor({ position, velocity, imageSrc }) {
        this.position = position;
        this.velocity = velocity;
        this.image = new Image();
        this.image.src = imageSrc;
        this.width = 70;
        this.height = 70;
    };

    async draw() {
        c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height);
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;

        // Check collision with player
        if (
            this.position.x < player.position.x + player.width &&
            this.position.x + this.width > player.position.x &&
            this.position.y < player.position.y + player.height &&
            this.position.y + this.height > player.position.y
        ) {
            if (this === HappyJajo) {
                // Increase score by 1
                score += 1;
                console.log(score);
                // Respawn HappyJajo in a random location
                this.position.x = Math.random() * (canvas.width - this.width);
                this.position.y = Math.random() * (canvas.height - this.height);
            } else if (this === AngryJajo) {
                // Decrease score by 1
                score -= 1;
                console.log(score);
                this.position.x = Math.random() * (canvas.width - this.width);
                this.position.y = Math.random() * (canvas.height - this.height);
            } else if (this === BoostJajo) {
                // Decrease score by 1
                score += 3;
                console.log(score);
                this.position.x = Math.random() * (canvas.width - this.width);
                this.position.y = Math.random() * (canvas.height - this.height);
            } else if (this === DeadJajo1 || this === DeadJajo2 || this === DeadJajo3 || this === DeadJajo4 || this === DeadJajo5 || this === DeadJajo6 || this === DeadJajo7) {
                // Decrease health by 1 when colliding with DeadJajo
                if (health > 0) {
                    health -= 1;
                }
                console.log("Health:", health);
                this.position.x = Math.random() * (canvas.width - this.width);
                this.position.y = Math.random() * (canvas.height - this.height);
            }
        }

        //kolizje ze scianami
        if (this.position.x < 0) {
            this.position.x = 0;
        } else if (this.position.x + this.width > canvas.width) {
            this.position.x = canvas.width - this.width;
        }
        if (this.position.y < 0) {
            this.position.y = 0;
        } else if (this.position.y + this.height > canvas.height) {
            this.position.y = canvas.height - this.height;
        }
    };
};

let score = 0;
let health = 3;

const player = new Sprite({
    position: {
        x: 500,
        y: 500
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/rabit.png"
});

const HappyJajo = new Sprite({
    position: {
        x: 300,
        y: 300
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/egg_pink.png"
});

const AngryJajo = new Sprite({
    position: {
        x: 800,
        y: 400
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/egg_red.png"
});

const BoostJajo = new Sprite({
    position: {
        x: 100,
        y: 100
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/egg_yello.png"
});

let DeadJajo1 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo2 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo3 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo4 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo5 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo6 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

let DeadJajo7 = new Sprite({
    position: {
        x: Math.random() * (canvas.width - 70),
        y: Math.random() * (canvas.height - 70)
    },
    velocity: {
        x: 0,
        y: 0
    },
    imageSrc: "assets/mina.png"
});

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    }
};

function checkGameOver() {
    if (health <= 0) {
        c.fillStyle = 'black';
        c.font = 'bold 60px Arial';
        c.fillText('GAME OVER!', canvas.width / 2 - 210, canvas.height / 2);
        // Add a restart button
        document.getElementById("RBTN").style.display = "block";
        document.getElementById("RBTN").addEventListener('click', restartGame);
        // Stop the game by canceling further animation frames
        cancelAnimationFrame(animationId);
    }
}

function animate() {
    animationId = window.requestAnimationFrame(animate);
    c.fillStyle = 'green';
    c.fillRect(0, 0, canvas.width, canvas.height);
    c.fillStyle = 'black';
    c.font = '20px Arial';
    c.fillText('Score: ' + score, 10, 30);
    c.fillText('Health: ' + health, 10, 60);
    player.draw();
    HappyJajo.draw();
    AngryJajo.draw();
    BoostJajo.draw();
    DeadJajo1.draw();
    DeadJajo2.draw();
    DeadJajo3.draw();
    DeadJajo4.draw();
    DeadJajo5.draw();
    DeadJajo6.draw();
    DeadJajo7.draw();
    checkGameOver();
}

document.addEventListener('keydown', function (event) {
    switch (event.key) {
        case 'a':
            if (keys.a.pressed == false) {
                player.velocity.x -= 2;
                keys.a.pressed = true;
            }
            break;
        case 'd':
            if (keys.d.pressed == false) {
                player.velocity.x += 2;
                keys.d.pressed = true;
            }
            break;
        case 'w':
            if (keys.w.pressed == false) {
                player.velocity.y -= 2;
                keys.w.pressed = true;
            }
            break;
        case 's':
            if (keys.s.pressed == false) {
                player.velocity.y += 2;
                keys.s.pressed = true;
            }
            break;
    }
});

document.addEventListener('keyup', function (event) {
    switch (event.key) {
        case 'a':
            if (keys.a.pressed == true) {
                player.velocity.x += 2;
                keys.a.pressed = false;
            }
            break;
        case 'd':
            if (keys.d.pressed == true) {
                player.velocity.x -= 2;
                keys.d.pressed = false;
            }
            break;
        case 'w':
            if (keys.w.pressed == true) {
                player.velocity.y += 2;
                keys.w.pressed = false;
            }
            break;
        case 's':
            if (keys.s.pressed == true) {
                player.velocity.y -= 2;
                keys.s.pressed = false;
            }
            break;
    }
});

function happyRandomMove() {
    let randNum = Math.floor(Math.random() * 9);
    switch (randNum) {
        case 1:
            HappyJajo.velocity.x = 0;
            HappyJajo.velocity.y = 0;
            break;
        case 2:
            HappyJajo.velocity.x = 0.5;
            HappyJajo.velocity.y = 0;
            break;
        case 3:
            HappyJajo.velocity.x = 0;
            HappyJajo.velocity.y = 0.5;
            break;
        case 4:
            HappyJajo.velocity.x = 0.5;
            HappyJajo.velocity.y = 0.5;
            break;
        case 5:
            HappyJajo.velocity.x = -0.5;
            HappyJajo.velocity.y = 0;
            break;
        case 6:
            HappyJajo.velocity.x = 0;
            HappyJajo.velocity.y = -0.5;
            break;
        case 7:
            HappyJajo.velocity.x = -0.5;
            HappyJajo.velocity.y = -0.5;
            break;
        case 8:
            HappyJajo.velocity.x = -0.5;
            HappyJajo.velocity.y = 0.5;
            break;
        case 0:
            HappyJajo.velocity.x = 0.5;
            HappyJajo.velocity.y = -0.5;
            break;
    }

    setTimeout(() => {
        happyRandomMove();
    }, 1000);

}
function angryRandomMove() {
    let randNum = Math.floor(Math.random() * 9);
    switch (randNum) {
        case 1:
            AngryJajo.velocity.x = 0;
            AngryJajo.velocity.y = 0;
            break;
        case 2:
            AngryJajo.velocity.x = 0.5;
            AngryJajo.velocity.y = 0;
            break;
        case 3:
            AngryJajo.velocity.x = 0;
            AngryJajo.velocity.y = 0.5;
            break;
        case 4:
            AngryJajo.velocity.x = 0.5;
            AngryJajo.velocity.y = 0.5;
            break;
        case 5:
            AngryJajo.velocity.x = -0.5;
            AngryJajo.velocity.y = 0;
            break;
        case 6:
            AngryJajo.velocity.x = 0;
            AngryJajo.velocity.y = -0.5;
            break;
        case 7:
            AngryJajo.velocity.x = -0.5;
            AngryJajo.velocity.y = -0.5;
            break;
        case 8:
            AngryJajo.velocity.x = -0.5;
            AngryJajo.velocity.y = 0.5;
            break;
        case 0:
            AngryJajo.velocity.x = 0.5;
            AngryJajo.velocity.y = -0.5;
            break;
    }

    setTimeout(() => {
        angryRandomMove();
    }, 1000);

};
function boostRandomMove() {
    let randNum = Math.floor(Math.random() * 9);
    switch (randNum) {
        case 1:
            BoostJajo.velocity.x = 0;
            BoostJajo.velocity.y = 0;
            break;
        case 2:
            BoostJajo.velocity.x = 0.5;
            BoostJajo.velocity.y = 0;
            break;
        case 3:
            BoostJajo.velocity.x = 0;
            BoostJajo.velocity.y = 0.5;
            break;
        case 4:
            BoostJajo.velocity.x = 0.5;
            BoostJajo.velocity.y = 0.5;
            break;
        case 5:
            BoostJajo.velocity.x = -0.5;
            BoostJajo.velocity.y = 0;
            break;
        case 6:
            BoostJajo.velocity.x = 0;
            BoostJajo.velocity.y = -0.5;
            break;
        case 7:
            BoostJajo.velocity.x = -0.5;
            BoostJajo.velocity.y = -0.5;
            break;
        case 8:
            BoostJajo.velocity.x = -0.5;
            BoostJajo.velocity.y = 0.5;
            break;
        case 0:
            BoostJajo.velocity.x = 0.5;
            BoostJajo.velocity.y = -0.5;
            break;
    }

    setTimeout(() => {
        boostRandomMove();
    }, 1000);

    
};

function deadRandomMove() {
    DeadJajo1.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo1.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo2.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo2.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo3.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo3.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo4.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo4.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo5.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo5.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo6.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo6.velocity.y = Math.random() * 1.5 - 0.75;

    DeadJajo7.velocity.x = Math.random() * 1.5 - 0.75;
    DeadJajo7.velocity.y = Math.random() * 1.5 - 0.75;
}

function restartGame() {
    score = 0;
    health = 3;
    // Reset player position
    player.position.x = 500;
    player.position.y = 500;
    // Restart the animation loop
    animate();
    // Reset the random movements for sprites
    happyRandomMove();
    angryRandomMove();
    boostRandomMove();
    deadRandomMove();
    document.getElementById("RBTN").style.display = "none";
}

let restartButton;

animate();
happyRandomMove();
angryRandomMove();
boostRandomMove();
deadRandomMove();
