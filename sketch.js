const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

var engine, world; //Physics Engine

var bg_title, bg_inst, bg_play; //Background
var title_l1, title_l2, title_l3, title_l1_img, title_l2_img, title_l3_img; //Title of the Game
var view_inst, view_inst_img; //View Instructions Button
var start, start_img; //Start Game Button
var carrom; //Carrom Board
var left, right, up, down; //Borders
var striker; //Striker
var shooter; //Shooter
var w1, w2, w3, w4, w5, w6, w7, w8, w9; //White Tokens
var b1, b2, b3, b4, b5, b6, b7, b8, b9; //Black Tokens
var queen; //Queen Token
var pocket1, pocket2, pocket3, pocket4; //Pckets
var score_p1=0, score_p2=0; //Scores of the Players
var title="Title of the Game", inst="Viewing Instructions", play="Playing"; //Gamestates
var gs=title; //Default Gamestate
var pl1="Player 1", pl2="Player 2"; //Players' Chance
var pl; //Current Player's Chance
var positioned="Striker is Positioned", shooted="Striker is Shooted"; //Playstates
var striker_current=positioned; //Current Position of Striker

function preload()
{
    bg_title=loadImage("bg_title.png");
    title_l1_img=loadImage("title_l1.png");
    title_l2_img=loadImage("title_l2.png");
    title_l3_img=loadImage("title_l3.png");
    view_inst_img=loadImage("view_inst.png");
    start_img=loadImage("start.png");
    bg_play=loadImage("bg_play.png");
    carrom=loadImage("Carrom.png");
}

function setup()
{
    createCanvas(1000, 600);

    engine=Engine.create();
    world=engine.world;

    title_l1=createSprite(500, -25);
    title_l1.addImage(title_l1_img);
    title_l1.scale=1.5;
    title_l1.velocityY=20;

    title_l2=createSprite(-25, 300);
    title_l2.addImage(title_l2_img);
    title_l2.scale=1.5;

    title_l3=createSprite(500, 625);
    title_l3.addImage(title_l3_img);
    title_l3.scale=1.5;

    view_inst=createSprite(1200, 500);
    view_inst.addImage(view_inst_img);

    start=createSprite(850, 555);
    start.addImage(start_img);

    left=new Border_L_R(420, 300, 30, 595);
    right=new Border_L_R(980, 300, 30, 595);
    up=new Border_U_D(700, 20, 595, 30);
    down=new Border_U_D(700, 580, 595, 30);

    striker=new Striker(700, 470);

    shooter=new Shooter({x:700, y:470}, striker.body);

    w1=new White(700, 276);
    b1=new Black(720, 275+(44/3));
    w2=new White(720, 297+(44/3));
    b2=new Black(700, 320);
    w3=new White(680, 297+(44/3));
    b3=new Black(680, 275+(44/3));
    w4=new White(700, 254);
    b4=new Black(720, 265+(11/3));
    w5=new White(740, 265+(44/3));
    b5=new Black(740, 287+(44/3));
    w6=new White(740, 309+(44/3));
    b6=new Black(720, 319+(44/3));
    w7=new White(700, 342);
    b7=new Black(680, 319+(44/3));
    w8=new White(660, 309+(44/3));
    b8=new Black(660, 287+(44/3));
    w9=new White(660, 265+(44/3));
    b9=new Black(680, 265+(11/3));

    queen=new Queen(700, 298);

    pocket1=new Pocket(452, 52);
    pocket2=new Pocket(946, 52);
    pocket3=new Pocket(452, 544);
    pocket4=new Pocket(946, 546);
}

