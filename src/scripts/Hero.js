import * as PIXI from "pixi.js";
import { Globals } from "./Globals";

export class Hero {
    constructor() {
        this.score = 0;
        this.dy = 0;
        this.jumpIndex = 0;
        this.platform = null;
        console.log(Globals.resources)
        this.sprite = new PIXI.AnimatedSprite([
            Globals.resources["Run1"].texture,
            Globals.resources["Run2"].texture,
            Globals.resources["Run3"].texture,
            Globals.resources["Run4"].texture,
            Globals.resources["Run5"].texture,
            Globals.resources["Run6"].texture,
            Globals.resources["Run7"].texture,
            Globals.resources["Run8"].texture
        ]);
        this.sprite.x = 100;
        this.sprite.y = 100;
        this.sprite.loop = true;
        this.sprite.animationSpeed = 0.1;
        this.sprite.play();
    }

    collectDiamond() {
        ++this.score;
        this.sprite.emit("score");
    }

    startJump() {
        if (this.platform || this.jumpIndex === 1) {
            ++this.jumpIndex;
            this.platform = null;
            this.dy = -22;
        }
    }

    get left() {
        return this.sprite.x;
    }

    get right() {
        return this.left + this.sprite.width;
    }

    get top() {
        return this.sprite.y;
    }

    get bottom() {
        return this.top + this.sprite.height;
    }

    get nextbottom() {
        return this.bottom + this.dy;
    }

    stayOnPlatform(platform) {
        this.platform = platform;
        this.dy = 0;
        this.jumpIndex = 0;
        this.sprite.y = platform.top - this.sprite.height;
    }

    moveByPlatform(platform) {
        this.sprite.x = platform.nextleft - this.sprite.width;
    }

    update() {
        if (!this.platform) {
            ++this.dy;
            this.sprite.y += this.dy;
        }

        if (this.sprite.y > window.innerHeight) {
            this.sprite.emit("die");
        }
    }
}