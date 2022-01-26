
function matrice(cols, rows)
{
  let arr = new Array(cols);
  for(let i=0;i<cols;i++)
  {
    arr[i]= new Array(rows);
  }
  for(let i=0;i<cols;i++)
    for(let j=0;j<rows;j++) arr[i][j]=0;
  return arr;
}

let cols, rows, res=20;
let grid;
let state=0;
let gnr;
let matc;

function setup()
{
  var canv=createCanvas(1000, 600);
  canv.parent('engine');
  gnr=0;
  cols= width/res;
  rows= height/res;
  grid = matrice(cols, rows);
}


//POPULAREA MATRICII LA CLICK STG
function mousePressed() {
  let r = (mouseX - (mouseX % res)) / res;
  let c = (mouseY - (mouseY % res)) / res;
  if (r<= width && c<= width) { // Valid row, col
    grid[r][c] = -1 * grid[r][c] + 1; // Invert the cell
  }
}

function get_mat()
{
  for(let i=0;i<cols;i++)
    for(let j=0;j<rows;j++)
      if(grid[i][j]==1)
      {
        let strg="grid["+i+']'+'['+j+']'+"=1;";
        console.log(strg);
      }
}




//FUNCTIILE BUTOANELOR
function startGame() {
  if (state == 0) state = 1;
}

function stopGame() {
  if (state == 1) state = 0;
}

function clr_grid()
{
  for(let i=0;i<cols;i++)
    for(let j=0;j<rows;j++) grid[i][j]=0;
  gnr=0;
}

function random_set()
{
  for(let i=3;i<cols-3;i++)
    for(let j=3;j<rows-3;j++) grid[i][j]= floor(random(2));
}



//UPDATARE MATRICE ( FRAME BY FRAME )
function draw()
{
  background(10);
  frameRate(8);

  for(let i=0;i<cols;i++)
    for(let j=0;j<rows;j++)
    {

      let x=i*res;
      let y=j*res;
      if(grid[i][j]==1)
      {
        stroke(190);
        fill(230);
        rect(x,y,res,res);
      }
    }
    noStroke();
    fill(140);
    let s = "generatia:"+' '+gnr;
    let r;
    if(state==1) r = "ruleaza: DA";
    else r = "ruleaza: NU";

    text(s, 10, 20);
    text(r, 10, 40);

    if(state==1)
    {
      let next=matrice(cols, rows);
      for(let i=0;i<cols;i++)
        for(let j=0;j<rows;j++)
        {
            let n=nr_vecini_in_viata(grid,i,j);
            if(grid[i][j]==0&&n==3) next[i][j] = 1;
               else if(grid[i][j]==1&&(n<2||n>3)) next[i][j] = 0;
                       else next[i][j]=grid[i][j];
        }

      grid=next;
      gnr++;
    }
}



//NR DE VECINI IN VIATA AL UNEI CELULE
function nr_vecini_in_viata(grid, x, y)
{
  let sum=0;
  for(let i=-1; i<2; i++)
    for(let j=-1; j<2; j++)
    {
      let col= (x+i+cols)%cols;
      let row= (y+j+rows)%rows;
      sum+=grid[col][row];
    }

  sum-=grid[x][y];
  return sum;
}




function p1()
{
  clr_grid();
  grid[19][13]=1;
  grid[19][14]=1;
  grid[20][12]=1;
  grid[20][14]=1;
  grid[21][12]=1;
  grid[21][14]=1;
  grid[22][13]=1;
  grid[22][14]=1;

}

function p2()
{
  clr_grid();
  grid[14][15]=1;
   grid[15][14]=1;
   grid[15][16]=1;
   grid[16][14]=1;
   grid[16][16]=1;
   grid[17][14]=1;
   grid[17][16]=1;
   grid[17][17]=1;
   grid[18][14]=1;
  grid[19][15]=1;
  grid[19][16]=1;
  grid[19][17]=1;
  grid[20][17]=1;
}

