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
 * Opens a modal window
 * @param string type "type of modal that is being opened"
 */
WYSIWYG.prototype.openModalWindow = function(type){
	modaltop = this.getFrameTop();
	modalleft = this.getFrameLeft();
	this.modalheight = document.getElementById(this.domID+'_FRAME').style.height;
	this.modalwidth = document.getElementById(this.domID+'_FRAME').style.width;
	document.getElementById(this.domID+'_MODAL').style.top = (modaltop-this.buttonHeight)+'px';
	document.getElementById(this.domID+'_MODAL').style.left = modalleft+'px';
	document.getElementById(this.domID+'_MODAL').style.width = this.modalwidth;
	document.getElementById(this.domID+'_MODAL').style.height = (parseInt(this.modalheight.replace('px', ''))+this.buttonHeight)+'px';
	document.getElementById(this.domID+'_MODAL').className = 'WYSIWYG_MODAL';
	document.getElementById(this.domID+'_MODAL_CLOSE').href = 'javascript:'+this.domID+'.closeModalWindow()';
	document.getElementById(this.domID+'_MODAL_HEADER').innerHTML = type;
	eval('this.draw'+type+'Window();');
}

/**
 * Closes the modal window
 */
WYSIWYG.prototype.closeModalWindow = function(){
	document.getElementById(this.domID+'_MODAL').className = 'WYSIWYG_MODAL hidden';
}