function draw()
{
    current_time();

    if(gs==title)
    {
        background(bg_title);

        start.visible=false;

        if(title_l1.y>=225)
        {
            title_l1.velocityY=0;
            title_l2.velocityX=20;
        }
        if(title_l2.x>=500)
        {
            title_l2.velocityX=0;
            title_l3.velocityY=-20
        }
        if(title_l3.y<=375)
        {
            title_l3.velocityY=0;
            view_inst.velocityX=-20;
        }
        if(view_inst.x<=200)
        {
            view_inst.velocityX=0;
        }
        if(mousePressedOver(view_inst))
        {
            gs=inst;
        }

        drawSprites();
    }

    if(gs==inst)
    {
        background("gold");

        title_l1.destroy();
        title_l2.destroy();
        title_l3.destroy();
        view_inst.destroy();

        textSize(40);
        strokeWeight(4);
        stroke("purple");
        fill("lightblue");
        text("👉🏻 Instructions for the Game 👇🏻", 240, 50);

        textSize(25);
        strokeWeight(3);
        stroke("green");
        fill("white");
        text("1.  Player 1 will have White Colour and Player 2 will have Black Colour...", 25, 120);
        text("2.  After Player 1, the chance will automatically pass on to Player 2, and vice-versa...", 25, 170);
        text("3.  The striker needs to be dragged and released to shoot...", 25, 220);
        text("4.  Each of the White token falling into the pocket counts 1 point for Player 1...", 25, 270);
        text("5.  Each of the Black token falling into the pocket counts 1 point for Player 2...", 25, 320);
        text("6.  The Queen falling into the pocket counts 5 points for the Player, who shooted it...", 25, 370);
        text("7.  For achieving the Queen, the same Player needs to pocket another token of", 25, 420);
        text("their colour in the very next chance...", 60, 450);
        text("8.  Each pocketing of the Player's own colour token provides the Player", 25, 500);
        text("an extra chance after pocketing...", 60, 530);

        start.visible=true;

        drawSprites();

        if(mousePressedOver(start))
        {
            gs=play;
        }
    }

    if(gs==play)
    {
        start.destroy();

        background(bg_play);

        imageMode(CENTER);
        rectMode(CENTER);
        ellipseMode(RADIUS);

        fill("blue");
        stroke("red");
        rect(width/2, height/2-10, 950, 30);

        image(carrom, 700, 300, 595, 595);

        strokeWeight(2);
        stroke("white");
        line(110, 95, 310, 95);
        line(110, 395, 310, 395);

        textSize(50);
        fill("gold");
        strokeWeight(4);
        stroke("green");
        text("Player 1", 120, 90);
        text("Player 2", 120, 390);

        textSize(40);
        fill("orange");
        strokeWeight(2);
        stroke("white");
        text("( White )", 135, 135);
        text("( Black )", 135, 435);

        textSize(50);
        fill("red");
        strokeWeight(3);
        stroke("blue");
        text("Score :: "+score_p1+" Points", 25, 210);
        text("Score :: "+score_p2+" Points", 25, 510);

        drawSprites();

        pocket1.display();
        pocket2.display();
        pocket3.display();
        pocket4.display();

        striker.display();

        queen.display();

        w1.display();
        b1.display();
        w2.display();
        b2.display();
        w3.display();
        b3.display();
        w4.display();
        b4.display();
        w5.display();
        b5.display();
        w6.display();
        b6.display();
        w7.display();
        b7.display();
        w8.display();
        b8.display();
        w9.display();
        b9.display();

        console.log(pl);
        console.log(striker_current);
    
        pl=pl1;

        if(mouseDown() && mouseDidMove())
        {
            Body.set(shooter.body, {bodyB:striker.body});
            Body.setPosition(striker.body, {x:mouseX-150, y:mouseY-10});
        }
        else
        {
            Body.set(shooter.body, {bodyB:null});

            if(pl==pl1)
            {
                Body.setPosition(striker.body, {x:700, y:470});
                Body.set(shooter.body, {bodyB:striker.body});

                textSize(20);
                fill("white");
                strokeWeight(2);
                stroke("green");
                text("Current Chance --> Player 1", 50, 300);

                if(dist(pocket1.body.position.x, pocket1.body.position.y, w1.body.position.x, w1.body.position.y)<=5)
                {
                    Body.setPosition(w1.body, {x:-20, y:-20});
                    World.remove(world, w1.body);
                }
                
                if(striker.body.speed<=1 && striker.body.speed>0)
                {
                    pl=pl2;
                }
            }
            else
            {
                Body.setPosition(striker.body, {x:700, y:470});
                Body.set(shooter.body, {bodyB:striker.body});

                textSize(20);
                fill("white");
                strokeWeight(2);
                stroke("green");
                text("Current Chance --> Player 2", 50, 300);

                if(dist(pocket1.body.position.x, pocket1.body.position.y, b1.body.position.x, b1.body.position.y)<=5)
                {
                    Body.setPosition(b1.body, {x:-20, y:-20});
                    World.remove(world, b1.body);
                }

                if(striker.body.speed<=1 && striker.body.speed>0)
                {
                    Body.setPosition(striker.body, {x:700, y:470});
                    Body.set(shooter.body, {bodyB:striker.body});
                    pl=pl1;
                }
            }
        }
        
        Engine.update(engine);
    }
}

function mouseDragged()
{
}
function mouseReleased()
{
}

async function current_time()
{
    var response = await fetch("https://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var res_type = await response.json();
    var hr=res_type.datetime.slice(11, 13);
    var min=res_type.datetime.slice(14, 16);
    var sec=res_type.datetime.slice(17, 19);
    console.log("Current Time is :: "+hr+":"+min+":"+sec);
}