function p3()
{
  clr_grid();
  grid[4][14]=1;
  grid[5][12]=1;
  grid[5][13]=1;
  grid[5][14]=1;
  grid[5][15]=1;
  grid[5][16]=1;
  grid[6][11]=1;
  grid[6][17]=1;
  grid[7][9]=1;
  grid[7][12]=1;
  grid[7][13]=1;
  grid[7][14]=1;
  grid[7][15]=1;
  grid[7][16]=1;
  grid[7][19]=1;
  grid[8][9]=1;
  grid[8][10]=1;
  grid[8][12]=1;
  grid[8][14]=1;
  grid[8][16]=1;
  grid[8][18]=1;
  grid[8][19]=1;
  grid[9][10]=1;
  grid[9][12]=1;
  grid[9][14]=1;
  grid[9][16]=1;
  grid[9][18]=1;
  grid[10][10]=1;
  grid[10][12]=1;
  grid[10][16]=1;
  grid[10][18]=1;
  grid[11][11]=1;
  grid[11][17]=1;
  grid[12][12]=1;
  grid[12][13]=1;
  grid[12][14]=1;
  grid[12][15]=1;
  grid[12][16]=1;
  grid[14][14]=1;
  grid[15][13]=1;
  grid[15][15]=1;
  grid[16][14]=1;
}

function p4()
{
  clr_grid();
  grid[13][11]=1;
  grid[13][12]=1;
  grid[14][11]=1;
  grid[15][14]=1;
  grid[16][13]=1;
  grid[16][14]=1;
}

function p5()
{
  clr_grid();
  grid[7][21]=1;
  grid[7][22]=1;
  grid[8][22]=1;
  grid[9][20]=1;
  grid[10][18]=1;
  grid[10][20]=1;
  grid[12][16]=1;
  grid[12][18]=1;
  grid[14][14]=1;
  grid[14][16]=1;
  grid[16][13]=1;
  grid[16][14]=1;
  grid[17][11]=1;
  grid[18][11]=1;
  grid[18][12]=1;
  grid[19][9]=1;
  grid[19][10]=1;
  grid[20][10]=1;
  grid[21][7]=1;
  grid[21][9]=1;
  grid[22][6]=1;
  grid[23][6]=1;
  grid[23][7]=1;

}

function p6()
{
  clr_grid();
  grid[12][14]=1;
  grid[12][16]=1;
  grid[12][19]=1;
  grid[13][14]=1;
  grid[13][15]=1;
  grid[13][16]=1;
  grid[13][18]=1;
  grid[13][20]=1;
  grid[13][21]=1;
  grid[14][13]=1;
  grid[14][20]=1;
  grid[15][14]=1;
  grid[15][20]=1;
  grid[15][21]=1;
  grid[17][13]=1;
  grid[17][14]=1;
  grid[17][20]=1;
  grid[18][14]=1;
  grid[18][21]=1;
  grid[19][13]=1;
  grid[19][14]=1;
  grid[19][16]=1;
  grid[19][18]=1;
  grid[19][19]=1;
  grid[19][20]=1;
  grid[20][15]=1;
  grid[20][18]=1;
  grid[20][20]=1;

}

function p7()
{
  clr_grid();
  grid[19][13]=1;
  grid[19][14]=1;
  grid[20][13]=1;
  grid[21][10]=1;
  grid[21][11]=1;
  grid[21][13]=1;
  grid[22][10]=1;
  grid[22][11]=1;
  grid[22][13]=1;
  grid[22][14]=1;
}

function p8()
{
    clr_grid();
  grid[25][14]=1;
  grid[26][12]=1;
  grid[26][14]=1;
  grid[26][16]=1;
  grid[27][14]=1;
  grid[28][11]=1;
  grid[28][12]=1;
  grid[28][14]=1;
  grid[28][16]=1;
  grid[28][17]=1;
  grid[29][14]=1;
  grid[30][13]=1;
  grid[30][15]=1;

}

function p9()
{
  clr_grid();
  grid[15][13]=1;
  grid[15][14]=1;
  grid[15][15]=1;
  grid[16][14]=1;
  grid[16][16]=1;
  grid[17][15]=1;
  grid[17][16]=1;
  grid[18][16]=1;

}

function p10()
{
  clr_grid();
  grid[12][13]=1;
  grid[12][14]=1;
  grid[13][13]=1;
  grid[13][14]=1;
  grid[15][13]=1;
  grid[15][14]=1;
  grid[15][15]=1;
  grid[15][16]=1;
  grid[16][12]=1;
  grid[16][17]=1;
  grid[17][12]=1;
  grid[17][13]=1;
  grid[17][17]=1;
  grid[18][16]=1;
  grid[19][17]=1;
  grid[19][18]=1;
  grid[19][19]=1;
  grid[20][19]=1;
}

