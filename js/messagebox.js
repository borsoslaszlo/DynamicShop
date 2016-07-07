/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function messagebox (text)
{
    
    win_width = $(window).width();
    win_height = $(window).height();
    mbox_width = 300;
    mbox_height = 200;
    
    top_of_box = Math.round ((win_height-mbox_height)/2);
    left_of_box =  Math.round ((win_width-mbox_width)/2);
    
            
    
    
$("body").append ('<div id="mbox"  '+  
        'style ="position:fixed;display:block;top:'+top_of_box+';left:'+left_of_box+';width:'+mbox_width+';'+ 
        'height:'+mbox_height+';background-color:red; border: 1px solid black; border-radius: 5px;  ">' + 
         '<div class="remove_div" >'+
         '<input type="button"  value = "x"  onclick="close_messagebox(); " />  </div>' +
         
         '<p>' +text + ' </p> </div>');

//

 //$(document).remove ('#mbox');
}


function close_messagebox ()
{
    
    $('#mbox').remove();
    
}