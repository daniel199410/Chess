/*
	Autor: Daniel Cataño Restrepo
	Año: 2016
*/
var board;
var moves = [];
var last_check = [];
var whiteTurn = true;
$(document).ready(function() {
	'use strict';
	var height = $('.col').width();
    $('.col').height(height);
	initBoard();
});

$(window).resize(function(){
	'use strict';
	var height = $('.col').width();
    $('.col').height(height);
});

function initBoard(){
	'use strict';
	//Se cargan las imágenes en su lugar inicial
		//Fichas negras
	$('#00').prepend('<img src="img/TorreNegro.png">');
	$('#01').prepend('<img src="img/CaballoNegro.png">');
	$('#02').prepend('<img src="img/AlfilNegro.png">');
	$('#03').prepend('<img src="img/ReinaNegro.png">');
	$('#04').prepend('<img src="img/ReyNegro.png">');
	$('#05').prepend('<img src="img/AlfilNegro.png">');
	$('#06').prepend('<img src="img/CaballoNegro.png">');
	$('#07').prepend('<img src="img/TorreNegro.png">');
	$('#10').prepend('<img src="img/PeonNegro.png">');
	$('#11').prepend('<img src="img/PeonNegro.png">');
	$('#12').prepend('<img src="img/PeonNegro.png">');
	$('#13').prepend('<img src="img/PeonNegro.png">');
	$('#14').prepend('<img src="img/PeonNegro.png">');
	$('#15').prepend('<img src="img/PeonNegro.png">');
	$('#16').prepend('<img src="img/PeonNegro.png">');
	$('#17').prepend('<img src="img/PeonNegro.png">');
	
		//Fichas blancas
	$('#60').prepend('<img src="img/PeonBlanco.png">');
	$('#61').prepend('<img src="img/PeonBlanco.png">');
	$('#62').prepend('<img src="img/PeonBlanco.png">');
	$('#63').prepend('<img src="img/PeonBlanco.png">');
	$('#64').prepend('<img src="img/PeonBlanco.png">');
	$('#65').prepend('<img src="img/PeonBlanco.png">');
	$('#66').prepend('<img src="img/PeonBlanco.png">');
	$('#67').prepend('<img src="img/PeonBlanco.png">');
	$('#70').prepend('<img src="img/TorreBlanco.png">');
	$('#71').prepend('<img src="img/CaballoBlanco.png">');
	$('#72').prepend('<img src="img/AlfilBlanco.png">');
	$('#73').prepend('<img src="img/ReinaBlanco.png">');
	$('#74').prepend('<img src="img/ReyBlanco.png">');
	$('#75').prepend('<img src="img/AlfilBlanco.png">');
	$('#76').prepend('<img src="img/CaballoBlanco.png">');
	$('#77').prepend('<img src="img/TorreBlanco.png">');
	initMatrix();
}

/*
	Se inicia una matriz (64 x 64) que contendrá la 
	información acerca de qué hay en una posición en 
	n instante de tiempo.
	Cada campo de la matriz contiene el tipo de ficha que hay 
	en la celda y su color
	
	Aquí las letras que caracterizarán a las fichas:
	b:black, w:white
	t:tower, h:horse, b:bishop, k:king, q:queen
	n: null
*/
function initMatrix(){
	'use strict';
	board = new Array(8);
	for(var i = 0; i < 8; i++){
		board[i] = new Array(8);
	}
	
	for(i = 0; i < 8; i++){
		for(var j = 0; j < 8; j++){
			if((i == 0) && (j == 0 || j == 7))
				board[i][j] = ['t', 'b'];
			else if((i == 0) && (j == 1 || j == 6))
				board[i][j] = ['h', 'b'];
			else if((i == 0) && (j == 2 || j == 5))
				board[i][j] = ['b', 'b'];
			else if((i == 0) && (j == 3))
				board[i][j] = ['q', 'b'];
			else if((i == 0) && (j == 4))
				board[i][j] = ['k', 'b'];
			/*else if((i == 4) && (j == 0))
				board[i][j] = ['p', 'b'];*/
			else if(i == 1)
				board[i][j] = ['p', 'b'];
				
			else if((i == 7) && (j == 0 || j == 7))
				board[i][j] = ['t', 'w'];
			else if((i == 7) && (j == 1 || j == 6))
				board[i][j] = ['h', 'w'];
			else if((i == 7) && (j == 2 || j == 5))
				board[i][j] = ['b', 'w'];
			else if((i == 7) && (j == 3))
				board[i][j] = ['q', 'w'];
			else if((i == 7) && (j == 4))
				board[i][j] = ['k', 'w'];
			else if(i == 6)
				board[i][j] = ['p', 'w'];
			else
				board[i][j] = ['n', 'n'];
		}
	}
}

