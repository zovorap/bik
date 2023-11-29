var pole, button, buttonNew, table, form, numLength, numberToGuess, fGV, bull, cow, myBull, myCow, nothing, myLength;
//$.fx.speeds._default = 300;

$(function() {
$('#hidden').css({'display':'block'});

table = $('#results');
pole = $('#yourNumber').focus().keypress(function(){if(event.charCode!=13&&((event.charCode < 48)||(event.charCode > 57))) return false;});
form = $('#mainForm').submit(function(){check(this); return false;});
button = $('#goBtn');//.attr('disabled',true)

buttonNew = $('#newGameBtn').click(function(){$( "#newGame-dialog" ).dialog( "open" );});

$('#gameRulesBtn').click(function(){$( "#gameRules-dialog" ).dialog( "open" );});

$('#noGame').remove();
$('#title').hide();
numLength = $('input[name="level"]:checked').val();

$('#giveupBtn').click(giveUp);
$('#radio input').click(function(){$( "#newGame-dialog" ).dialog( "open" );});

bull = '<div class="bull-cow"><img src="style/images/bull.png" alt="bull" width="30" height="30" /></div>';
cow = '<div class="bull-cow"><img src="style/images/cow.png" alt="bull" width="30" height="30" /></div>';
nothing = '<div class="bull-cow"><img src="style/images/nothing.png" alt="nothing" width="30" height="30" /></div>';

myBull = [];
myCow = [];

randNum();

pole.val('');

$( "#radio" ).buttonset();

$( "#shortNumber, #sameFigure, #empty").dialog({
					resizable: false,
					autoOpen: false,
					show: "blind",
					hide: "explode",
					modal: true,
					height:160,					
					buttons: {Ok: function() {$( this ).dialog( "close" );inPole();}},					
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();
					
$( "#numberDialog").dialog({
					resizable: false,
					autoOpen: false,
					show: "blind",
					hide: "explode",
					modal: true,
					height:160,	
					width:350,				
					buttons: {"Начать новую игру": function() {$(this).dialog( "close" );
											 newGame();    										 							 											
											 },
								"Посмотреть ход игры": function() {$( this ).dialog( "close" );	pole.attr('disabled',true);	button.attr('disabled',true);}
						}
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();
					
					/*buttons: {'': function() {;newGame();},
								'': function() {$( this ).dialog( "close" );newGame();}					
					})*/					

$( "#gameRules-dialog").dialog({
					autoOpen: false,
					show: "blind",
					hide: "explode",
					modal: true,
					height:650,
					width:600,
					buttons: {Ok: function() {$( this ).dialog( "close" );inPole();}},	
					close:inPole(),			
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();

$( "#giveup-dialog" ).dialog({
			resizable: false,
			autoOpen: false,
			show: "blind",
			hide: "explode",
			height:160,
			modal: true,
			buttons: {"Сдаться": function() {$(this).dialog( "close" );
											 $("#numberDialog p").text('Было загадано число "'+numberToGuess+'"');
						    				 $( "#numberDialog" ).dialog( "open" );
											 //newGame();
    										 return false;											 											
											 },
					"Продолжить игру": function() {$( this ).dialog( "close" );	inPole();}
						}
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();

$( "#winner-dialog" ).dialog({
			resizable: false,
			autoOpen: false,
			show: "blind",
			hide: "explode",
			height:160,
			modal: true,
			buttons: {"Начать новую игру": function() {$(this).dialog( "close" );
											 newGame();
    										 return false;											 											
											 },
					"Закрыть": function() {$( this ).dialog( "close" );
													pole.attr('disabled',true);
													button.attr('disabled',true);
													inPole();
												  }
						}
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();

$( "#newGame-dialog" ).dialog({
			resizable: false,
			autoOpen: false,
			show: "blind",
			hide: "explode",
			height:160,
			modal: true,
			buttons: {"Да": function() {$(this).dialog( "close" );
											 newGame();
    										 return false;											 											
											 },
					"Нет": function() {$( this ).dialog( "close" );
					if(numLength=='three'){
						$('input[name="level"][value=three]').attr('checked', 'checked').button( "widget" ).addClass("ui-state-active").attr("aria-pressed", true);
						$('input[name="level"][value=four]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
						$('input[name="level"][value=five]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
						
					};								
					if(numLength=='four'){
						$('input[name="level"][value=four]').attr('checked', 'checked').button( "widget" ).addClass("ui-state-active").attr("aria-pressed", true);
						$('input[name="level"][value=three]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
						$('input[name="level"][value=five]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
											
						};
					if(numLength=='five'){
						$('input[name="level"][value=five]').attr('checked', 'checked').button( "widget" ).addClass("ui-state-active").attr("aria-pressed", true);
						$('input[name="level"][value=four]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
						$('input[name="level"][value=three]').button( "widget" ).removeClass("ui-state-active").attr("aria-pressed", false);
											
						};
					
										inPole();
												  }
						}
					}).dialog({ closeOnEscape: false }).parent().find('.ui-dialog-titlebar-close').hide();

$( "button, input:submit").button();

$('#someText').show();



}); //end of document.ready

function randNum(){
first = Math.floor(Math.random()*10);
for(second = Math.floor(Math.random()*10);second==first;){second = Math.floor(Math.random()*10);}
for(third = Math.floor(Math.random()*10);third==first||third==second;){third = Math.floor(Math.random()*10);}
for(fourth = Math.floor(Math.random()*10);fourth==first||fourth==second||fourth==third;){fourth = Math.floor(Math.random()*10);}
for(fifth = Math.floor(Math.random()*10);fifth==first||fifth==second||fifth==third||fifth==fourth;){fifth = Math.floor(Math.random()*10);}

if (numLength=='three'){numberToGuess = '' + first + second + third; pole.attr('maxlength', 3); myLength=3;}
else if (numLength=='four'){numberToGuess = '' + first + second + third + fourth; pole.attr('maxlength', 4); myLength=4;}
else if (numLength=='five'){numberToGuess = '' + first + second + third + fourth + fifth; pole.attr('maxlength', 5); myLength=5;}
$('#top b').text(' загадано - '+numberToGuess);
return numberToGuess;

}

function check(frm){
	$('#title').show();
	$('#someText').hide();
	
    fGV=frm.guess.value; myBull = []; myCow = [];	
	
    if(fGV=="" || isNaN(fGV)==true){ $( "#empty" ).dialog( "open" ); }
	
    else{
				
        if(fGV == numberToGuess){table.append('<div class="string"><div class="number">'+fGV+' - </div>'+'<div class="number">Верно!</div>'+'</div>'); $( "#winner-dialog" ).text('Поздравляю! Вы победили! Это, действительно, число '+numberToGuess+'.').dialog( "open" );}		
		
		else if (fGV.length<numberToGuess.length){
			$( "#shortNumber p").text('В загаданном числе '+myLength+' цифр(ы). Вы ввели слишком короткое число.');
			$( "#shortNumber" ).dialog( "open" );
			}
        
		else if(numberToGuess.length==3&&(fGV[1]==fGV[0]||fGV[2]==fGV[0]||fGV[2]==fGV[1]))
               {$( "#sameFigure" ).dialog( "open" );}
			   
 	    else if(numberToGuess.length==4&&(fGV[1]==fGV[0]||fGV[2]==fGV[0]||fGV[2]==fGV[1]||fGV[3]==fGV[0]||fGV[3]==fGV[1]||fGV[3]==fGV[2]))
               {$( "#sameFigure" ).dialog( "open" );}
        
		else if(numberToGuess.length==5&&(fGV[1]==fGV[0]||fGV[2]==fGV[0]||fGV[2]==fGV[1]||fGV[3]==fGV[0]||fGV[3]==fGV[1]||fGV[3]==fGV[2]||fGV[4]==fGV[0]||fGV[4]==fGV[1]||fGV[4]==fGV[2]||fGV[4]==fGV[3]))
               {$( "#sameFigure" ).dialog( "open" );}
       
        else{
                for(var i=0; i<numberToGuess.length; i++){
                    if(fGV[i]==numberToGuess[i]){myBull[i]=bull;}
                }
                
                if(numberToGuess.length==3){
                if(fGV[0]==numberToGuess[1]||fGV[0]==numberToGuess[2]){myCow.push(cow);}
			    if(fGV[1]==numberToGuess[0]||fGV[1]==numberToGuess[2]){myCow.push(cow);}
			    if(fGV[2]==numberToGuess[1]||fGV[2]==numberToGuess[0]){myCow.push(cow);}
                }
                                
                if(numberToGuess.length==4){
                if(fGV[0]==numberToGuess[1]||fGV[0]==numberToGuess[2]||fGV[0]==numberToGuess[3]){myCow.push(cow);}
                if(fGV[1]==numberToGuess[0]||fGV[1]==numberToGuess[2]||fGV[1]==numberToGuess[3]){myCow.push(cow);}
                if(fGV[2]==numberToGuess[0]||fGV[2]==numberToGuess[1]||fGV[2]==numberToGuess[3]){myCow.push(cow);}
                if(fGV[3]==numberToGuess[0]||fGV[3]==numberToGuess[1]||fGV[3]==numberToGuess[2]){myCow.push(cow);}
                }
                                
                if(numberToGuess.length==5){                
                if(fGV[0]==numberToGuess[1]||fGV[0]==numberToGuess[2]||fGV[0]==numberToGuess[3]||fGV[0]==numberToGuess[4]){myCow.push(cow);}
                if(fGV[1]==numberToGuess[0]||fGV[1]==numberToGuess[2]||fGV[1]==numberToGuess[3]||fGV[1]==numberToGuess[4]){myCow.push(cow);}
                if(fGV[2]==numberToGuess[0]||fGV[2]==numberToGuess[1]||fGV[2]==numberToGuess[3]||fGV[2]==numberToGuess[4]){myCow.push(cow);}
                if(fGV[3]==numberToGuess[0]||fGV[3]==numberToGuess[1]||fGV[3]==numberToGuess[2]||fGV[3]==numberToGuess[4]){myCow.push(cow);}
                if(fGV[4]==numberToGuess[0]||fGV[4]==numberToGuess[1]||fGV[4]==numberToGuess[2]||fGV[4]==numberToGuess[3]){myCow.push(cow);}
                }
          if(myBull!=''||myCow!=''){
		
		  table.append('<div class="string"><div class="number">'+fGV+' - </div>'+myBull.join('')+myCow.join('')+'</div>');}	  
			
          else{table.append('<div class="string"><div class="number">'+fGV+' - </div>'+nothing+'</div>');}
           
          
          pole.select(); pole.val(''); 
        
      }/*конец проверки 'если все в порядке'*/  
    }/*конец проверки числа*/
}/*конец проверки*/

function newGameWin() {window.location.reload();}

function newGame() {numLength = $('input[name="level"]:checked').val(); randNum(); inPole(); table.text(''); pole.attr('disabled',false); button.attr('disabled',false); $('#title').hide(); $('#someText').show();}

function giveUp() {$( "#giveup-dialog" ).dialog( "open" );}

function inPole() {pole.val(''); pole.select()}