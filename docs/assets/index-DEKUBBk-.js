var t=Object.defineProperty,e=(e,i,s)=>((e,i,s)=>i in e?t(e,i,{enumerable:!0,configurable:!0,writable:!0,value:s}):e[i]=s)(e,"symbol"!=typeof i?i+"":i,s);import{p as i}from"./phaser-DM0uoNMb.js";!function(){const t=document.createElement("link").relList;if(!(t&&t.supports&&t.supports("modulepreload"))){for(const t of document.querySelectorAll('link[rel="modulepreload"]'))e(t);new MutationObserver((t=>{for(const i of t)if("childList"===i.type)for(const t of i.addedNodes)"LINK"===t.tagName&&"modulepreload"===t.rel&&e(t)})).observe(document,{childList:!0,subtree:!0})}function e(t){if(t.ep)return;t.ep=!0;const e=function(t){const e={};return t.integrity&&(e.integrity=t.integrity),t.referrerPolicy&&(e.referrerPolicy=t.referrerPolicy),"use-credentials"===t.crossOrigin?e.credentials="include":"anonymous"===t.crossOrigin?e.credentials="omit":e.credentials="same-origin",e}(t);fetch(t.href,e)}}();const s=1024,r=786,o="#222831",a="Henny Penny, Arial, system-ui";class l extends i.Scene{constructor(){super("Menu")}createTitletext(){this.add.text(512,196.5,"Ghost Hero",{fontFamily:a,fontSize:"120px",color:"#222831"}).setOrigin(.5)}createPlayButton(){const t=this.add.text(512,589.5,"Play",{fontFamily:"Arial",fontSize:"32px",color:"#ffffff",align:"center",fixedWidth:260,backgroundColor:o}).setPadding(32).setOrigin(.5);t.setInteractive({useHandCursor:!0}),t.on("pointerover",(()=>{t.setBackgroundColor("#393E46")})),t.on("pointerout",(()=>{t.setBackgroundColor(o)})),t.on("pointerdown",(()=>{this.scene.stop("Menu"),this.scene.launch("Game")}))}create(){this.createTitletext(),this.createPlayButton()}}class n extends i.Scene{constructor(){super("Game"),e(this,"cursor"),e(this,"player"),e(this,"fireBalls"),e(this,"timer"),e(this,"playerHealth"),e(this,"fireBallCounter"),e(this,"textHealth"),e(this,"textPoints"),e(this,"points"),e(this,"emitter")}preload(){this.load.setPath("assets"),this.load.image("ghost","ghost.png"),this.load.image("fireball","fireball.png")}gameOver(){this.player.setVisible(!1),this.fireBalls.forEach((t=>t.setVisible(!1))),this.scene.pause(),this.scene.launch("Pause")}collision(t,e){let i=e.getData("id");this.fireBalls=this.fireBalls.filter((t=>t.getData("id")!==i)),e.destroy(!0),this.playerHealth-=1,this.textHealth.setText(`Health: ${"❤️ ".repeat(this.playerHealth)}`),this.emitter.start(),this.playerHealth<=0&&this.gameOver()}getAndIncFireballCounter(){let t=this.fireBallCounter;return this.fireBallCounter+=1,t}createFireBall(){const t=Math.floor(4*Math.random());const e=this.physics.add.image(-50,-50,"fireball").setOrigin(.5,.5).setScale(.3,.3);0===t?e.setPosition(this.getRandomX(),-50).setVelocityY(400):1===t?e.setPosition(this.getRandomX(),836).setVelocityY(-400).setRotation(Math.PI):2===t?e.setPosition(-50,this.getRandomY()).setVelocityX(400).setRotation(3*Math.PI/2):3===t&&e.setPosition(1074,this.getRandomY()).setVelocityX(-400).setRotation(Math.PI/2),e.setData("id",this.getAndIncFireballCounter()),this.physics.add.overlap(this.player,e,this.collision,void 0,this),this.fireBalls.push(e)}getRandomX(){return Math.floor(Math.random()*s)}getRandomY(){return Math.floor(Math.random()*r)}create(){var t;this.fireBalls=[],this.playerHealth=3,this.fireBallCounter=1,this.points=0,this.player=this.physics.add.image(512,393,"ghost").setOrigin(.5,.5).setScale(.5,.5).setCollideWorldBounds(!0),this.cursor=null==(t=this.input.keyboard)?void 0:t.createCursorKeys(),this.timer=this.time.addEvent({delay:250,callback:()=>this.createFireBall(),callbackScope:this,loop:!0}),this.textHealth=this.add.text(10,10,`Health: ${"❤️ ".repeat(this.playerHealth)}`,{font:"25px Arial",color:"#000000"}),this.textPoints=this.add.text(874,10,`Points: ${this.points}`,{font:"25px Arial",color:"#000000"}),this.emitter=this.add.particles(0,0,"fireball",{speed:250,gravityY:250,scale:.1,duration:50,emitting:!1,rotate:{onEmit:t=>0,onUpdate:t=>t.angle+2}}),this.emitter.startFollow(this.player,0,0,!0)}handleUserInput(){if(!this.cursor)return;const{left:t,right:e,up:i,down:s}=this.cursor;t.isDown&&e.isDown?this.player.setVelocityX(0):t.isDown?this.player.setVelocityX(-300):e.isDown?this.player.setVelocityX(300):this.player.setVelocityX(0),i.isDown&&s.isDown?this.player.setVelocityY(0):i.isDown?this.player.setVelocityY(-300):s.isDown?this.player.setVelocityY(300):this.player.setVelocityY(0)}isFireBallOffScreen(t){return t.x+t.width/2<0||t.x-t.width/2>s||t.y+t.height/2<0||t.y-t.height/2>r}handleFireBallMovement(){if(0===this.fireBalls.length)return;let t=this.fireBalls.filter((t=>!this.isFireBallOffScreen(t)));this.fireBalls.filter((t=>this.isFireBallOffScreen(t))).forEach((t=>{t.destroy(!0),this.points+=1,this.textPoints.setText(`Points: ${this.points}`)})),this.fireBalls=t}update(){this.handleUserInput(),this.handleFireBallMovement()}}class h extends Phaser.Scene{constructor(){super("Pause")}create(){var t;this.add.text(512,262,"Game over!",{fontFamily:a,fontSize:"100px",color:"#000000"}).setOrigin(.5,.5),this.add.text(512,524,"Press Enter key to restart",{font:"50px Arial",color:"#000000"}).setOrigin(.5,.5),null==(t=this.input.keyboard)||t.on("keydown-ENTER",(()=>{this.scene.stop("Pause"),this.scene.launch("Game")}))}}const c={type:i.AUTO,width:s,height:r,parent:"game-container",backgroundColor:"#00ADB5",scale:{mode:i.Scale.FIT,autoCenter:i.Scale.CENTER_BOTH},physics:{default:"arcade",arcade:{debug:!1}},scene:[l,n,h]};new i.Game(c);
