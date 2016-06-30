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
            
            function change_property_datatype (datatype,divid)
            {
                
                
                //$('#div_article_properties  div.datatype_property:last').remove();
                $('#divid  div.datatype_property:last').remove();
                
                alert (datatype.trim());
                //switch  ($('#property_datatype').val() )
                
            switch (datatype.trim())
                
                {
                    case "Text":
                        
                        $('<div class="datatype_property"><p>Property charater number: <input id="property_text_charcount"></p></div>').appendTo(div_article_properties);
                        break;
                    case "Numeric":
                        $('<div class="datatype_property"><p>Integer amount: <input id="property_numeric_integer"> Decimal amount: <input id="property_numeric_decimal"> </p></div>').appendTo(div_article_properties);
                        
                        break;
                    case "Picture":
                        break;
                      
                }
                
                
            }
            
            function call_change_property_datatype ()
             {
                
                
                 //change_property_datatype ($('#property_datatype').val($(this).find(":selected")).toString());
                 
                 change_property_datatype ($("#property_datatype option:selected").text());
                 
             }
            
            
            function add_new_input_field ()
            {
                
                 count_dt_prop = $('div.datatype_and_property').length;
                 
                
                $('<div id ="dt_prop_'+(count_dt_prop+1).toString()+'" class="datatype_and_property">' +
                    '<div class="remove_div" > x </div>'+
                    '<div class = "datatype"> '+
                    '<div>  Property name :'+
                    '<input  id="property_name">'+
                        '<label> Property datatype</label>'+  
                        '<select id="property_datatype" onchange = \'call_change_property_datatype();\'> '+
                        '<option value="Text"> Text  </option>' +
                        '<option value = "Numeric"> Numeric </option>'+
                        '<option value = "Picture"> Picture </option>'+
                        '</select> '+ 
                        '</div>'+
                        '</div> ' +
                        '<div class="datatype_property"><p>Property charater number: <input id="property_text_charcount"></p></div>'+
                   
                        '</div>'
                    ).appendTo(div_article_properties);
                
                
                //default Text
                 //$('<div class="datatype_property"><p>Property charater number: <input id="property_text_charcount"></p></div>').appendTo(div_article_properties);
                
                
                //change_property_datatype ('Text');
                
             
             
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
                    
                    
                    
                    
                </div>
                
                
                
                
                <div id="search_results">
            This is the main container.
            
                    <div id="div_article_properties">
                        
                        
                        
                    </div>

            
            
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
            </p>
            <p>
                Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Curabitur non elit ut libero tristique sodales. Mauris a lacus. Donec mattis semper leo. In hac habitasse platea dictumst. Vivamus facilisis diam at odio. Mauris dictum, nisi eget consequat elementum, lacus ligula molestie metus, non feugiat orci magna ac sem. Donec turpis. Donec vitae metus. Morbi tristique neque eu mauris. Quisque gravida ipsum non sapien. Proin turpis lacus, scelerisque vitae, elementum at, lobortis ac, quam. Aliquam dictum eleifend risus. In hac habitasse platea dictumst. Etiam sit amet diam. Suspendisse odio. Suspendisse nunc. In semper bibendum libero.
            </p>
            <p>
                Proin nonummy, lacus eget pulvinar lacinia, pede felis dignissim leo, vitae tristique magna lacus sit amet eros. Nullam ornare. Praesent odio ligula, dapibus sed, tincidunt eget, dictum ac, nibh. Nam quis lacus. Nunc eleifend molestie velit. Morbi lobortis quam eu velit. Donec euismod vestibulum massa. Donec non lectus. Aliquam commodo lacus sit amet nulla. Cras dignissim elit et augue. Nullam non diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Aenean vestibulum. Sed lobortis elit quis lectus. Nunc sed lacus at augue bibendum dapibus.
            </p>
            <p>
                Aliquam vehicula sem ut pede. Cras purus lectus, egestas eu, vehicula at, imperdiet sed, nibh. Morbi consectetuer luctus felis. Donec vitae nisi. Aliquam tincidunt feugiat elit. Duis sed elit ut turpis ullamcorper feugiat. Praesent pretium, mauris sed fermentum hendrerit, nulla lorem iaculis magna, pulvinar scelerisque urna tellus a justo. Suspendisse pulvinar massa in metus. Duis quis quam. Proin justo. Curabitur ac sapien. Nam erat. Praesent ut quam.
            </p>
            <p>
                Vivamus commodo, augue et laoreet euismod, sem sapien tempor dolor, ac egestas sem ligula quis lacus. Donec vestibulum tortor ac lacus. Sed posuere vestibulum nisl. Curabitur eleifend fermentum justo. Nullam imperdiet. Integer sit amet mauris imperdiet risus sollicitudin rutrum. Ut vitae turpis. Nulla facilisi. Quisque tortor velit, scelerisque et, facilisis vel, tempor sed, urna. Vivamus nulla elit, vestibulum eget, semper et, scelerisque eget, lacus. Pellentesque viverra purus. Quisque elit. Donec ut dolor.
            </p>
            <p>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p>
                Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris. Integer in mauris eu nibh euismod gravida. Duis ac tellus et risus vulputate vehicula. Donec lobortis risus a elit. Etiam tempor. Ut ullamcorper, ligula eu tempor congue, eros est euismod turpis, id tincidunt sapien risus a quam. Maecenas fermentum consequat mi. Donec fermentum. Pellentesque malesuada nulla a mi. Duis sapien sem, aliquet nec, commodo eget, consequat quis, neque. Aliquam faucibus, elit ut dictum aliquet, felis nisl adipiscing sapien, sed malesuada diam lacus eget erat. Cras mollis scelerisque nunc. Nullam arcu. Aliquam consequat. Curabitur augue lorem, dapibus quis, laoreet et, pretium ac, nisi. Aenean magna nisl, mollis quis, molestie eu, feugiat in, orci. In hac habitasse platea dictumst.
            </p>
            <p>
                Fusce convallis, mauris imperdiet gravida bibendum, nisl turpis suscipit mauris, sed placerat ipsum urna sed risus. In convallis tellus a mauris. Curabitur non elit ut libero tristique sodales. Mauris a lacus. Donec mattis semper leo. In hac habitasse platea dictumst. Vivamus facilisis diam at odio. Mauris dictum, nisi eget consequat elementum, lacus ligula molestie metus, non feugiat orci magna ac sem. Donec turpis. Donec vitae metus. Morbi tristique neque eu mauris. Quisque gravida ipsum non sapien. Proin turpis lacus, scelerisque vitae, elementum at, lobortis ac, quam. Aliquam dictum eleifend risus. In hac habitasse platea dictumst. Etiam sit amet diam. Suspendisse odio. Suspendisse nunc. In semper bibendum libero.
            </p>
            <p>
                Proin nonummy, lacus eget pulvinar lacinia, pede felis dignissim leo, vitae tristique magna lacus sit amet eros. Nullam ornare. Praesent odio ligula, dapibus sed, tincidunt eget, dictum ac, nibh. Nam quis lacus. Nunc eleifend molestie velit. Morbi lobortis quam eu velit. Donec euismod vestibulum massa. Donec non lectus. Aliquam commodo lacus sit amet nulla. Cras dignissim elit et augue. Nullam non diam. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. In hac habitasse platea dictumst. Aenean vestibulum. Sed lobortis elit quis lectus. Nunc sed lacus at augue bibendum dapibus.
            </p>


            
            
            
            
            
            
            
            
            
            
            
            </div>
            
            
            
            </div>
            </div>


            
            
        
        
        <div  id="footer">
            This is the footer row.
            
        </div>
        </div>

            
        
    </body>
</html>


