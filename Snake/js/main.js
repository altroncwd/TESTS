$(document).ready(function(){
  
var points= 0;
$('.display .points').text(" Points: "+ points);


//==== Canvas stuff =================
var canvas= $('#gamescreen')[0];  //if you use JQ you will get an object back, you need to refrence the element itself which is the first index.
//var canvas= document.getElementById('gamescreen');  //if not using JQ
var ctx = canvas.getContext("2d");  // !!'2d' NOT '2D'
var w= $('#gamescreen').width();
var h= $('#gamescreen').height();
//======= cell width for easy variable controll ====== makes it easy to fix all at once.
var cw=10;  //<=== cell size

var d = 'right';  // default dirrection
//===== Making the snake ===============
var snake_array;

create_snake();


function create_snake(){
	var length= 10;
	snake_array=[];
	for(var i=length-1; i>0; i--){
		snake_array.push({x:i,y:0});  //setting a line with cordinates 
	}
}



var food;

make_food();
function make_food(){
	//changes the color of the food.
	var colorList = ['green', 'red', 'yellow', 'black', 'pink', 'orange'];
	var random = Math.floor(Math.random()*colorList.length);
	color = colorList[random];

	var X = Math.floor(Math.random()*w/cw);
	var Y = Math.floor(Math.random()*h/cw);
	food = {x:X,y:Y};
	for(var i = 0; i<snake_array.length; i++){
		if(food.x === snake_array[i].x && food.y === snake_array[i].y){make_food();}
	}
}

 var color = 'green';

//== Painting the snake ==
function paint(){
	

//===== Canvas Painting ======= by place this here we are able to always refresh the canvas drawing only the snake color and not leaving a long trail.  We are basicaly drawing over the board every time after wiping it clean ======
	ctx.fillStyle = "silver";
	ctx.fillRect(0, 0, w, h);   //(x, y axis starting point, x,y end points) w/h is refrenced because that is the max size therefore the full screen
	ctx.strokeStyle = "black";
	ctx.strokeRect(0, 0, w, h);


	//we will pop out the tail cell in place with the new head cell
	var nx= snake_array[0].x;
	var ny= snake_array[0].y;
	// we increment it to ge the new head possition
	if(d =='right') { nx++;}
	else if(d == 'left') { nx--;}
	else if(d == 'up') { ny--;}
	else if(d == 'down') { ny++;}
	console.log(snake_array[0]);
	//======= eng game clauses ======
	// if(nx<0||ny<0||nx>29||ny>29){}
	// 	clearInterval(game_loop);
	// }
	for( var i = 1; i < snake_array.length; i++){
		if( snake_array[0].x == snake_array[i].x && snake_array[0].y == snake_array[i].y){
			clearInterval(game_loop);
			
		}else if( nx < 0 || ny < 0 || nx > 29 || ny > 29 ){
			clearInterval(game_loop);
			
		}
	}


	var tail = snake_array.pop();  //removes the last index, setting its value equal to 'tail'
	tail.x = nx;
	tail.y = ny;

	snake_array.unshift(tail);

	for( var i = 0; i < snake_array.length; i++){ //this will draw every square in the snake
		var c = snake_array[i];
		// 10px wide cells
		ctx.fillStyle = 'blue';
		ctx.fillRect(c.x*cw, c.y*cw,cw,cw);    //refrences the x/y property objects in the array  (remember them dot notations)
		ctx.strokeStyle = 'white';
		ctx.strokeRect(c.x*cw, c.y*cw,cw,cw)
	}



	ctx.fillStyle = color;
	ctx.fillRect(food.x*cw, food.y*cw, cw,cw);
	ctx.strokeStyle ='white';
	ctx.strokeRect(food.x*cw, food.y*cw, cw, cw);

	if(snake_array[0].x === food.x && snake_array[0].y === food.y){
		//console.log('YEAHUU FOOD')
		make_food();
		snake_array.push({}); // put in an empty object at the end to lengthen it.  when the snake is made again it will be given the placment of the "tail end"
		points+=10;
		console.log(snake_array.length);
		$('.display .points').text(" Points: " + points);
	}


}

// ===== adding the keyboard controls ========
$(document).keydown(function(e){
	var key = e.which;
	if(key =='37' && d !=='right'){d='left'}
else if(key =='38' && d !== 'down'){d='up'}	
else if(key =='39' && d !== 'left'){d='right'}
else if(key =='40' && d !== 'up'){d='down'}

})

//=== set the paint function on a loop to get it to "move" ===
game_loop = setInterval(paint, 60);


})