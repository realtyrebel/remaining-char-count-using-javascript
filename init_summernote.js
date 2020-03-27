// Background color
//$('#summernote').summernote('backColor', 'red');

// Foreground color
//$('#summernote').summernote('foreColor', 'blue');

// @param {Number} line height - unit is px
//$('#summernote').summernote('lineHeight', 20);

// @param {Number} font size - unit is px
//$('#summernote').summernote('fontSize', 20);

$('.summernote').summernote({	
	height: 300,
	/*
	airMode: true,
	popover: {
		air: [
			// [groupName, [List of buttons]]
			['fontsize', ['fontsize']],
			['style', ['bold', 'italic', 'underline', 'clear']],
			['para', ['ul', 'ol']],
		]
	
	},
	*/
    
	toolbar: [
	// [groupName, [List of buttons]]
	//['fontsize', ['fontsize']],
	['style', ['bold', 'clear']],
	['para', ['ul', 'ol']],
	],
	
	disableDragAndDrop: true,
	shortcuts: false,
	callbacks: {
		onKeydown: function (e) {
					// get value of textarea data-limit variable
					var limit = parseInt($(this).data('limit'));
					if(!limit){
						return true;
					}
					
					var text = e.currentTarget.innerText;
					//if (text.trim().length >= 400) {
					if (text.length >= limit) {//if 
						//delete keys, arrow keys, copy, cut, select all
						if (e.keyCode != 8 && !(e.keyCode >=37 && e.keyCode <=40) && e.keyCode != 46 && !(e.keyCode == 88 && e.ctrlKey) && !(e.keyCode == 67 && e.ctrlKey) && !(e.keyCode == 65 && e.ctrlKey)) {
							e.preventDefault();
						}
					}
				},				
				
				onKeyup: function (e) {
					// get value of textarea data-limit variable
					var limit = parseInt($(this).data('limit'));
					if(!limit){
						return true;
					}
					
					var text = e.currentTarget.innerText;
					var totalCharacters = text.length;
					var counterContainerId = 'counter_for_' + $(this).attr('name');
					var counterElement = $('#' + counterContainerId);
					
					if(!counterElement.length){//if counterElement doesn't exist
						counterElement = $('<span>',{id: counterContainerId, class: 'redtext'});
						$(this).next().after(counterElement);
					}
					
					counterElement.text((limit - totalCharacters) + ' characters remaining');
				},
				
				onPaste: function (e) {
					// get value of textarea data-limit variable
					var limit = parseInt($(this).data('limit'));
					if(!limit){
						return true;
					}
					
					var text = e.currentTarget.innerText;
					var totalCharacters = text.length;
					var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
					e.preventDefault();
					var maxPaste = bufferText.length;
					//if(text.length + bufferText.length > 400){
					if(totalCharacters + bufferText.length > limit){
						//maxPaste = 400 - text.length;
						maxPaste = limit - totalCharacters;
					}
					if(maxPaste > 0){
						document.execCommand('insertText', false, bufferText.substring(0, maxPaste));
					}
					
					//$('.maxContentPost').text(limit - totalCharacters);
					var counterContainerId = 'counter_for_' + $(this).attr('name');
					var counterElement = $('#' + counterContainerId);
					
					if(!counterElement.length){//if counterElement doesn't exist
						counterElement = $('<span>',{id: counterContainerId, class: 'redtext'});
						$(this).next().after(counterElement);
					}
					
					counterElement.text((limit - totalCharacters) + ' characters remaining');
				}
	}
});
/*
$('.summernote').summernote('backColor', 'white');
$('.summernote').summernote('foreColor', 'black');
$('.summernote').summernote('lineHeight', 12);
$('.summernote').summernote('fontSize', 12);
*/
