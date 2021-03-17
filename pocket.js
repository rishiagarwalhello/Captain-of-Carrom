class Pocket
{
    constructor(x, y)
    {
        this.x=0;
        this.y=0;
        var pocket_pro={isStatic:true};
        this.body=Bodies.circle(x, y, 18, pocket_pro);
    }

    display()
    {
        push();
        ellipseMode(RADIUS);
        //noFill();
        fill("grey");
        strokeWeight(4);
        stroke("gold");
        ellipse(this.body.position.x, this.body.position.y, 18, 18);
        pop();
    }
}