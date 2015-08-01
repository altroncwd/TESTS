$(document).ready(function(){

	$('.Explore').hide();
	$('.MoveOn').hide();
	$('.Attack').hide();
	$('.Defend').hide();
	$('.Run').hide();
	
	var combatOn= function(){
		$('.Attack').toggle();
		$('.Defend').toggle();
		$('.Run').toggle();
		$('.Explore').toggle();
	}
	var combatOff= function(){
		$('.Attack').hide();
		$('.Defend').hide();
		$('.Run').hide();
	}

	var classes= function(name,hp,mp,atk,spd,def){
		this.name= name,
		this.hp= hp,
		this.mp= mp,
		this.atk= atk,
		this.spd= spd,
		this.def= def
		this.hasKey= false;
	};

	var combatLog= function(print){
		$('.Combat .log').prepend('<ul>'+print+ '</ul>');
	}

	var mage= new classes('Mage',35,10,10,5,5);
	var thief= new classes('Thief',30,5,6,10,7);
	var knight= new classes('Knight',45,2,8,6,10);
	console.log(mage)

	var user;
	
	var updateUser= function(){  // set the update to a function so we dont type it so much
		$('.character .job').text('Your Class : '+user.name);
		$('.character .hp').text('HP: '+user.hp);
		$('.character .mp').text('MP: '+user.mp);
		$('.character .atk').text('ATK: '+user.atk);
		$('.character .spd').text('SPD: '+user.spd);
		$('.character .def').text('DEF: '+user.def);
	}

	// CLASSES  changes user to equal:MAGE/THIEF/KNIGHT =======================================
	$('.Mage').click(function(){
		user=mage;
		updateUser();
		$('.Explore').show();
	})
	$('.Thief').click(function(){
		user=thief;
		updateUser();
		$('.Explore').show();
	})
	$('.Knight').click(function(){
		user=knight;
		updateUser();
		$('.Explore').show();
	})


	var monsters= function(name,hp,mp,atk,spd,def,special,agression){
		this.name= name,
		this.hp= hp,
		this.mp= mp,
		this.atk= atk,
		this.spd= spd,
		this.def= def,
		this.special= special,
		this.agression= agression
	}

	var bat =new monsters('Bat',10,0,5,10,10,'screach','timid');
	var rat = new monsters('Rat',5,0,10,15,10,'bite','agressive');
	var wolf = new monsters('Wolf',20,0,15,10,20,'howl','agressive');
	var slime = new monsters('Slime',15,20,10,5,25,'wiggle', 'timid');
	var snake = new monsters('Snake',20,10,15,15,15,'intimidate','agressive');

	var monsterList= [bat,rat,wolf,slime,snake,'Gate'];
	var enemy;

	var updateEnemy= function(){
		$('.monster .creature').text('Creature : '+enemy.name);
		$('.monster .hp').text('HP: '+enemy.hp);
		$('.monster .mp').text('MP: '+enemy.mp);
		$('.monster .atk').text('ATK: '+enemy.atk);
		$('.monster .spd').text('SPD: '+enemy.spd);
		$('.monster .def').text('DEF: '+enemy.def);
	};

	$('.Explore').click(function(){
		var chance= Math.floor(Math.random()*(monsterList.length+5));  console.log(chance);
		if(chance<monsterList.length-1){
			enemy= monsterList[chance];
			updateEnemy();
			combatOn();			
			combatLog('You encounter a '+monsterList[chance].name);

		} else if(monsterList[chance]==='Gate'){
			if(user.hasKey===true){ 
				$('.MoveOn').show();
				combatLog('You found a gate for the key, you may enter at any time');
			}else{
				combatLog('You found a gate but have no key, you must find a key.');
			}

		}else{
			user.hp+=1;
			updateUser();
			combatLog('You found nothing.');
			combatLog('You recovered slightly : +1HP');
		}
	})


	var damage=function (attacker,defender){
			defender.hp-= attacker.atk;
	};

	$('.Attack').click(function(){
		damage(user,enemy);
		updateEnemy();
		damage(enemy,user);
		updateUser();
	})


	// $('.test').click(function(){
	// 	$('.target').prepend('<ul> yeahuuuuu </ul>');
	// });








	//alert('are you even working?');





})