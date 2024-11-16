
let running = true;
let board = [['?', '?', '?'], ['?', '?', '?'], ['?', '?', '?']];
let player;
let iteration = 1;

function format_board()
{
    ans = "";
    for(let i = 0; i < 3; i++)
    {
        for(let j = 0; j < 3; j++)
        {
            ans += "| ";

            if(board[i][j] == '?')
                ans += (3 * i + j + 1).toString();
            else
                ans += board[i][j];
            ans += ' '
        }
        ans += '| \n';
    }
        
    return ans;
}

function convert_pos(pos)
{
    pos--;
    let i = Math.floor(pos/3);
    let j = pos % 3;
    
    return [i, j];
}

function board_state()
{
    for(let i=0; i<3; i++)
        if(board[i][0] != '?' && board[i][0] == board[i][1] && board[i][1] == board[i][2])
            return board[i][0];

    for(let j=0; j<3; j++)
        if(board[0][j] != '?' && board[0][j] == board[1][j] && board[1][j] == board[2][j])
            return board[0][j];

    if(board[0][0] != '?' && board[0][0] == board[1][1] && board[1][1] == board[2][2])
        return board[0][0];

    if(board[0][2] != '?' && board[0][2] == board[1][1] && board[1][1] == board[2][0])
        return board[0][0];

    for(let i=0; i<3; i++)
        for(let j=0; j<3; j++)
            if(board[i][j] == '?')
                return '?';

    return 'draw';
}

function valid_pos(pos)
{
    if(!(pos >= 1 && pos <= 9))
        return false;
    
    let p = convert_pos(pos);
    let i = p[0];
    let j = p[1];
    
    if(board[i][j] != '?')
        return false;

    return true;
}

function player_move(player)
{
    let board_text = "Tabla de joc este: \n" + format_board() + "\n";
    let pos = prompt(board_text + "Alege pozitia la care vrei sa pui " + player + ": ");
    if(pos == null)
    {
        running = false;
        return;
    }


    let ok = valid_pos(pos);

    while(ok == false)
    {
        pos = prompt(board_text + "Pozitie invalida!\nAlege pozitia la care vrei sa pui " + player + ": ");
        if(pos == null)
        {
            running = false;
            return;
        }
        ok = valid_pos(pos);
    }
    p = convert_pos(pos);
    board[p[0]][p[1]] = player;
}

function computer_move(player)
{
    let randomPos = Math.floor(Math.random() * 9) + 1;

    while(!valid_pos(randomPos))
    {
        randomPos = Math.floor(Math.random() * 9) + 1;
    }

    let p = convert_pos(randomPos);
    board[p[0]][p[1]] = player;
}


function manage_endgame(prompt_text)
{
    let again = prompt("Tabla de joc este:\n" + format_board() + "\n" + prompt_text);
    if(again == null)
    {
        running = false;
        return;
    }

    if(again == '0')
    {
        running = false;
        return;
    }
    else
    {
        init();
        iteration--;
    }
}

function choose_player()
{
    player = prompt("Bună, cu ce vrei să joci? X sau 0? X începe primul.");
    if(player == null)
    {
        running = false;
        return;
    }
        
    while(player != 'X' && player != '0')
    {
        player = prompt("Input invalid! Te rog sa introduci X sau 0 (X începe primul).");
        if(player == null)
        {
            running = false;
            return;
        }
    }
        
}

function init()
{
    running = true;
    iteration = 0;

    for(let i=0; i<3; i++)
        for(let j=0; j<3; j++)
            board[i][j] = '?';

    choose_player();
    if(player == 'X')
    {
        iteration = 0; 
    }
    else
    {
        computer_move('X');
        iteration = 2;
    }
}

function run()
{ 
    init();
    while(running)
    {
        console.log(iteration.toString());
        if(iteration % 2 == 0)
        {
            player_move(player);
        } 
        else
        {
            if(player == '0')
                computer_move('X');
            else
                computer_move('0');
        }
            
        state = board_state();

        if(state == 'X')
        {
            manage_endgame("X won the game!\nPlay again? (0/1)");
        }
        else if(state == '0')
        {
            manage_endgame("0 won the game!\nPlay again? (0/1)");
        }
        else if(state == 'draw')
        {
            manage_endgame("Game ended in draw!\nPlay again? (0/1)");
        }

        iteration++; 
    }
}

run();