function p11()
{

  clr_grid();
  grid[12][12]=1;
  grid[12][15]=1;
  grid[12][17]=1;
  grid[12][20]=1;
  grid[13][12]=1;
  grid[13][15]=1;
  grid[13][17]=1;
  grid[13][20]=1;
  grid[14][11]=1;
  grid[14][12]=1;
  grid[14][15]=1;
  grid[14][17]=1;
  grid[14][20]=1;
  grid[14][21]=1;
  grid[15][9]=1;
  grid[15][10]=1;
  grid[15][11]=1;
  grid[15][16]=1;
  grid[15][21]=1;
  grid[15][22]=1;
  grid[15][23]=1;
  grid[16][16]=1;
  grid[18][9]=1;
  grid[18][10]=1;
  grid[18][11]=1;
  grid[18][21]=1;
  grid[18][22]=1;
  grid[18][23]=1;
  grid[19][12]=1;
  grid[19][13]=1;
  grid[19][19]=1;
  grid[19][20]=1;
  grid[20][9]=1;
  grid[20][10]=1;
  grid[20][11]=1;
  grid[20][21]=1;
  grid[20][22]=1;
  grid[20][23]=1;
  grid[22][16]=1;
  grid[23][9]=1;
  grid[23][10]=1;
  grid[23][11]=1;
  grid[23][16]=1;
  grid[23][21]=1;
  grid[23][22]=1;
  grid[23][23]=1;
  grid[24][11]=1;
  grid[24][12]=1;
  grid[24][15]=1;
  grid[24][17]=1;
  grid[24][20]=1;
  grid[24][21]=1;
  grid[25][12]=1;
  grid[25][15]=1;
  grid[25][17]=1;
  grid[25][20]=1;
  grid[26][12]=1;
  grid[26][15]=1;
  grid[26][17]=1;
  grid[26][20]=1;
}

function p12()
{
  clr_grid();
  grid[7][6]=1;
  grid[8][4]=1;
  grid[8][5]=1;
  grid[8][7]=1;
  grid[8][8]=1;
  grid[9][6]=1;
  grid[9][9]=1;
  grid[9][11]=1;
  grid[10][11]=1;
  grid[11][11]=1;
  grid[11][13]=1;
  grid[12][11]=1;
  grid[12][14]=1;
  grid[13][9]=1;
  grid[13][10]=1;
  grid[13][14]=1;
  grid[14][9]=1;
  grid[14][10]=1;
  grid[15][9]=1;
  grid[15][10]=1;
  grid[16][9]=1;
  grid[16][10]=1;
  grid[16][14]=1;
  grid[17][11]=1;
  grid[17][14]=1;
  grid[18][11]=1;
  grid[18][13]=1;
  grid[19][11]=1;
  grid[20][6]=1;
  grid[20][9]=1;
  grid[20][11]=1;
  grid[21][4]=1;
  grid[21][5]=1;
  grid[21][7]=1;
  grid[21][8]=1;
  grid[22][6]=1;


}

function p13()
{
 clr_grid();
 grid[7][8]=1;
  grid[7][13]=1;
  grid[8][6]=1;
  grid[8][7]=1;
  grid[8][9]=1;
  grid[8][10]=1;
  grid[8][11]=1;
  grid[8][12]=1;
  grid[8][14]=1;
  grid[8][15]=1;
  grid[9][8]=1;
  grid[9][13]=1;
  grid[15][10]=1;
  grid[15][11]=1;
  grid[15][12]=1;
  grid[16][11]=1;
  grid[16][12]=1;
  grid[16][13]=1;
  grid[22][8]=1;
  grid[22][13]=1;
  grid[23][6]=1;
  grid[23][7]=1;
  grid[23][9]=1;
  grid[23][10]=1;
  grid[23][11]=1;
  grid[23][12]=1;
  grid[23][14]=1;
  grid[23][15]=1;
  grid[24][8]=1;
  grid[24][13]=1;

}

