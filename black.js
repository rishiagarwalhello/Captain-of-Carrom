class Black
{
    constructor(x, y)
    {
        this.x=0;
        this.y=0;
        var striker_pro={restitution:0.5, density:100000, friction:5};
        this.body=Bodies.circle(x, y, 10, striker_pro);
        
        World.add(world, this.body);
    }

    display()
    {
        push();
        ellipseMode(RADIUS);
        fill("black");
        noStroke();
        ellipse(this.body.position.x, this.body.position.y, 10, 10);
        pop();
    }
}