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
 * Opens a new window with the html from the editor in it
 */
WYSIWYG.prototype.openHTMLWindow = function(){
	this.openModalWindow('HTML');
}

/**
 * Draw the content
 */
WYSIWYG.prototype.drawHTMLWindow = function(){
	text = eval(this.iframePath + '.body.innerHTML');
	text = '<textarea id="'+this.domID+'_HTML_EDIT" class="WYSIWYG_HTML_EDIT" style="width:'+(this.modalwidth.replace('px','')-10)+'px; height: '+(this.modalheight.replace('px','')-50)+'px; margin: 5px;">'+text+'</textarea><button style="margin: 5px;" onClick="'+this.domID+'.updateHTML()">Update HTML</button>';
	document.getElementById(this.domID+'_MODAL_CONTENT').innerHTML = text;	
}

/**
 * Updates HTML from the modal to the text area
 */
WYSIWYG.prototype.updateHTML = function(){
	text = document.getElementById(this.domID+'_HTML_EDIT').value;
	var iframe = document.getElementById(this.domID+'_FRAME');
	ifrm = (iframe.contentWindow) ? iframe.contentWindow : (iframe.contentDocument.document) ? iframe.contentDocument.document : iframe.contentDocument;
	ifrm.document.open();
	ifrm.document.write(text);
	ifrm.document.close();
	this.closeModalWindow();
}