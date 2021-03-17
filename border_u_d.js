class Border_U_D
{
    constructor(x, y, width, height)
    {
        this.x=0;
        this.y=0;
        this.width=595;
        this.height=30;
        var border_pro={restitution:1.5, density:1000, isStatic:true}
        this.body=Bodies.rectangle(x, y, width, height, border_pro);

        World.add(world, this.body);
    }

    display()
    {
        push();
        rectMode(CENTER);
        fill("brown");
        noStroke();
        rect(this.body.position.x, this.body.position.y, this.width, this.height);
        pop();
    }
}