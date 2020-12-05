class Game{
    constructor(){
        this.score1 =0;
        this.score2 =0;
    }
    getState() {
        var gameStateRef = database.ref('gameState');
        gameStateRef.on("value", function (data) {
            gameState = data.val();
        })

    }

    update(state) {
        database.ref('/').update({
            gameState: state
        });
    }
    async start() {
            if (gameState === 0) {
                player = new Player();
                var playerCountRef = await database.ref('playerCount').once("value");
                if (playerCountRef.exists()) {
                    playerCount = playerCountRef.val();
                    player.getCount();
                }
                form = new Form()
                form.display();
            }

    player1 = createSprite(200,500);
    player1.addImage("player1",player_img);
    
    player2 = createSprite(800,500);
    player2.addImage("player2", player_img);

    players=[player1,player2];

        }
    
    play(){
            form.hide();
            Player.getPlayerInfo();
            if(allPlayers !== undefined){
                background(255,255,255);
                image(back_img, 0, 0, 1000, 800);

                //index of the array
                var index = 0;

                //x and y position
                var x = 200;
                var y = 500;
                 
                 

                 for(var plr in allPlayers){
                     //add 1 to the index for every loop
                    index = index+1;

                    x = x + 600;

                    
                    x = displayHeight - allPlayers[plr].distance;
                    
                     
                    //players[index-1].x = x;
                    //players[index-1].y = y;
                       
                    if(index === player.index){
                        fill("black");
                         textSize(25);
                         text(allPlayers[plr].name ,x-25,y+25);   
                         
     
                    }
                    
                }
            }
                textSize(30);
                fill("white");
                text("Player1: " + score1, 30, 60);
                text("player2: " + score2, 30, 95);


                if (keyIsDown(RIGHT_ARROW) && player.index !== null) {
                    player.distance = player.distance - 10;
                    player.update();
                }
                if (keyIsDown(LEFT_ARROW) && player.index !== null) {
                    player.distance = player.distance + 10;
                    player.update();
                }

                drawSprites(); 

                
            
                 if (frameCount % 20 === 0) {
                     fruits = createSprite(random(50, 1000), 0, 100, 100);
                     fruits.velocityY = 6;
                     var rand = Math.round(random(1,5));
                     switch(rand){
                         case 1: fruits.addImage("fruit1",fruit1_img);
                         break;
                         case 2: fruits.addImage("fruit1", fruit2_img);
                         break;
                         case 3: fruits.addImage("fruit1", fruit3_img);
                         break;
                         case 4: fruits.addImage("fruit1", fruit4_img);
                         break;
                         case 5: fruits.addImage("fruit1", fruit5_img);
                         break;
                     }
                     fruitGroup.add(fruits);
                     
                 }

                
                  //if (player.index !== null) {
                    // destroy fruits
                  //}
                

                if(fruitGroup.isTouching(player1)){
                    fruits.destroy;
                    score1 = score1 + 1;
                }

                if(fruitGroup.isTouching(player2)){
                    fruits.destroy;
                    score2 = score2 + 1;
                }
                
         
                
         

    }
    

    end(){
       console.log("Game Ended");
    }
}