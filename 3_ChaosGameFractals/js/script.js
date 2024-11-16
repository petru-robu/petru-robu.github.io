let polygons = [[], [], []];
let fractals = [[], [], []];
let factors = [0, 0, 0, 0.5, 0.618, 0.667, 0.692, 0.707, 0.742, 0.764]
let n;
let points;

function setup() 
{
    let canv = createCanvas(400, 400);
    canv.parent('engine');
    
    for(let n = 3; n <= 15; n++)
        polygons.push(buildPolygon(n));

    for(let n=3; n<=15; n++)
        fractals.push(calculatePoints(n, 15000, factors[n]));
}

function draw()
{
    background(255);
    drawPolygon();
    drawPoints();
}

function buildPolygon(n)
{
    let point_array = [];

    let radius = 150;  
    let cx = width / 2;
    let cy = height / 2;

    for (let i = 0; i < n; i++)
    { 
        let angle = TWO_PI * i / n;
        let px = cx + radius * cos(angle);
        let py = cy + radius * sin(angle);
        point_array.push([px, py]);
    }
    return point_array;
}

function drawPolygon() 
{
    beginShape();

    for(let i=0; i<polygons[n].length; i++)
    {
        vertex(polygons[n][i][0], polygons[n][i][1]);
    }

    endShape(CLOSE);
}

function interpolatePoint(p1, p2, factor) 
{
    let x1 = p1[0];
    let y1 = p1[1];
    let x2 = p2[0];
    let y2 = p2[1];

    const x = x1 + factor * (x2 - x1);
    const y = y1 + factor * (y2 - y1);
    return [x,y];
}


function calculatePoints(n, limit, factor)
{
    let lp = [width/2, height/2];
    let points = [];
    points.push(lp);

    let randomVertex;
    while(limit > 0)
    {
        randomVertex = Math.floor(Math.random() * n);
        let new_p = interpolatePoint(lp, polygons[n][randomVertex], factor);
        
        points.push(new_p);
        lp = new_p;
        limit--;
    }

    return points;
}

function drawPoints()
{
    for(let i=0; i<fractals[n].length; i++)
        point(fractals[n][i][0], fractals[n][i][1]);
}

function manageSlider()
{
    let rangeslider = document.getElementById("sliderRange");
    let output = document.getElementById("demo");
    
    output.innerHTML = rangeslider.value;
    n = rangeslider.value;
    
    rangeslider.oninput = function () {
        output.innerHTML = this.value;
        n = this.value;
    }

}

manageSlider();
