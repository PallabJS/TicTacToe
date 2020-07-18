
class TicTacToe
{
    constructor()
    {
        // Player 1
        this.p1 = {
            name: "",
            id: 1,
            score: 0
        }

        // Player 2
        this.p2 = {
            name: "",
            id: 2,
            score: 0
        }

        this.p1readyflag = false;
        this.p2readyflag = false;

        // turn variable player 1 has initial turn
        this.turn = "p1";

        // Game Array
        this.gameArray = [0,0,0,0,0,0,0,0,0];

        // Game state
        this.winner = "none";

        // Game Round
        this.gameRound = 0;

        // Player Marks Count
        this.marks = 0;

        // Total Rounds per match
        this.totalRound = 3;

    }

    //Reset state
    gameRoundReset()
    {
        // Resetting Object data
        this.turn = "p1";
        this.gameArray = [0,0,0,0,0,0,0,0,0];
        this.winner = "none";

        //Resetting visual changes
        var box = document.getElementsByClassName("gamebox");
        for (var key in box)
        {
            var boxid = "#"+box[key].id;
            box[key].style.cssText =`background-color: black`;
            if(key==8)
            {
                break;
            }

        }
        console.log("Round winner after reset: " + this.winner);
    }
}

//-----------------------------------------------------------------------
// Creating a game object
var gameObject = new TicTacToe();

document.getElementById("player1ready").addEventListener('click', ()=>
{
    var playername = document.getElementById("p1nameinput");
    if(playername.value !="")
    {
        gameObject.p1.name = playername.value;
        document.getElementById("player1name").innerHTML = playername.value.toString().toUpperCase();
        document.getElementById("p1form").style.display = "none";
        gameObject.p1readyflag = true;
    }
    else
    {
        playername.setAttribute("placeholder", "Enter a name!");
    }
    
    // Check name entry done or not
    if(gameObject.p1readyflag && gameObject.p2readyflag)
    {
        startGame();
    }

});

// Execute the game one phone without and game data
var x = window.matchMedia("(max-width: 700px)")
runInphone(x);
x.addListener(runInphone);

function runInphone(x)
{
	if (x.matches)
    {
        // All codes for phone here
        gameObject.p1.name = "P1";
        gameObject.p2.name = "P2";
        document.body.style.fontSize = "5vw !important";
        startGame();
  	}
}



document.getElementById("player2ready").addEventListener('click', ()=>
{
    var playername = document.getElementById("p2nameinput");
    if(playername.value !="")
    {
        gameObject.p2.name = playername.value;
        document.getElementById("player2name").innerHTML = playername.value.toString().toUpperCase();
        document.getElementById("p2form").style.display = "none";
        gameObject.p2readyflag = true;
    }
    else
    {
        playername.setAttribute("placeholder", "Enter a name!");
    }

    // Check name entry done or not
    if(gameObject.p1readyflag && gameObject.p2readyflag)
    {
        // if(gameObject.p1.name == "Enter a name!" || gameObject.p2.name == "Enter a name!")
        startGame();
    }
});



//-----------------------------------------------------------------------
// GAME LOGIC
//-----------------------------------------------------------------------

//-----------------------------------------
// Start the game
function startGame()
{
    gameObject.totalRound = document.getElementById("totalround").value;
    document.getElementById("totalround").style.display = "none";
    document.getElementById("totalround_label").style.display = "none";
    console.log("rounds:" + gameObject.totalRound);
    console.log("GAME HAS STARTED");
    document.getElementById("gamestatus").innerHTML = `<br/> It's \
    <b style="color:red;"> ` + gameObject.p1.name + `'s </b> turn`;
    // gameObject.turn = "p1";
    main();
}

//-----------------------------------------
// Change player turn
function changeTurn()
{
    if(gameObject.turn=="p1")
    {

        document.getElementById("gamestatus").innerHTML = `<br/> It's \
        <span style="color:blue;"> ` + gameObject.p2.name + `'s </span> turn`;

        gameObject.turn = "p2";
    }
    else if(gameObject.turn=="p2")
    {
        document.getElementById("gamestatus").innerHTML = `<br/> It's \
        <span style="color:red;"> ` + gameObject.p1.name + `'s </span> turn`;

        gameObject.turn = "p1";
    }
}