function p14()
{
clr_grid();
grid[10][12]=1;
  grid[10][13]=1;
  grid[10][20]=1;
  grid[10][21]=1;
  grid[11][11]=1;
  grid[11][14]=1;
  grid[11][19]=1;
  grid[11][22]=1;
  grid[12][11]=1;
  grid[12][13]=1;
  grid[12][20]=1;
  grid[12][22]=1;
  grid[13][9]=1;
  grid[13][10]=1;
  grid[13][13]=1;
  grid[13][14]=1;
  grid[13][15]=1;
  grid[13][18]=1;
  grid[13][19]=1;
  grid[13][20]=1;
  grid[13][23]=1;
  grid[13][24]=1;
  grid[14][8]=1;
  grid[14][15]=1;
  grid[14][18]=1;
  grid[14][25]=1;
  grid[15][8]=1;
  grid[15][10]=1;
  grid[15][11]=1;
  grid[15][22]=1;
  grid[15][23]=1;
  grid[15][25]=1;
  grid[16][9]=1;
  grid[16][11]=1;
  grid[16][22]=1;
  grid[16][24]=1;
  grid[17][11]=1;
  grid[17][12]=1;
  grid[17][16]=1;
  grid[17][17]=1;
  grid[17][21]=1;
  grid[17][22]=1;
  grid[18][15]=1;
  grid[18][17]=1;
  grid[19][15]=1;
  grid[19][16]=1;
  grid[20][11]=1;
  grid[20][12]=1;
  grid[20][21]=1;
  grid[20][22]=1;
  grid[21][9]=1;
  grid[21][11]=1;
  grid[21][22]=1;
  grid[21][24]=1;
  grid[22][8]=1;
  grid[22][10]=1;
  grid[22][11]=1;
  grid[22][22]=1;
  grid[22][23]=1;
  grid[22][25]=1;
  grid[23][8]=1;
  grid[23][15]=1;
  grid[23][18]=1;
  grid[23][25]=1;
  grid[24][9]=1;
  grid[24][10]=1;
  grid[24][13]=1;
  grid[24][14]=1;
  grid[24][15]=1;
  grid[24][18]=1;
  grid[24][19]=1;
  grid[24][20]=1;
  grid[24][23]=1;
  grid[24][24]=1;
  grid[25][11]=1;
  grid[25][13]=1;
  grid[25][20]=1;
  grid[25][22]=1;
  grid[26][11]=1;
  grid[26][14]=1;
  grid[26][19]=1;
  grid[26][22]=1;
  grid[27][12]=1;
  grid[27][13]=1;
  grid[27][20]=1;
  grid[27][21]=1;
}

function p15()
{
clr_grid();
grid[6][6]=1;
  grid[6][7]=1;
  grid[6][11]=1;
  grid[6][15]=1;
  grid[6][16]=1;
  grid[7][6]=1;
  grid[7][7]=1;
  grid[7][10]=1;
  grid[7][11]=1;
  grid[7][12]=1;
  grid[7][15]=1;
  grid[7][16]=1;
  grid[8][8]=1;
  grid[8][9]=1;
  grid[8][10]=1;
  grid[8][12]=1;
  grid[8][13]=1;
  grid[8][14]=1;
  grid[9][8]=1;
  grid[9][14]=1;
  grid[10][7]=1;
  grid[10][8]=1;
  grid[10][14]=1;
  grid[10][15]=1;
  grid[11][6]=1;
  grid[11][7]=1;
  grid[11][15]=1;
  grid[11][16]=1;
  grid[12][7]=1;
  grid[12][8]=1;
  grid[12][14]=1;
  grid[12][15]=1;
  grid[13][8]=1;
  grid[13][14]=1;
  grid[14][8]=1;
  grid[14][9]=1;
  grid[14][10]=1;
  grid[14][12]=1;
  grid[14][13]=1;
  grid[14][14]=1;
  grid[15][6]=1;
  grid[15][7]=1;
  grid[15][10]=1;
  grid[15][11]=1;
  grid[15][12]=1;
  grid[15][15]=1;
  grid[15][16]=1;
  grid[16][6]=1;
  grid[16][7]=1;
  grid[16][11]=1;
  grid[16][15]=1;
  grid[16][16]=1;
}

