class Striker
{
    constructor(x, y)
    {
        this.x=0;
        this.y=0;
        var striker_pro={restitution:1, density:100000, friction:5};
        this.img=loadImage("Striker.png");
        this.body=Bodies.circle(x, y, 19, striker_pro);
        
        World.add(world, this.body);
    }

    display()
    {
        push();
        imageMode(CENTER);
        ellipseMode(RADIUS);
        fill("red");
        strokeWeight(2);
        stroke("blue");
        ellipse(this.body.position.x, this.body.position.y, 19, 19);
        image(this.img, this.body.position.x, this.body.position.y, 35, 35);
        pop();
    }
}