//------------------------------------------
//to check winner
function winnerCheck()
{
    // Draw situation
    if(gameObject.marks == 9)
    {
        gameObject.marks = 0;
        document.getElementById("gamestatus").innerHTML= `\
        <br/> <b style="color: red"></b> Round Draw!</b>`;

        $(".childbox").off('click');
        gameObject.winner = gameObject.p1.name;
        resetTime();
    }

    // Player 1 winning situation
    if(gameObject.gameArray[0]==1&gameObject.gameArray[1]==1&gameObject.gameArray[2]==1||
        gameObject.gameArray[3]==1&gameObject.gameArray[4]==1&gameObject.gameArray[5]==1||
        gameObject.gameArray[6]==1&gameObject.gameArray[7]==1&gameObject.gameArray[8]==1||
        gameObject.gameArray[0]==1&gameObject.gameArray[4]==1&gameObject.gameArray[8]==1||
        gameObject.gameArray[2]==1&gameObject.gameArray[4]==1&gameObject.gameArray[6]==1||
        gameObject.gameArray[0]==1&gameObject.gameArray[3]==1&gameObject.gameArray[6]==1||
        gameObject.gameArray[1]==1&gameObject.gameArray[4]==1&gameObject.gameArray[7]==1||
        gameObject.gameArray[2]==1&gameObject.gameArray[5]==1&gameObject.gameArray[8]==1)
    {

        document.getElementById("gamestatus").innerHTML= `\
        <br/> <b style="color: red">${gameObject.p1.name}</b> has wont the game, welldone. <br/> \
        Better luck next time <b style="color: blue"> ${gameObject.p2.name} </b>`;

        $(".childbox").off('click');
        gameObject.winner = gameObject.p1.name;
        updateScore("p1");
        
        setTimeout(function(){ resetTime(); }, 2000);

        gameObject.marks = 0;
        gameObject.marks = 0;

    }

    // Player 2 winning situation
    else if(gameObject.gameArray[0]==2&gameObject.gameArray[1]==2&gameObject.gameArray[2]==2||
            gameObject.gameArray[3]==2&gameObject.gameArray[4]==2&gameObject.gameArray[5]==2||
            gameObject.gameArray[6]==2&gameObject.gameArray[7]==2&gameObject.gameArray[8]==2||
            gameObject.gameArray[0]==2&gameObject.gameArray[4]==2&gameObject.gameArray[8]==2||
            gameObject.gameArray[2]==2&gameObject.gameArray[4]==2&gameObject.gameArray[6]==2||
            gameObject.gameArray[0]==2&gameObject.gameArray[3]==2&gameObject.gameArray[6]==2||
            gameObject.gameArray[1]==2&gameObject.gameArray[4]==2&gameObject.gameArray[7]==2||
            gameObject.gameArray[2]==2&gameObject.gameArray[5]==2&gameObject.gameArray[8]==2)
    {

        document.getElementById("gamestatus").innerHTML= `\
        <br/> <b style="color: red">${gameObject.p2.name}</b> has wont the game, welldone. <br/> \
        Better luck next time <b style="color: blue"> ${gameObject.p1.name} </b>`;

        $(".childbox").off('click');
        gameObject.winner = gameObject.p2.name;
        updateScore("p2");

        setTimeout(function()
        {
            resetTime();
        }, 2000);

        gameObject.marks = 0;
    }
}

//------------------------------------------
//Update Score
function updateScore(winner)
{
    if(winner == "p1")
    {
        gameObject.p1.score = gameObject.p1.score + 1;
        $("#p1score").text(gameObject.p1.score); 
    }

    if(winner == "p2")
    {
        gameObject.p2.score = gameObject.p2.score + 1;
        $("#p2score").text(gameObject.p2.score);
    }
}


function resetTime()
{
    gameObject.gameRound += 1;

    if(gameObject.gameRound == gameObject.totalRound)
    {
        // Declare winner
        // console.log(gameObject.p1.score);
        // console.log(gameObject.p2.score);
        if(gameObject.p1.score>gameObject.p2.score)
        {
            gameObject.p1.name = gameObject.p1.name.toUpperCase();   
            $("#gamestatus").html(`<br> ------------------------------------------ WINNER ----------------------------------------- \
            <br> <span style="color: red; font-size: 2vw !important;">"${gameObject.p1.name}"</span>\
            <br> --------------------------------------------------------------------------------------------------`);
        }
        else if(gameObject.p1.score<gameObject.p2.score)
        {
            gameObject.p2.name = gameObject.p2.name.toUpperCase();
            $("#gamestatus").html(`<br> ----------- WINNER ------------- \
            <br> <span style="color: blue; font-size: 2vw !important;">"${gameObject.p2.name}"</span>`);
        }
        else
        {
            $("#gamestatus").html(`<br> ----------- RESULT ------------- \
            <br> It's a DRAW after a tough competition`);
        }
        return true;
    }

    else
    {
        var countdown = 3;
        var exitFlag = false;
        var resetGameTime = setInterval(()=>
            {
                console.log("game restarting in " + countdown);
                if(countdown == 0)
                {
                    exitFlag = true;
                    clearInterval(resetGameTime);
                    console.log("Interval cleared");
                    startGame();
                }
                console.log("before settimer");
                // display timer
                if(exitFlag == false)
                {
                    $("#gamestatus").html(`<br> Game restarting in ${countdown}`);
                    console.log("after settimer");
                }
                countdown = countdown-1;
            }, 800);
        }
}

//-----------------------------------------
// MAIN FUNCTION

mapArray = {
    zero: 0, one: 1, two: 2, three: 3, four: 4, five: 5, six: 6, seven: 7, eight: 8
}

function main()
{
    console.log("Game has started");
    $(".childbox").click(function (e)
    {
        gameObject.marks += 1;

        if(gameObject.turn == "p1")
        {
            // this.style.backgroundColor = "blue !important";
            gameObject.gameArray[mapArray[this.id]] = 1;

            $(`#${this.id}`).off('click');
            this.style.backgroundImage = "url('data/image/p1.png')";
            this.style.backgroundSize = "cover";
            // console.log(this.classList);

            winnerCheck();
            if(gameObject.winner == "none")
            {
                changeTurn();
            }
            else
            {
                setTimeout(function()
                {
                    gameObject.gameRoundReset();
                }, 2000);
            }
        }
        else if(gameObject.turn == "p2")
        {
            // this.style.backgroundColor = "red";
            gameObject.gameArray[mapArray[this.id]] = 2;

            $(`#${this.id}`).off('click');
            this.style.backgroundImage = "url('data/image/p2.png')";
            this.style.backgroundSize = "cover";

            winnerCheck();
            if(gameObject.winner == "none")
            {
                changeTurn();
            }
            else
            {
                setTimeout(function()
                {
                    gameObject.gameRoundReset();
                }, 2000);
            }
            
        }

    });
}