function p16()
{
clr_grid();
grid[11][15]=1;
  grid[11][16]=1;
  grid[12][14]=1;
  grid[13][15]=1;
  grid[13][17]=1;
  grid[13][18]=1;
  grid[14][16]=1;
  grid[14][18]=1;
  grid[16][16]=1;
  grid[16][18]=1;
  grid[17][15]=1;
  grid[17][17]=1;
  grid[17][18]=1;
  grid[18][14]=1;
  grid[19][15]=1;
  grid[19][16]=1;
}

function p17()
{
clr_grid();
grid[28][9]=1;
  grid[29][8]=1;
  grid[29][9]=1;
  grid[30][8]=1;
  grid[30][10]=1;
  grid[31][18]=1;
  grid[32][11]=1;
  grid[32][12]=1;
  grid[32][16]=1;
  grid[32][18]=1;
  grid[32][20]=1;
  grid[33][12]=1;
  grid[33][13]=1;
  grid[33][15]=1;
  grid[33][16]=1;
  grid[33][17]=1;
  grid[33][20]=1;
  grid[34][12]=1;
  grid[34][13]=1;
  grid[34][18]=1;
  grid[34][19]=1;
  grid[35][13]=1;
  grid[35][15]=1;
  grid[35][16]=1;
  grid[37][11]=1;
  grid[37][13]=1;
  grid[38][11]=1;
  grid[39][11]=1;
  grid[39][12]=1;
  grid[39][13]=1;
  grid[40][12]=1;
  grid[40][14]=1;
}
function p18()
{
clr_grid();
grid[3][9]=1;
  grid[3][10]=1;
  grid[4][9]=1;
  grid[4][12]=1;
  grid[4][13]=1;
  grid[5][9]=1;
  grid[5][12]=1;
  grid[5][13]=1;
  grid[6][8]=1;
  grid[7][8]=1;
  grid[7][9]=1;
  grid[7][10]=1;
  grid[7][11]=1;
  grid[7][13]=1;
  grid[8][11]=1;
  grid[8][13]=1;
  grid[8][14]=1;
  grid[9][8]=1;
  grid[9][9]=1;
  grid[9][10]=1;
  grid[10][9]=1;
  grid[11][8]=1;
  grid[11][9]=1;
  grid[12][7]=1;
  grid[13][8]=1;
  grid[14][8]=1;
  grid[15][10]=1;
  grid[15][11]=1;
  grid[15][12]=1;
  grid[17][10]=1;
  grid[17][11]=1;
  grid[17][12]=1;
  grid[18][8]=1;
  grid[19][8]=1;
  grid[20][7]=1;
  grid[21][8]=1;
  grid[21][9]=1;
  grid[22][9]=1;
  grid[23][8]=1;
  grid[23][9]=1;
  grid[23][10]=1;
  grid[24][11]=1;
  grid[24][13]=1;
  grid[24][14]=1;
  grid[25][8]=1;
  grid[25][9]=1;
  grid[25][10]=1;
  grid[25][11]=1;
  grid[25][13]=1;
  grid[26][8]=1;
  grid[27][9]=1;
  grid[27][12]=1;
  grid[27][13]=1;
  grid[28][9]=1;
  grid[28][12]=1;
  grid[28][13]=1;
  grid[29][9]=1;
  grid[29][10]=1;
}
function p19()
{
clr_grid();
grid[13][14]=1;
  grid[13][15]=1;
  grid[13][16]=1;
  grid[15][13]=1;
  grid[15][18]=1;
  grid[16][12]=1;
  grid[16][14]=1;
  grid[16][18]=1;
  grid[17][10]=1;
  grid[17][11]=1;
  grid[17][12]=1;
  grid[17][15]=1;
  grid[17][18]=1;
  grid[18][16]=1;
  grid[19][14]=1;
  grid[19][15]=1;
  grid[20][14]=1;
  grid[21][14]=1;
}