function checkCell(x, y){
	restoreCell()
	var color = board[x][y][1];
	var id = '#' + x + y;
	if(moves.length > 0){
		paint(x, y);
		$(id).css("background-color", "#c4c158");
		moves.splice(0, moves.length);
		last_check = [x, y, board[x][y]];
	}else if(board[x][y][0] == 'p'){
		movePawn(x, y, board[x][y][1]);
		last_check = [x, y, board[x][y]];
		$(id).css("background-color", "#66652f");
	}else if(board[x][y][0] == 't'){
		moveTower(x, y, board[x][y][1]);
		last_check = [x, y, board[x][y]];
		$(id).css("background-color", "#66652f");
	}else if(board[x][y][0] == 'h'){
		moveHorse(x, y, board[x][y][1]);
		last_check = [x, y, board[x][y]];
		$(id).css("background-color", "#66652f");
	}else if(board[x][y][0] == 'b'){
		moveBishop(x, y, board[x][y][1]);
		last_check = [x, y, board[x][y]];
		$(id).css("background-color", "#66652f");
	}else if(board[x][y][0] == 'q'){
		moveQueen(x, y, board[x][y][1]);
		last_check = [x, y, board[x][y]];
		$(id).css("background-color", "#66652f");
	}else if(board[x][y][0] == 'k'){
		moveKing(x, y, board[x][y][1]);	
		$(id).css("background-color", "#66652f");
	}
}

/*
	Busca todas las posiciones hacia las que se puede mover
	un peón
*/
function movePawn(x, y, c){
	moves.splice(0, moves.length);
	var i = 0;
	/*
		b: black
		w: white
	*/
	switch(c){
		case 'b':
			if(x + 1 <= 7 && !whiteTurn){
			//Si hay una pieza enemiga en la diagonal izquierda '/'
				if(y - 1 >= 0 && board[x + 1][y - 1][1] == 'w'){
					moves[i] = [x + 1, y - 1];
					i++;
				}
				//Si no hay piezas al frente del peón
				if(board[x + 1][y][0] == 'n'){
					moves[i] = [x + 1, y];
					i++;
				}
				//Si hay una pieza enemiga en la diagonal deneracha '\'
				if(y + 1 <= 7 && board[x + 1][y + 1][1] == 'w'){
					moves[i] = [x + 1, y + 1];
					i++;
				}
				//Si no hay piezas en las dos casillas que están al frente del peón
				if(x == 1 && board[x + 2][y][0] == 'n' && board[x + 1][y][0] == 'n'){
					moves[i] = [x + 2, y];
				}
				if(i != 0){
					whiteTurn = true;	
				}
			}
		break;
		case 'w':
			if(x - 1 >= 0 && whiteTurn){
			//Si hay una pieza enemiga en la diagonal izquierda '/'
				if(y - 1 >= 0 && board[x - 1][y - 1][1] == 'b'){
					moves[i] = [x - 1, y - 1];
					i++;
				}
				//Si no hay piezas al frente del peón
				if(board[x - 1][y][0] == 'n'){
					moves[i] = [x - 1, y];
					i++;
				}
				//Si hay una pieza enemiga en la diagonal deneracha '\'
				if(y + 1 <= 7 && board[x - 1][y + 1][1] == 'b'){
					moves[i] = [x - 1, y + 1];
					i++;
				}
				//Si no hay piezas en las dos casillas que están al frente del peón
				if(x == 6 && board[x - 2][y][0] == 'n' && board[x - 1][y][0] == 'n'){
					moves[i] = [x - 2, y];
				}
				if(i != 0){
					whiteTurn = false;	
				}
			}
		break;
	}
}

