/*
*/

$(document).ready(function() {
	var score =0;
	var ttsData = [
		{
			clue: 'kongkorongok',
			answer: 'ayam',
			orientation: 'menurun',
			no: 2,
			startx: 5,
			starty: 0
		},

		{
			clue: 'Kalian Semua Suci Aku Penuh Dosa',
			answer: 'awkarin',
			orientation: 'menurun',
			no: 4,
			startx: 9,
			starty: 3
		},

		{
			clue: '... ibu',
			answer: 'doa',
			orientation: 'menurun',
			no: 6,
			startx: 6,
			starty: 9
		},

		{
			clue: 'Keadaan Mental Umur 17-21 thn',
			answer: 'labil',
			orientation: 'menurun',
			no: 8,
			startx: 7,
			starty: 3
		},		
		
		{
			clue: 'orang bawahan; pelayan; hamba;',
			answer: 'abdi',
			orientation: 'menurun',
			no: 10,
			startx: 3,
			starty: 6
		},	

		{
			clue: 'Hotel?',
			answer: 'trivago',
			orientation: 'mendatar',
			no: 1,
			startx: 1,
			starty: 0
		},

		{
			clue: 'Warteg?',
			answer: 'mulya',
			orientation: 'mendatar',
			no: 3,
			startx: 5,
			starty: 3
		},

		

		{
			clue: 'Kamu itu udah aku anggap teman terbaikku',
			answer: 'friendzone',
			orientation: 'mendatar',
			no: 5,
			startx: 1,
			starty: 9
		},

		{
			clue: 'DBMS air gemericik',
			answer: 'riak',
			orientation: 'mendatar',
			no: 7,
			startx: 9,
			starty: 7
		},

		{
			clue: 'tingkat dalam peralihan suatu keadaan pada keadaan lain',
			answer: 'gradasi',
			orientation: 'mendatar',
			no: 9,
			startx: 1,
			starty: 6
		},
	],
		tableWidth = 12,
		tableHeight = 13

	function makeTable() {
		table = "<table><tbody>"
		for (var col=0; col<tableWidth; col++) {
			table += "<tr>"
			for(var row=0; row<tableHeight; row++) {
				table += "<td data-coord=" + row + "," + col + "></td>"
			}
			table += "</tr>"
		}
		$('#tts-wrapper').append(table)
	}

	function makeEntries() {
		$.each(ttsData, function (idx, obj) { 
			if (obj.orientation == 'menurun'){ 
				fillColumn(obj.starty, obj.startx, obj.answer.length, obj.no);
			}
			if (obj.orientation == 'mendatar') {
				fillRow(obj.startx, obj.starty, obj.answer.length, obj.no);
			}
		});
	}

	function fillRow(startx, y, length, no) {
		input = '<input maxlength="1" val="" type=text tabindex="-1" />'
		$("td").filter('[data-coord="' + startx + "," + y + '"' +"]").append("<span>" + no + "</span>");
		for (var i=startx; i<length+startx; i++){
			cell = $("td").filter('[data-coord="' + i + "," + y + '"' +"]");
			if (!cell.find("input").length) {
				cell.append(input);
			}
			cell.addClass('entry-' + no)
		}
	}

	function fillColumn(starty, x, length, no) {
		input = '<input maxlength="1" val="" type=text tabindex="-1" />'
		$("td").filter('[data-coord="' + x + "," + starty + '"' +"]").append("<span>" + no + "</span>");
		for (var i=starty; i<length+starty; i++){
			cell = $("td").filter('[data-coord="' + x + "," + i + '"' +"]");
			cell.append(input);
			cell.addClass('entry-' + no)
		}
	}

	function makeClues() {
		$.each(ttsData, function (idx, obj) { 
			if (obj.orientation == 'mendatar') {
				$("#mendatar").append('<li class=entry-' + obj.no + '>' + obj.no + ". " + obj.clue + '</li>');
			}
			if (obj.orientation == 'menurun')  {
				$("#menurun").append('<li class=entry-' + obj.no + '>' + obj.no + ". " + obj.clue + '</li>');
			}
		});
	}

	function eventListener() {
		$("input").on('keyup', function () {
			checkAnswer();	
		});
	}

	function checkAnswer() {
		$.each(ttsData, function (idx, obj) { 
			input = $(".entry-" + obj.no).find("input");
			answer = $(input).map(function() {
				return $(this).val();
			}).get();
			if (answer.join('').toLowerCase() == obj.answer) {
				correctElement = input.parent().attr("class");
				input.addClass('correct');
				score+=25;
				
			}
		});
	}


	

	function init() {
		makeTable();
		makeEntries();
		makeClues();
		eventListener();
	}

	init();
});