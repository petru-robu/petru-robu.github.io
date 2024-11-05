function getRandomArbitrary(min, max) {
  return (int)(Math.random() * (max - min) + min);
}

let di = [0, -1, 1, 0, -1, 1, -1, 1]
let dj = [1, 1, 1, -1, -1, -1, 0, 0]

let color_white;
let color_black;
let color_red1, color_red2, color_blue;
let color_gray5, color_gray4, color_gray3, color_gray2, color_gray1;

let cols, rows, res=40;
let grid;
let state=0;
let game_state = 0;
let remaining_mines = 30;

let right_pressed = false;

class Queue {
  constructor() {
    this.elements = {};
    this.head = 0;
    this.tail = 0;
  }
  push(element) {
    this.elements[this.tail] = element;
    this.tail++;
  }
  pop() {
    const item = this.elements[this.head];
    delete this.elements[this.head];
    this.head++;
    return item;
  }
  top() {
    return this.elements[this.head];
  }
  get length() {
    return this.tail - this.head;
  }
  get empty() {
    return this.length === 0;
  }
}

function Cell(adj, is_wall, is_flagged, is_bomb)
{
  this.adj = adj;
  this.is_wall = is_wall;
  this.is_flagged = is_flagged;
  this.is_bomb = is_bomb;
  this.ended_here = 0;
}

function matrice(cols, rows)
{
  let arr = [];
  for(let i=0;i<cols;i++)
  {
    arr.push([]);
    for(let j=0;j<rows;j++)
      arr[i].push(new Cell(0, 1, 0, 0));
  }
  return arr;
}

function setup()
{
  //window.addEventListener("contextmenu", e => e.preventDefault());
  color_white = color(255, 255, 255); color_black = color(0, 0, 0);
  color_red1 = color(255, 200, 200); color_gray5 = color(70, 70, 70);
  color_gray4 = color(75, 75, 75); color_gray3 = color(120, 120, 120);
  color_gray2 = color(180, 180, 180); color_blue = color(153, 153, 255);
  color_red2 = color(255, 27, 27);

  var canv=createCanvas(644, 644);
  background(color_white);

  canv.parent('engine');

  cols= rows = 16;
  grid = matrice(rows, cols);

  calculate_remaining_mines();
}

function draw()
{
  background(10);
  frameRate(60);

  for(let i=0;i<cols;i++)
    for(let j=0;j<rows;j++)
    {
      let x = i*res+2;
      let y = j*res+2;

      stroke(color_gray5);
      strokeWeight(2);
      
      if(grid[i][j].is_wall == 1)
      {
        if(grid[i][j].is_flagged == 1)
          fill(color_blue);
        else
          fill(color_gray3);
        rect(x,y,res,res);
      }
      else
      {
        fill(color_white);
        if(grid[i][j].ended_here)
          fill(color_red1);

        rect(x,y,res,res);
        if(grid[i][j].is_bomb)
        {
          fill(color_red2);
          strokeWeight(0);
          textSize(32);
          text('B', x+12, y+31);
        }
        else if(grid[i][j].adj != 0)
        {
          fill(color_black);
          strokeWeight(0);
          textSize(20);
          text(grid[i][j].adj, x+13, y+26);
        }
        strokeWeight(2);
      }
    }
}

function mousePressed(event) 
{
    let r = (mouseX - (mouseX % res)) / res;
    let c = (mouseY - (mouseY % res)) / res;
    
    if (r<= width && c<= width) 
    {
      if(event.button == 0 && game_state == 0)
      {
        gen_game(r, c);
        game_state = 1;
      }

      if(event.button == 0)
      {
        if(grid[r][c].is_bomb)
        {
          grid[r][c].ended_here = 1;
          for(let i=0;i<cols;i++)
            for(let j=0;j<rows;j++)
              grid[i][j].is_wall = 0;
        }
        if(grid[r][c].adj == 0)
          remove_adj(r, c);

        grid[r][c].is_wall = 0;
        grid[r][c].is_flagged = 0;
      }
      else if(event.button == 2)
      {
        if(grid[r][c].is_wall == 1 && !grid[r][c].is_flagged)
          grid[r][c].is_flagged = 1;
        else
          grid[r][c].is_flagged = 0;
      }   
    }
}

function remove_adj(r, c)
{
  cp_gr = [];
  for(let i=0; i<rows; i++)
  {
    cp_gr.push([]);
    for(let j=0; j<cols; j++)
      if(!grid[i][j].is_bomb)
        cp_gr[i].push(0);
      else
        cp_gr[i].push(-1);
  }
  const Q = new Queue();

  Q.push([r, c]);
  console.log(Q.top());
  console.log(Q.top()[1]);

  while(!Q.empty)
  {
    let a = Q.top()[0];
    let b = Q.top()[1];
    Q.pop();
  
    for(let k=0; k<8; k++)
    {
      let veci = a + di[k];
      let vecj = b + dj[k];

      if(veci >= 0 && veci < rows && vecj >= 0 && vecj < rows)
        if(cp_gr[veci][vecj] == 0)
        {
          if(grid[veci][vecj].adj == 0)
            Q.push([veci, vecj]);
          cp_gr[veci][vecj] = 1;
        }
    }
  }

  for(let i=0; i<rows; i++)
    for(let j=0; j<cols; j++)
      if(cp_gr[i][j] > 0)
        grid[i][j].is_wall = 0;
}


function new_game()
{
  for(let i=0;i<cols;i++)
      for(let j=0;j<rows;j++)
      {
        grid[i][j].adj = 0;
        grid[i][j].is_wall = 1;
        grid[i][j].is_flagged = 0;
        grid[i][j].is_bomb = 0;
        grid[i][j].ended_here = 0;
      }
  game_state = 0;
}

function gen_game(blacki, blackj)
{
    for(let i=0;i<cols;i++)
      for(let j=0;j<rows;j++)
      {
        grid[i][j].adj=0;
        grid[i][j].is_wall = 1;
        grid[i][j].is_bomb = 0;
      }

    let cnt = 40;

    while(cnt)
    {
      let i_rnd = getRandomArbitrary(0, cols);
      let j_rnd = getRandomArbitrary(0, rows);

      if(i_rnd <= blacki + 1 && i_rnd >= blacki - 1 && j_rnd <= blackj + 1 && j_rnd >= blackj - 1)
        continue;

      if(grid[i_rnd][j_rnd].is_bomb || (i_rnd == blacki) && (j_rnd == blackj))
        continue;
    
      let no_of_adj_mines = 0;
      for(let k=0; k<8; k++)
        if(i_rnd + di[k] >= 0 && i_rnd + di[k] < rows && j_rnd + dj[k] >= 0 && j_rnd + dj[k] < cols)
          if(grid[i_rnd + di[k]][j_rnd + dj[k]].is_bomb)
            no_of_adj_mines++;

      if(no_of_adj_mines > 4)
        continue;
      
      grid[i_rnd][j_rnd].is_bomb = 1;
      cnt--;
    }

    for(let i=0;i<cols;i++)
      for(let j=0;j<rows;j++)
        for(let k=0; k<8; k++)
          if(i + di[k] >= 0 && i + di[k] < rows && j + dj[k] >= 0 && j + dj[k] < cols)
            if(grid[i + di[k]][j+ dj[k]].is_bomb)
              grid[i][j].adj++;
}

function calculate_remaining_mines()
{
  let cnt = 0;
  for(let i=0;i<cols;i++)
      for(let j=0;j<rows;j++)
      {
        if(grid[i][j].is_bomb && !grid[i][j].is_flagged)
          cnt++;
      }
  remaining_mines = cnt;
}