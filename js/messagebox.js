/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

function messagebox (text)
{
    
    win_width = $(window).width();
    win_height = $(window).height();
    
    
    mbox_width = Math.round(win_width/4);
    mbox_height = Math.round(win_height/6);
    
    
   
    alert ('win_width:'+win_width + ' mbox_width:'+mbox_width);
    
    
    
    top_of_box = Math.round ((win_height-mbox_height)/2);
    left_of_box =  Math.round ((win_width-mbox_width)/2);
    
    
    // if you dont want in percent comment out this 4 lines below
    /****/
    top_of_box =   Math.round( (100/win_height)*((win_height-mbox_height)/2));
    left_of_box =  Math.round( (100/win_width)*((win_width-mbox_width)/2));
    top_of_box = top_of_box+'%';
    left_of_box = left_of_box+'%';
    /****/
    
    
    mbox_width = mbox_width+"px";
    mbox_height = mbox_height +"px";


    
    
    
$("body").append ('<div id="mbox"  '+  
        'style ="position:fixed;display:block;top:'+top_of_box+';left:'+left_of_box+';width:'+mbox_width+';'+ 
        'height:'+mbox_height+';background-color:red; border: 1px solid black; border-radius: 5px;  overflow-y:scroll; ">' + 
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


function alert_x (message,title)
{
    /*
     $("<div></div>").dialog( {
    buttons: { "Ok": function () { $(this).dialog("close"); } },
    close: function (event, ui) { $(this).remove(); },
    resizable: false,
    title: title,
    modal: true
  }).text(message);
    */
   
   
     $("<div>"+message+"</div>").dialog(
             {
                 buttons: { "Ok": function () { $(this).dialog("close"); }},
                 title : ""+title+"",
                 width:300,
                 height:200,
                 modal:true,
                 position: {my:"center center",at:"center center", of:window},
                 closeOnEscape: true
             });
             $(".ui-widget-header").css("background-color","red");
                
   
   
   /*
   $(function() {
    $( "#dialog" ).dialog();
  });
  */
    
}


