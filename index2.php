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
        
        <link href="css/jquery-ui.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui.structure.min.css" rel="stylesheet" type="text/css"/>
        <link href="css/jquery-ui.theme.min.css" rel="stylesheet" type="text/css"/>
        
        
        <script src="js/jquery-3.0.0.min.js"></script>
        <script src="js/jquery-ui.min.js"></script>
        <script src="js/messagebox.js"></script>
        <script type="text/javascript">
            
            
            
            function change_property_datatype (datatype,divid)
            {
                
                
                //$('#div_article_properties  div.datatype_property:last').remove();
                
                //alert (datatype.trim()+","+divid);
                //$('#'+divid+' div.datatype_property:last').remove();
                $('#'+divid+' div.datatype_property').remove();
                
                
                
            switch (datatype.trim())
                
                {
                    case "Text":
                        
                        $('<div class="datatype_property"><p>Property charater number: <input id="property_text_charcount"></p></div>').appendTo("#"+divid);
                        break;
                    case "Numeric":
                        $('<div class="datatype_property"><p>Integer amount: <input id="property_numeric_integer"> Decimal amount: <input id="property_numeric_decimal"> </p></div>').appendTo("#"+divid);
                        break;
                    case "Picture":
                        break;
                      
                }
             
                
            }
            
            function call_change_property_datatype (id)
             {
                
                
                
                
                 //change_property_datatype ($('#property_datatype').val($(this).find(":selected")).toString());
                 
                 change_property_datatype ($("#property_datatype option:selected").text(),id);
                 
             }
            
            
            function remove_datatype (divid)
            {
                //alert (divid);
                $("#"+divid).remove();
                
                
            }
                
            
            
            
            function add_new_input_field ()
            {
                
                
                 count_dt_prop = $('div.datatype_and_property').length;
                
                
                
                $('<div id ="dt_prop_'+(count_dt_prop+1).toString()+'" class="datatype_and_property">' +
                    '<div class="remove_div" >'+' \n\
                    <input type="button"  onclick=" remove_datatype ($(this).parent().parent().attr(\'id\'));" />  </div>'+
                    '<div class = "datatype"> '+
                    '<div>  Property name :'+
                    '<input  id="property_name" pattern = "^[a-zA-Z][a-zA-Z0-9]*">'+
                        '<label> Property datatype</label>'+  
                        '<select class="select_target" id="property_datatype_'+(count_dt_prop+1).toString()+'" onchange="change_property_datatype($(this).find(\'option:selected\').text(),$(this).parent().parent().parent().attr(\'id\'));">'+
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
                 



          function regexp_test (regexp,text)
          {
              re = new RegExp (regexp,"g");
              
              
              
              //alert (regexp);
              
              if (re.test(text))
               return  true;
               else 
               return false;
          }



          function collect_and_send ()
          {
              
              
              
              //alert ("Dinamically create class");
              
        
              var errors = new Array ();
              
              
          
             property_count = $("[id*='dt_prop_']").length;
             //alert (property_count);
            json = '{"article":';
            //var properties_array  =[];
            
            var article = {
                  article_name :  $("#input_article_name").val() ,
                  properties  :  []
              };
          
          
              for (i=1;i<=property_count;i++)
              {
                  //property name
                  //property_name = $("#dt_prop_"+i+" #property_name").val();
                  property_name = $("#dt_prop_"+i+" input#property_name").val();
                  
                  
                  if (!regexp_test ("^[a-z|A-Z][A-Za-z0-9_]*",property_name))
                  {
                     // alert ("Nem megfelelő tulajdonságnév.Betűvel kell kezdődnie, betűt, számot és _ jelet tartalmazhat! " +property_name);
                      errors.push("Nem megfelelő tulajdonságnév.Betűvel kell kezdődnie, betűt, számot és _ jelet tartalmazhat! "+property_name);
                      
                      
                      
                      
                      //messagebox ("Nem megfelelő tulajdonságnév.Betűvel kell kezdődnie, betűt, számot és _ jelet tartalmazhat!");
                      //return ;
                      
                  }
          
          
                  //alert (property_name);
                  property_datatype =  $("#dt_prop_"+i+ " select#property_datatype_"+i+" option:selected").text();
                  

                 if (!regexp_test ("^[Text|Numeric|Picture]",property_datatype.trim()))
                  {
                      //alert ("Nem megfelelő tulajdonság adattípus. Text|Numeric|Picture!  Kis huncut.");
                      errors.push ("Nem megfelelő tulajdonság adattípus. Text|Numeric|Picture!  Kis huncut. ")+property_name;
                      //messagebox ("Nem megfelelő tulajdonság adattípus. Text|Numeric|Picture!  Kis huncut. "+property_name);
                      
                      
                      //return ;
                      
                  }

                  //if (!(/^[Text|Numeric|Picture]/.test(property_datatype.trim())))
                  //{
                   //   alert ("Nem megfelelő tulajdonság adattípus. Text|Numeric|Picture!  Kis huncut.");
                    //  return ;
                      
                  //}
                  
                  
                  
                  
                  // {"property_name":"property_name_value","property_dataype":"Numeric","integer":"3","decimal":"1"}
                  json = json+'{"property_name":'+'"'+ property_name + '"' +',' +  '"property_datatype"' + ':' + '"' + property_datatype +'"' ;
                  var text_lenght=0;
                  var integer_length=0;
                  var decimal_length=0;
                  
                  switch (property_datatype.trim())
                         {
                             case "Text":
                                        //alert ("Text");
                                         text_lenght  = $("#dt_prop_"+i+" input#property_text_charcount").val();
                                         
                                         
                                          if (!regexp_test("^[1-9][0-9]*$",text_lenght.trim()))
                                            {
                                             //alert ("A szöveg hosszának nagyobbnak kell lenni mint 0! ");
                                            errors.push ("A szöveg hosszának nagyobbnak kell lenni mint 0, és csak számot tartalmazhat! "+property_name);
                                            //return ;
                                            }
                                         
                                         
                                         
                                         
                                         
                                         json = json + ","+  '"text_length"' + ':' + '"' + text_lenght +'"';
                                  break;
                              case "Numeric":
                                        //alert ("Numeric");
                                          integer_length =   $("#dt_prop_"+i+" input#property_numeric_integer").val();

                                          if (!regexp_test("^[0-9].*",integer_length.trim()))
                                            {
                                            //alert ("Az egészek hossza nem lehet 0! ");
                                            errors.push ("Nem megfelelő érték az egészjegyek hosszában! "+property_name);
                                            //return ;
                                            }
                                          json = json + ","+ '"integer_length"' + ':' + '"' + integer_length +'"' ;
                                          decimal_length =    $("#dt_prop_"+i+" input#property_numeric_decimal").val();
                                          if (!regexp_test("^[0-9].*",decimal_length.trim()))
                                            {
                                            //alert ("Nem megfelelő érték a tizedesjegyek hosszában! ");
                                            errors.push ("Nem megfelelő érték a tizedesjegyek hosszában! "+property_name);
                                            //return ;
                                            }
                                          if (regexp_test("^[0].*",decimal_length.trim()) &&  regexp_test("^[0].*",integer_length.trim())  )
                                            {
                                            //alert ("Nem megfelelő érték a tizedesjegyek hosszában! ");
                                            errors.push ("Nem lehet 0 az egész és a tizedesjegyek száma is! "+property_name);
                                            //return ;
                                            }


                    
                    
                    
                                            json = json + ","+ '"decimal_length"' + ':' + decimal_length;
                                    break;
                         }
                          var property =
                                  {name : property_name,
                                   datatype : property_datatype,
                                   text_lenght: text_lenght ,
                                   integer_lenght: integer_length,
                                   decimal_lenght: decimal_length
                                    };
                        
                        /*
                        if (typeof text_lenght!== 'undefined') {property.text_lenght =  text_lenght;} else {property.text_lenght=0;}
                        if (typeof integer_length!=='undefined') {property.integer_lenght= integer_length;} else {property.integer_lenght=0;}
                        if (typeof decimal_length!=='undefined') {property.decimal_lenght= decimal_length;} else {property.decimal_lenght=0;}
                        */
                        
                //properties_array.push [property];
                          
                          
               article.properties.push(property);
                   json = json + "}";

                   //alert (json);

              }
              
              
              
              
              
              
                json_from_struct = JSON.stringify(article);
              
              
               json = json + "}";  // article closing 
              
              
              //alert (errors.length);
              if (errors.length!==0) 
              { 
                  
                  var errortext ='';
                  
                  for (j=0 ; j<errors.length; j++)
                  {
                      errortext = errortext + errors[j] +"<br><br>";
                  }
                  
                
                alert_x (errortext,"Hiba!");
                //messagebox (errortext);
              }
              
              else 
              {
                  //alert (json);
                  alert (json_from_struct);
              }
              
              
              
              
          }

            
      </script>
        
        
        
        
    </head>
    <body>
        
        
        
        <div  class="container" style="height: 100%" id="container">

             <div  id="menu_and_logo">   <!--A menü , logo, módosítási adatok sora   -->
        
                 Menu and logo div.
             </div>
            
            
            <div>
            
            <div  class="main" id="main" >
                
                

                <div>
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
            <button type="button"  onclick="collect_and_send();"> Rögzítés </button>
            
        </div>
        </div>

            
        
    </body>
</html>


