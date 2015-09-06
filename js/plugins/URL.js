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
 * 
 */

/**
 * Opens a new window to enter an image url
 */
WYSIWYG.prototype.openURLWindow = function(){
	this.openModalWindow('URL');
}

/**
 * Draw the content
 */
WYSIWYG.prototype.drawURLWindow = function(){
	urlinput = '<input id="'+this.domID+'_URL_NAME" class="WYSIWYG_URL" style="width:'+(this.modalwidth.replace('px','')-10)+'px; margin: 5px;" value="">';
	textinput = '<input id="'+this.domID+'_URL_LOCATION" class="WYSIWYG_URL" style="width:'+(this.modalwidth.replace('px','')-10)+'px; margin: 5px;" value="http://">';
	button = '<button style="margin: 5px;" onClick="'+this.domID+'.insertURL()">Insert URL</button>';
	document.getElementById(this.domID+'_MODAL_CONTENT').innerHTML = urlinput + textinput + button;
	
}

/**
 * Inserts the image
 */
WYSIWYG.prototype.insertURL = function(){
	url = document.getElementById(this.domID+'_URL_LOCATION').value;
	text = document.getElementById(this.domID+'_URL_NAME').value;
	this.fontEdit('insertHTML', '<a href="'+url+'">'+text+'</a>');
	this.closeModalWindow();
}