/**
 * 
 * The MIT License (MIT)
 * 
 * Copyright (c) 2015 Beau Durrant
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

/**
 * Makes a text editor based on domID of iframe
 * @param string domID "domID of the text editor"
 * @param array options "execCommands"
 * @param array plugins "custom plugins/include their own css and js 
 */
function WYSIWYG(domID, options, plugins){
	// Dom id of the iframe
	this.iframePath = 'window.'+domID+'_FRAME.document';
	this.domID = domID;
	this.options = options;
	this.plugins = plugins;
	this.buttonHeight = 20;	
	// load the css file and plugin js/css
	this.includeCSS('WYSIWYG');
	if(plugins){
		if(plugins.length > 0){ this.includeJS('plugins/MODAL'); this.includeCSS('plugins/MODAL'); }	
		for(i=0;i<plugins.length;i++){  this.includeJS('plugins/'+plugins[i]); this.includeCSS('plugins/'+plugins[i]); }
	}
	this.makeButtons();
}

/**
 * Includes a js file
 * @param string file "file path to be included"
 */
WYSIWYG.prototype.includeJS = function(file){
    document.write('<script type="text/javascript" src="/js/'+file+'.js"></script>');
}

/**
 * Includes a css file
 * @param string file "file path to be included"
 */
WYSIWYG.prototype.includeCSS = function(file){
    document.write('<link rel="stylesheet" type="text/css" href="/css/'+file+'.css">');
}

/**
 * Updates the textarea with contents from the frame
 * return int "left position"
 */
WYSIWYG.prototype.updateTextArea = function(){
	textarea = document.getElementById(this.domID);
	// fill content with textarea value
	command = 'textarea.value=' + this.iframePath + '.body.innerHTML';
	eval(command);
}

/**
 * Gets the top position of the textarea
 * @return int "top position"
 */
WYSIWYG.prototype.getFrameTop = function(){
	if(document.getElementById) {	
		var elem = document.getElementById(this.domID+'_FRAME');
	} else if (document.all) {
		var elem = document.all[this.domID+'_FRAME'];
	}
	yPos = elem.offsetTop;
	tempEl = elem.offsetParent;
	while (tempEl != null) {
  		yPos += tempEl.offsetTop;
		tempEl = tempEl.offsetParent;
  	}
	return yPos;
		
}

/**
 * Gets the left position of the textarea
 * @return int "left position"
 */
WYSIWYG.prototype.getFrameLeft = function(){
	if(document.getElementById) {
		var elem = document.getElementById(this.domID+'_FRAME');
	} else if (document.all){
		var elem = document.all[this.domID+'_FRAME'];
	}
	xPos = elem.offsetLeft;
	tempEl = elem.offsetParent;
  	while (tempEl != null) {
  		xPos += tempEl.offsetLeft;
		tempEl = tempEl.offsetParent;
  	}
	return xPos;
}

/**
 * Check to see if a value is in a plugin
 * @param string value "value to look for"
 * @return bool "true or false"
 */
WYSIWYG.prototype.isPlugin = function(value){
	for(i=0;i<this.plugins.length;i++){
		if(this.plugins[i] == value)
			return true;
	}
	return false;
}

/**
 * Makes editor buttons based on browser and avaliable options
 */
WYSIWYG.prototype.makeButtons = function(){
	for(i=0;i<this.options.length;i++){
		command = this.iframePath + '.execCommand("'+this.options[i]+'", false, "")';
		try{
			eval(command);
			document.getElementById(this.domID+'_BUTTONS').innerHTML += this.button(this.options[i]);
		}catch(e){
			var buttons = this.domID+'_BUTTONS';
			console.log( e );
			console.log( buttons );
			console.log( document.getElementById(buttons) );
			console.log( document.getElementById(this.domID+'_BUTTONS') );
			document.getElementById(this.domID+'_BUTTONS').innerHTML = document.getElementById(this.domID+'_BUTTONS').innerHTML.replace(this.button(this.options[i]), '');
		}
	}
	
	// add buttons for the link, image and html
	command = this.iframePath + '.execCommand("insertimage", false, " ")';
	try{
		eval(command);
		for(i=0;i<this.plugins.length;i++){ document.getElementById(this.domID+'_BUTTONS').innerHTML += this.pluginButton(this.plugins[i]); }
	}catch(e){
		for(i=0;i<this.plugins.length;i++){ document.getElementById(this.domID+'_BUTTONS').innerHTML.replace(this.pluginButton(this.plugins[i]), '') }
	}

	// fill content with textarea value
	textarea = document.getElementById(this.domID);
	command = this.iframePath + '.body.innerHTML = textarea.value';
	eval(command);
}

/**
 * This makes a simple button and to add the the _BUTTONS div
 * @param string type "type of command to make the button for"
 * @return html "html of the button to add"
 */
WYSIWYG.prototype.button = function(type){
	return '<button id="WYSIWYG_'+type+'" class="WYSIWYG_'+type+'" title="'+type+'" onClick="'+this.domID+'.fontEdit(\''+type+'\')" /></button>';
}

/**
 * This makes a plugin button and to add the the _BUTTONS div
 * @param string type "type of command to make the button for"
 * @return html "html of the button to add"
 */
WYSIWYG.prototype.pluginButton = function(type){
	return '<button id="WYSIWYG_'+type+'" class="WYSIWYG_'+type+'" title="'+type+'" onClick="'+this.domID+'.open'+type+'Window();" /></button>';
}

/**
 * Executes a browsers execCommand
 * @param string command "Command to execute"
 * @param string value "Value corrosponding with the command"
 */
WYSIWYG.prototype.fontEdit = function(command,value){
	// move focus to this box if it doesnt already have it
	eval(this.iframePath+'.body.focus();');
	// Change to the insertHTMl to work across all browers
	if(command == 'insertHTML'){
		random_string = "insert_html_" + Math.round(Math.random()*100000000);
		command = this.iframePath + '.execCommand("insertimage",false,"' +  random_string + '")';
		eval(command);
		pat = new RegExp("<[^<]*" + random_string + "[^>]*>");
		command = this.iframePath + '.body.innerHTML = ' + this.iframePath + '.body.innerHTML.replace(pat, value);';
		eval(command);
	}
	else{
		if(value == undefined) value = '';
		command = this.iframePath + '.execCommand("'+command+'",false,"'+value+'")';
		eval(command);
	}
	this.updateTextArea();
}