function p20()
{
clr_grid();
grid[18][6]=1;
  grid[18][7]=1;
  grid[18][8]=1;
  grid[18][14]=1;
  grid[18][15]=1;
  grid[18][16]=1;
  grid[19][6]=1;
  grid[19][9]=1;
  grid[19][13]=1;
  grid[19][16]=1;
  grid[20][6]=1;
  grid[20][16]=1;
  grid[21][6]=1;
  grid[21][16]=1;
  grid[22][7]=1;
  grid[22][9]=1;
  grid[22][13]=1;
  grid[22][15]=1;
  grid[24][10]=1;
  grid[24][11]=1;
  grid[24][12]=1;
  grid[25][9]=1;
  grid[25][13]=1;
  grid[26][9]=1;
  grid[26][13]=1;
  grid[27][10]=1;
  grid[27][12]=1;
  grid[28][7]=1;
  grid[28][8]=1;
  grid[28][14]=1;
  grid[28][15]=1;
  grid[29][7]=1;
  grid[29][8]=1;
  grid[29][9]=1;
  grid[29][10]=1;
  grid[29][11]=1;
  grid[29][12]=1;
  grid[29][13]=1;
  grid[29][14]=1;
  grid[29][15]=1;
  grid[30][6]=1;
  grid[30][10]=1;
  grid[30][11]=1;
  grid[30][12]=1;
  grid[30][16]=1;
  grid[31][4]=1;
  grid[31][5]=1;
  grid[31][7]=1;
  grid[31][8]=1;
  grid[31][14]=1;
  grid[31][15]=1;
  grid[31][17]=1;
  grid[31][18]=1;
  grid[32][7]=1;
  grid[32][15]=1;
  grid[33][8]=1;
  grid[33][9]=1;
  grid[33][13]=1;
  grid[33][14]=1;
  grid[34][4]=1;
  grid[34][6]=1;
  grid[34][7]=1;
  grid[34][9]=1;
  grid[34][13]=1;
  grid[34][15]=1;
  grid[34][16]=1;
  grid[34][18]=1;
  grid[35][8]=1;
  grid[35][9]=1;
  grid[35][13]=1;
  grid[35][14]=1;
  grid[36][3]=1;
  grid[36][4]=1;
  grid[36][6]=1;
  grid[36][7]=1;
  grid[36][15]=1;
  grid[36][16]=1;
  grid[36][18]=1;
  grid[36][19]=1;
  grid[37][3]=1;
  grid[37][4]=1;
  grid[37][6]=1;
  grid[37][16]=1;
  grid[37][18]=1;
  grid[37][19]=1;
  grid[38][3]=1;
  grid[38][7]=1;
  grid[38][8]=1;
  grid[38][9]=1;
  grid[38][13]=1;
  grid[38][14]=1;
  grid[38][15]=1;
  grid[38][19]=1;
  grid[39][2]=1;
  grid[39][3]=1;
  grid[39][7]=1;
  grid[39][8]=1;
  grid[39][14]=1;
  grid[39][15]=1;
  grid[39][19]=1;
  grid[39][20]=1;
  grid[40][7]=1;
  grid[40][8]=1;
  grid[40][9]=1;
  grid[40][13]=1;
  grid[40][14]=1;
  grid[40][15]=1;
  grid[41][7]=1;
  grid[41][8]=1;
  grid[41][9]=1;
  grid[41][13]=1;
  grid[41][14]=1;
  grid[41][15]=1;
  grid[42][7]=1;
  grid[42][8]=1;
  grid[42][14]=1;
  grid[42][15]=1;

}

function p21()
{
clr_grid();
grid[10][10]=1;
  grid[10][14]=1;
  grid[11][10]=1;
  grid[11][14]=1;
  grid[12][9]=1;
  grid[12][11]=1;
  grid[12][13]=1;
  grid[12][15]=1;
  grid[14][9]=1;
  grid[14][11]=1;
  grid[14][13]=1;
  grid[14][15]=1;
  grid[15][11]=1;
  grid[15][13]=1;
  grid[16][8]=1;
  grid[16][10]=1;
  grid[16][14]=1;
  grid[16][16]=1;
  grid[17][8]=1;
  grid[17][10]=1;
  grid[17][14]=1;
  grid[17][16]=1;
  grid[18][8]=1;
  grid[18][11]=1;
  grid[18][12]=1;
  grid[18][13]=1;
  grid[18][16]=1;
  grid[20][7]=1;
  grid[20][8]=1;
  grid[20][16]=1;
  grid[20][17]=1;
  grid[21][7]=1;
  grid[21][17]=1;
  grid[22][8]=1;
  grid[22][16]=1;
  grid[23][7]=1;
  grid[23][8]=1;
  grid[23][10]=1;
  grid[23][11]=1;
  grid[23][12]=1;
  grid[23][13]=1;
  grid[23][14]=1;
  grid[23][16]=1;
  grid[23][17]=1;
  grid[24][8]=1;
  grid[24][11]=1;
  grid[24][13]=1;
  grid[24][16]=1;
  grid[25][9]=1;
  grid[25][11]=1;
  grid[25][13]=1;
  grid[25][15]=1;
  grid[27][10]=1;
  grid[27][11]=1;
  grid[27][13]=1;
  grid[27][14]=1;
  grid[28][10]=1;
  grid[28][14]=1;
  grid[29][9]=1;
  grid[29][10]=1;
  grid[29][14]=1;
  grid[29][15]=1;
  grid[30][9]=1;
  grid[30][10]=1;
  grid[30][14]=1;
  grid[30][15]=1;
}

