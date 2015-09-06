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
WYSIWYG.prototype.openIMAGEWindow = function(){
	this.openModalWindow('IMAGE');
}

/**
 * Draw the content
 */
WYSIWYG.prototype.drawIMAGEWindow = function(){
	text = '<input id="'+this.domID+'_IMAGE_URL" class="WYSIWYG_IMAGE_URL" style="width:'+(this.modalwidth.replace('px','')-10)+'px; margin: 5px;" value="http://"><button style="margin: 5px;" onClick="'+this.domID+'.insertIMAGE()">Insert Image</button>';
	document.getElementById(this.domID+'_MODAL_CONTENT').innerHTML = text;
	
}

/**
 * Inserts the image
 */
WYSIWYG.prototype.insertIMAGE = function(){
	src = document.getElementById(this.domID+'_IMAGE_URL').value;
	this.fontEdit('insertimage', src);	
	this.closeModalWindow();
}