/*
	Retorna todas la posiciones a las que se puede mover una torre
	desde cierta posición
*/
function moveTower(x, y, c){
	var color = board[x][y][1];
	if((whiteTurn && color == 'w') || (!whiteTurn && color == 'b')){
		var horizontalPositions = checkRows(x, y, c);
		var verticalPositions = checkCols(x, y, c);
		moves.splice(0, moves.length);
		moves = moves.concat(horizontalPositions, verticalPositions);
		whiteTurn = !whiteTurn;
	}
}

/*
	Retorna todas la posiciones a las que se puede mover un caballo
	desde cierta posición
*/
function moveHorse(x, y, c){
	var color = board[x][y][1];
	if((whiteTurn && color == 'w') || (!whiteTurn && color == 'b')){
		moves.splice(0, moves.length);
		var i = 0;
		// ─┐
		if(x - 1 >= 0 && y - 2 >= 0 && (board[x - 1][y - 2][0] == 'n' || board[x - 1][y - 2][1] != c)){
			moves[i] = [x - 1, y - 2];
			i++;
		}
		/*	┐
			│   */
		if(x - 2 >= 0 && y - 1 >= 0 && (board[x - 2][y - 1][0] == 'n' || board[x - 2][y - 1][1] != c)){
			moves[i] = [x - 2, y - 1];
			i++;
		}
		/*	┌
			│   */
		if(x - 2 >= 0 && y + 1 <= 7 && (board[x - 2][y + 1][0] == 'n' || board[x - 2][y + 1][1] != c)){ 
			moves[i] = [x - 2, y + 1];
			i++;
		}
		// ┌─
		if(x - 1 >= 0 && y + 2 <= 7 && (board[x - 1][y + 2][0] == 'n' || board[x - 1][y + 2][1] != c)){
			moves[i] = [x - 1, y + 2];
			i++;
		}
		//└	─
		if(x + 1 <= 7 && y + 2 <= 7 && (board[x + 1][y + 2][0] == 'n' || board[x + 1][y + 2][1] != c)){
			moves[i] = [x + 1, y + 2];
			i++;
		}
		/*	│
			└	*/
		if(x + 2 <= 7 && y + 1 <= 7 && (board[x + 2][y + 1][0] == 'n' || board[x + 2][y + 1][1] != c)){
			moves[i] = [x + 2, y + 1];
			i++;
		}
		/*	│
			┘	*/
		if(x + 2 <= 7 && y - 1 >= 0 && (board[x + 2][y - 1][0] == 'n' || board[x + 2][y - 1][1] != c)){
			moves[i] = [x + 2, y - 1];
			i++;
		}
		//	─┘
		if(x + 1 <= 7 && y - 2 >= 0 && (board[x + 1][y - 2][0] == 'n' || board[x + 1][y - 2][1] != c)){
			moves[i] = [x + 1, y - 2];
			i++;
		}
		whiteTurn = !whiteTurn;
	}
}

/*
	Retorna todas la posiciones a las que se puede mover un alfil
	desde cierta posición
*/
function moveBishop(x, y, c){
	var color = board[x][y][1];
	if((whiteTurn && color == 'w') || (!whiteTurn && color == 'b')){
		moves = checkDiag(x, y, c);
		whiteTurn = !whiteTurn;
	}
}