function p22()
{
clr_grid();
grid[9][15]=1;
  grid[9][16]=1;
  grid[10][15]=1;
  grid[10][16]=1;
  grid[12][9]=1;
  grid[12][10]=1;
  grid[12][13]=1;
  grid[12][14]=1;
  grid[12][15]=1;
  grid[12][16]=1;
  grid[13][9]=1;
  grid[13][12]=1;
  grid[13][14]=1;
  grid[13][17]=1;
  grid[13][19]=1;
  grid[13][20]=1;
  grid[14][10]=1;
  grid[14][12]=1;
  grid[14][13]=1;
  grid[14][17]=1;
  grid[14][19]=1;
  grid[15][9]=1;
  grid[15][10]=1;
  grid[15][12]=1;
  grid[15][17]=1;
  grid[15][20]=1;
  grid[16][13]=1;
  grid[16][14]=1;
  grid[16][15]=1;
  grid[16][16]=1;
  grid[16][19]=1;
  grid[16][20]=1;
  grid[18][13]=1;
  grid[18][14]=1;
  grid[19][13]=1;
  grid[19][14]=1;
}

function p23()
{
  clr_grid();
  grid[6][14]=1;
  grid[6][16]=1;
  grid[7][12]=1;
  grid[7][15]=1;
  grid[7][18]=1;
  grid[8][10]=1;
  grid[8][13]=1;
  grid[8][15]=1;
  grid[8][17]=1;
  grid[8][20]=1;
  grid[9][8]=1;
  grid[9][11]=1;
  grid[9][13]=1;
  grid[9][15]=1;
  grid[9][17]=1;
  grid[9][19]=1;
  grid[9][22]=1;
  grid[10][6]=1;
  grid[10][9]=1;
  grid[10][11]=1;
  grid[10][13]=1;
  grid[10][16]=1;
  grid[10][19]=1;
  grid[10][21]=1;
  grid[11][7]=1;
  grid[11][9]=1;
  grid[11][12]=1;
  grid[11][13]=1;
  grid[11][19]=1;
  grid[11][21]=1;
  grid[11][22]=1;
  grid[11][23]=1;
  grid[12][5]=1;
  grid[12][6]=1;
  grid[12][7]=1;
  grid[12][9]=1;
  grid[12][20]=1;
  grid[13][8]=1;
  grid[13][21]=1;
  grid[13][22]=1;
  grid[13][23]=1;
  grid[13][24]=1;
  grid[14][4]=1;
  grid[14][5]=1;
  grid[14][6]=1;
  grid[14][7]=1;
  grid[15][23]=1;
  grid[15][24]=1;
  grid[15][25]=1;
  grid[16][3]=1;
  grid[16][4]=1;
  grid[16][5]=1;
  grid[16][22]=1;
  grid[16][23]=1;
  grid[17][6]=1;
  grid[17][23]=1;
  grid[17][24]=1;
  grid[17][25]=1;
  grid[17][26]=1;
  grid[18][2]=1;
  grid[18][3]=1;
  grid[18][4]=1;
  grid[18][5]=1;
  grid[19][25]=1;
  grid[19][26]=1;
  grid[19][27]=1;
  grid[20][1]=1;
  grid[20][2]=1;
  grid[20][3]=1;
  grid[20][24]=1;
  grid[20][25]=1;
  grid[21][4]=1;
  grid[21][25]=1;
  grid[21][26]=1;
  grid[21][27]=1;
  grid[21][28]=1;
  grid[22][0]=1;
  grid[22][1]=1;
  grid[22][2]=1;
  grid[22][3]=1;
  grid[22][4]=1;
  grid[23][25]=1;
  grid[23][26]=1;
  grid[23][27]=1;
  grid[23][28]=1;
  grid[23][29]=1;
  grid[24][1]=1;
  grid[24][2]=1;
  grid[24][3]=1;
  grid[24][4]=1;
  grid[24][25]=1;
  grid[25][5]=1;
  grid[25][26]=1;
  grid[25][27]=1;
  grid[25][28]=1;
  grid[26][2]=1;
  grid[26][3]=1;
  grid[26][4]=1;
  grid[27][24]=1;
  grid[27][25]=1;
  grid[27][26]=1;
  grid[27][27]=1;
  grid[28][3]=1;
  grid[28][4]=1;
  grid[28][5]=1;
  grid[28][6]=1;
  grid[28][23]=1;
  grid[29][7]=1;
  grid[29][24]=1;
  grid[29][25]=1;
  grid[29][26]=1;
  grid[30][4]=1;
  grid[30][5]=1;
  grid[30][6]=1;
  grid[31][22]=1;
  grid[31][23]=1;
  grid[31][24]=1;
  grid[31][25]=1;
  grid[32][5]=1;
  grid[32][6]=1;
  grid[32][7]=1;
  grid[32][8]=1;
  grid[32][21]=1;
  grid[33][9]=1;
  grid[33][20]=1;
  grid[33][22]=1;
  grid[33][23]=1;
  grid[33][24]=1;
  grid[34][6]=1;
  grid[34][7]=1;
  grid[34][8]=1;
  grid[34][10]=1;
  grid[34][16]=1;
  grid[34][17]=1;
  grid[34][20]=1;
  grid[34][22]=1;
  grid[35][8]=1;
  grid[35][10]=1;
  grid[35][13]=1;
  grid[35][16]=1;
  grid[35][18]=1;
  grid[35][20]=1;
  grid[35][23]=1;
  grid[36][7]=1;
  grid[36][10]=1;
  grid[36][12]=1;
  grid[36][14]=1;
  grid[36][16]=1;
  grid[36][18]=1;
  grid[36][21]=1;
  grid[37][9]=1;
  grid[37][12]=1;
  grid[37][14]=1;
  grid[37][16]=1;
  grid[37][19]=1;
  grid[38][11]=1;
  grid[38][14]=1;
  grid[38][17]=1;
  grid[39][13]=1;
  grid[39][15]=1;
}

