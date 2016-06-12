<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <head>
        <meta charset="UTF-8">
        <title></title>
        
        <link  rel ="stylesheet" href="css/stylesheet.css"  />
        <script src="js/jquery-3.0.0.min.js"></script>
        
        <script type="text/javascript">
            
            function add_new_input_field ()
            {
                $('<p> <input id="a"> </p>').appendTo(div_article_properties);
                
            }
            
        
              function calculate_divs()
            {
                 //height_window =$(window).innerHeight()
                 //alert (height_window);


                 height_container = $("#container").height();
                 //alert (height_container);
                 //height_container = $(window).height();

                 height_menu_and_logo =$("#menu_and_logo").height();
                 height_fb_and_search=$("#fb_and_search").height();
                 height_footer = $("#footer").height();

                 height_ads = height_container - height_menu_and_logo;
                 footer_top =height_container-height_footer;
                 height_main = height_container - (height_menu_and_logo+height_fb_and_search+height_footer) ;

                  //alert ( height_main +"=" +  height_container + "-(" + height_menu_and_logo + "+" +height_fb_and_search+ "+" +height_footer +")");


                  $("#main").css({height:height_main});
                 $("#main").css({overflowY:"auto"});

                 /*

                 $("#footer").css({position:"absolute"});
                 $("#footer").css({top:footer_top});

                 */


                 $("#ads").css({height:height_ads});
                 $("#ads").css({overflow:"hidden"});

            }
            
             $(window).resize(
                    function () {calculate_divs();});

            $(window).bind("load", function (){
                     calculate_divs ();
                 });
                     

            
      </script>
        
        
        
        
    </head>
    <body>
        
        
        
        <div  class="container" style="height: 100%" id="container">

             <div  id="menu_and_logo">   <!--A menü , logo, módosítási adatok sora   -->
        
                 Menu and logo div.
             </div>
            
            
            <div>
            
            <div  class="main" id="main" >
                
                
                <div >
                    <p>
                     <?php print "Árucikk neve"?>
                    <input id="input_article_name">
                    </p>
                    <p>
                        <button type="button"  onclick="add_new_input_field()"> Új tulajdonság hozzáadása </button>
                    </p>
                    
                    <div id="div_article_properties">
                        
                        
                        
                    </div>
                    
                    
                    
                </div>
                
                
                
                
                <div id="search_results">
            This is the main container.
            

            
            
            
            
            
            
            
            
            
            
            
            </div>
            
            
            
            </div>
            </div>


            
            
        
        
        <div  id="footer">
            This is the footer row.
            
        </div>
        </div>

            
        
    </body>
</html>