/*
	Retorna todas la posiciones a las que se puede mover una reina
	desde cierta posición
*/
function moveQueen(x, y, c){
	var color = board[x][y][1];
	if((whiteTurn && color == 'w') || (!whiteTurn && color == 'b')){
		var horizontalMoves = checkRows(x, y, c);	
		var verticalMoves = checkCols(x, y, c);
		var diagonalMoves = checkDiag(x, y, c);
		moves.splice(0, moves.length);
		moves = moves.concat(horizontalMoves, verticalMoves, diagonalMoves);
		whiteTurn = !whiteTurn;
	}
}

/*
	Retorna todas la posiciones a las que se puede mover un rey
	desde cierta posición
*/
function moveKing(x, y, c){
			
}

/*
	Busca todas las posiciones hacia las que se puede mover
	una ficha en sentido vertical
*/
function checkCols(x, y, c){
	//Posiciones que estén detrás de la ficha
	var behind = x - 1;
	var front = x + 1;
	var verticalPositions = [];
	var i = 0;
	/*
		Busca todas las posiciones hacia atrás verticalmente
		en las que se puede posicionar la ficha (de n a 0)
	*/
	while(behind >= 0){
		//Si la posición está vacía
		if(board[behind][y][0] == 'n'){
			verticalPositions[i] = [behind, y];
			i++;
			behind--;
		}else if(board[behind][y][0] != 'n' && board[behind][y][1] == c){
			//Si no está vacía y hay una ficha del mismo color
			behind = -1;	
		}else{
			//Si no está vacía y hay una ficha con un color diferente
			verticalPositions[i] = [behind, y];
			i++;
			behind = -1;
		}
	}
	
	/*
		Busca todas las posiciones hacia adelante verticalmente
		en las que se puede posicionar la ficha (de n a 7)
	*/
	while(front <= 7){
		//Si la posición está vacía
		if(board[front][y][0] == 'n'){
			verticalPositions[i] = [front, y];
			i++;
			front++;
		}else if(board[front][y][0] != 'n' && board[front][y][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			front = 8;	
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			verticalPositions[i] = [front, y];
			front = 8;
		}
	}
	return verticalPositions;
}

/*
	Busca todas las posiciones hacia las que se puede mover
	una ficha en sentido horizontal
*/
function checkRows(x, y, c){
	var behind = y - 1;
	var front = y + 1;
	var horizontalPositions = [];
	var j = 0;
	/*
		Busca todas las posiciones hacia atrás horizontalmente
		en las que se puede posicionar la ficha (de n a 0)
	*/
	while(behind >= 0){
		//Si la posición está vacía
		if(board[x][behind][0] == 'n'){
			horizontalPositions[j] = [x, behind];
			j++;
			behind--;
		}else if(board[x][behind][0] != 'n' && board[x][behind][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			behind = -1;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			horizontalPositions[j] = [x, behind];
			behind = -1;
			j++;
		}
	}
	/*
		Busca todas las posiciones hacia adelante horizontalmente
		en las que se puede posicionar la ficha (de n a 7)
	*/
	while(front <= 7){
		//Si la posición está vacía
		if(board[x][front][1] == 'n'){
			horizontalPositions[j] = [x, front];
			j++;
			front++;
		}else if(board[x][front][0] != 'n' && board[x][front][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			front = 8;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			horizontalPositions[j] = [x, front];
			front = 8;
		}
	}
	return horizontalPositions;
}

/*
	Busca todas las posiciones hacia las que se puede mover
	una ficha en sentido diagonal
*/
function checkDiag(x, y, c){
	var diag = [];
	var xx = x - 1;
	var yy = y - 1;
	var i = 0;
	//Búsqueda en la diagonal superior izquierda '\'
	while(xx >= 0 && yy >=0){
		//Si la posición está vacía
		if(board[xx][yy][0] == 'n'){
			diag[i] = [xx, yy];
			i++;
			xx--;
			yy--;
		}else if(board[xx][yy][0] != 'n' && board[xx][yy][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			xx = -1;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			diag[i] = [xx, yy];
			i++;
			xx = -1;
		}
	}
	xx = x + 1;
	yy = y + 1;
	//Búsqueda en la diagonal inferior derecha '\'
	while(xx <= 7 && yy <= 7){
		//Si la posición está vacía
		if(board[xx][yy][0] == 'n'){
			diag[i] = [xx, yy];
			i++;
			xx++;
			yy++;
		}else if(board[xx][yy][0] != 'n' && board[xx][yy][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			xx = 8;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			diag[i] = [xx, yy];
			i++;
			xx = 8;
		}
	}
	//Búsqueda en la diagonal superior derecha '/'
	xx = x - 1;
	yy = y + 1;
	while(xx >= 0 && yy <= 7){
		//Si la posición está vacía
		if(board[xx][yy][0] == 'n'){
			diag[i] = [xx, yy];
			i++;
			xx--;
			yy++;
		}else if(board[xx][yy][0] != 'n' && board[xx][yy][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			xx = -1;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			diag[i] = [xx, yy];
			i++;
			xx = -1;
		}
	}
	xx = x + 1;
	yy = y - 1;
	//Búsqueda en la diagonal inferior izquierda '/'
	while(yy >= 0 && xx <= 7){
		//Si la posición está vacía
		if(board[xx][yy][0] == 'n'){
			diag[i] = [xx, yy];
			i++;
			xx++;
			yy--;
		}else if(board[xx][yy][0] != 'n' && board[xx][yy][1] == c){
		//Si no está vacía y hay una ficha del mismo color
			yy = -1;
		}else{
		//Si no está vacía y hay una ficha con un color diferente
			diag[i] = [xx, yy];
			yy = -1;
		}
	}
	return diag;
}

/*
	Pinta una figura en la osición (x, y).
*/
function paint(x, y){
	var id = '#' + x + y; //El id del div en la que se va a pintar
	/*
		La última pieza que fue seleccionada y su color.
	*/
	var piece = last_check[2][0];
	var color = last_check[2][1];
	var figureImage;
	var imageColor;
	/*
		La posición (x ,y) de la última pieza seleccionada 
	*/
	var lastX = last_check[0];
	var lastY = last_check[1];
	var lastId = '#' + lastX + lastY;
	
	for(var i = 0; i < moves.length; i++){
		/*
			Si se selecciona una casilla a la que efectivamente se puede mover
			dependiendo del tipo de pieza se escoge el nombre y su color
		*/
		if(moves[i][0] == x && moves[i][1] == y){
			switch(piece){
				case 'p':
					figureImage = 'Peon';
				break;
				case 't':
					figureImage = 'Torre';
				break;	
				case 'h':
					figureImage = 'Caballo';
				break;
				case 'b':
					figureImage = 'Alfil';
				break;
				case 'q':
					figureImage = 'Reina';
				break;
				case 'k':
					figureImage = 'Rey';
				break;
			}
			switch(color){
				case 'w':
					imageColor = 'Blanco';
				break;
				case 'b':
					imageColor = 'Negro';
				break;	
			}
			//El nombre de la nueva imagen a insertar
			var imageName = '<img src="img/' + figureImage + imageColor + '.png">';
			/*
				Se elimina de la matriz la posición 
				anterior de la ficha que se movió
			*/
			board[lastX][lastY][0] = 'n';
			board[lastX][lastY][1] = 'n';
			/*
				Se actualiza la posición de la ficha
			*/
			board[x][y][0] = piece;
			board[x][y][1] = color;
			/*
				Se elimina de la posición actual y de la que se va a 
				mover la imagen existente en ese DIV y se agrega la imagen
				correspondiente en el DIV al que se va a mover la ficha.
			*/
			$(lastId).children().remove();
			$(id).children().remove();
			$(id).prepend(imageName);
			break;
		}
	}
}

/*
	Vuelve a poner el color original de las últimos celdas
*/
function restoreCell(){
	var lastx = last_check[0];
	var lasty = last_check[1];
	var lastId = '#' + lastx + lasty;
	//Si la celda es blanca
	if((lastx + lasty) % 2 == 0){
		$(lastId).css("background-color", "#e0bf94");
	}else{
	//Si no
		$(lastId).css("background-color", "#b67743");
	}
}