function p24()
{
  clr_grid();
  grid[6][17]=1;
  grid[7][5]=1;
  grid[7][6]=1;
  grid[7][15]=1;
  grid[7][16]=1;
  grid[7][17]=1;
  grid[8][6]=1;
  grid[8][14]=1;
  grid[9][6]=1;
  grid[9][8]=1;
  grid[9][14]=1;
  grid[9][15]=1;
  grid[10][7]=1;
  grid[10][8]=1;
  grid[11][12]=1;
  grid[12][11]=1;
  grid[12][12]=1;
  grid[12][13]=1;
  grid[13][11]=1;
  grid[13][13]=1;
  grid[13][14]=1;
  grid[14][12]=1;
  grid[14][13]=1;
  grid[14][14]=1;
  grid[15][14]=1;
  grid[15][15]=1;
  grid[15][16]=1;
  grid[16][8]=1;
  grid[16][9]=1;
  grid[16][15]=1;
  grid[16][17]=1;
  grid[17][9]=1;
  grid[17][17]=1;
  grid[18][6]=1;
  grid[18][7]=1;
  grid[18][8]=1;
  grid[18][17]=1;
  grid[18][18]=1;
  grid[19][6]=1;
}

function p25()
{
  clr_grid();
  grid[13][11]=1;
  grid[13][12]=1;
  grid[13][16]=1;
  grid[13][17]=1;
  grid[14][7]=1;
  grid[14][9]=1;
  grid[14][13]=1;
  grid[14][14]=1;
  grid[14][15]=1;
  grid[15][8]=1;
  grid[15][9]=1;
  grid[15][12]=1;
  grid[15][16]=1;
  grid[16][8]=1;
  grid[16][13]=1;
  grid[16][15]=1;
  grid[17][14]=1;
  grid[20][16]=1;
  grid[21][15]=1;
  grid[21][16]=1;
  grid[22][15]=1;
  grid[22][17]=1;
}
