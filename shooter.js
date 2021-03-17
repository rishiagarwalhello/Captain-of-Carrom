class Shooter
{
    constructor(pointA, bodyB)
    {
        var shooter_pro={pointA:pointA, bodyB:bodyB, stiffness:0.05, length:5};
        this.pointA=pointA;
        this.body=Constraint.create(shooter_pro);

        World.add(world, this.body);
    }

    display()
    {
        if(this.body.bodyB)
        {
            push();
            strokeWeight(3);
            stroke("black");
            line(this.pointA.x, this.pointA.y, this.body.bodyB.position.x, this.body.bodyB.position.y);
            pop();
        }
    }
}