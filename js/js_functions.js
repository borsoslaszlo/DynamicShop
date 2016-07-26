

var there_was_changes=false;


function checkdate(input,must_alert)
{

var validformat=/^\d{4}\-\d{2}\-\d{2}$/ //Basic check for format validity
var returnval=false
var falsearray = new Array (false,"");
//alert (input);

if (!validformat.test(input)|| input=="")
     {if (must_alert) {alert("Invalid Date Format or empty date. Please correct to YYYY-MM-DD.");
                             }
                             return falsearray;
                    }
                    
else{ //Detailed check for valid date ranges
    

var yearfield=input.split("-")[0]
var monthfield=input.split("-")[1]
var dayfield=input.split("-")[2]




var dayobj = new Date(yearfield, monthfield-1, dayfield)
if ((dayobj.getMonth()+1!=monthfield)||(dayobj.getDate()!=dayfield)||(dayobj.getFullYear()!=yearfield))
  {if (must_alert) {alert("Invalid Day, Month, or Year range detected. Please correct and submit again.")
                          
                    }
                    return falsearray;
                }
else
returnval=true

var month_array = new Array ("January","February","March","April","May","June","July","August","September","October","November","December");
var month = month_array [dayobj.getMonth()];
returnval_array = new Array (returnval,month);
return returnval_array;
}

}


function date_calculate (dateinput,what,howmany)
{  //dateinput : date in format YYYY-MM_DD
    // what: which part must be calculated 
                // "Y":Year
                // "M":Month
                // "D":Day
    //howmany :  increment or decrement the value and how many values 


//alert (dateinput.value);

var yearfield=parseInt (dateinput.split("-")[0]);
var monthfield=parseInt (dateinput.split("-")[1]);
var dayfield=parseInt (dateinput.split("-")[2]);

//alert (yearfield);
//alert (monthfield);
//alert (dayfield);
//alert (howmany);
//alert (what);

monthfield=monthfield-1; 

//var dayobj = new Date(yearfield, monthfield-1, dayfield);

var dayobj = new Date(yearfield, monthfield, dayfield);

//alert (dayobj.getMonth());
//alert ("dayobj elején"+dayobj);

switch (what)
    {
        case "Y":
            dayobj.setUTCFullYear (dayobj.getUTCFullYear()+howmany);
            break;
         case "M" :
             dayobj.setMonth (dayobj.getMonth()+howmany);
             break;
         case "D" :
             dayobj.setUTCDate (dayobj.getUTCDate()+howmany);
             
             break;
             
            
    }

//alert ("dayobj utána"+dayobj);

year_string=dayobj.getFullYear().toString();
//month_int=dayobj.getMonth()+1;

//month_int=dayobj.getMonth()+1;

//month_string=month_int.toString();
//day_string =dayobj.getUTCDate().toString();




if (dayobj.getMonth().toString().length==1)
    {
	month_string = "0"+(dayobj.getMonth()+1).toString();
    }  else  
    {month_string = (dayobj.getMonth()+1).toString() ;}

	if (dayobj.getDate().toString ().length==1)
	{    
	day_string = "0"+dayobj.getDate().toString ();
	} else {day_string = dayobj.getDate().toString();}
//alert (year_string+"-"+month_string+"-"+day_string);

return year_string+"-"+month_string+"-"+day_string;

    
}


function update_valid_datetime (inputdate)
{
    
    //alert (inputdate);
    
    var datearray=checkdate (inputdate,true);
    
    
    if (datearray[0])
    {
    var updated_datetime = date_calculate (inputdate,'Y',1);
    
    //alert (updated_datetime);
    
       document.forms['editform'].valid_datetime.value = updated_datetime;
    }
}




function checkvalue (table, field, value , return_field_name)
{
//alert (table+field+value+expectedvalue);


var url ="check_values.php?tablename="+table+"&fieldname="+field+"&value="+value+"&return_field_name="+return_field_name;
$.get (url,{},verifydb);
}


function SelectTag_builder (SelectTag_id,TableName, Fieldname,Keyfields,FilterFieldName,FilterFieldValue) 
{
    // Fieldname mezőhöz tartozó értékek kerülne az option-ba
    // a keyfields értékei pedig az option value-be | jellen konkatenálva
    keyfieldsjson = JSON.stringify(Keyfields);
    filterfieldnamejson = JSON.stringify(FilterFieldName);
    filterfieldvaluejson = JSON.stringify(FilterFieldValue);

    //document.getElementById(SelectTag_id).value = 'aa';    // az select tag id -je
    //var url ="SelectTag_creator.php?TableName="+TableName+"&Fieldname="+Fieldname+"&Keyfields="+keyfieldsjson+"&FilterFieldName="+filterfieldnamejson+"&FilterFieldValue="+filterfieldvaluejson ;

    var url ="common_php_functions.php";
    
    //alert (url);
    
    $.getJSON(url,{
        function : "printSelectTag",
        TableName: TableName ,
        Fieldname : Fieldname,
        Keyfields : keyfieldsjson ,
        FilterFieldName: filterfieldnamejson,
        FilterFieldValue : filterfieldvaluejson
        
    },
    function (adat)
    {
        var select_dom = document.getElementById(SelectTag_id);
        select_dom.options.length = 0;
        //var option = document.createElement("option");
        //alert (adat);
        //var a = adat [0];
        //alert (a.postal_id);
        if (adat=='') {alert ('Nincs ilyen irányítószám!');}
        else
        {
        for (var elem in adat)
         {
           var option = document.createElement("option");
           //alert (adat[elem].postal_id);  
           option.value = adat[elem].postal_id+"-"+adat[elem].postal_id_key_tag;
           option.text = adat[elem].postal_locality_name;
           select_dom.add(option);
         }
         }
        //option.text = "Kiwi";
        //option.value ="kk";
        //x.add(option);
        //alert (adat);
        //document.getElementById(form_locality) = 'aa';
    },"json");
}


function verifydb(response)
{
//alert (response);
    if (response!="")
    {
       //The value exists, do what you want to do here
       //alert (response);
       document.forms['editform'].form_locality.value = response;
    }

    else
    {
     alert ("Nincs ilyen irányítószám az adatbázisban. ");
     document.forms['editform'].form_locality.value = "----Error----";
     
      //The value doesnt exist
    }
}

function checkvalue_global (table, field, value , return_field_name)
{
//alert (table+field+value);


var url ="check_values.php?tablename="+table+"&fieldname="+field+"&value="+value+"&return_field_name="+return_field_name;
$.get (url,{},verifydb_contact_id);

}

function verifydb_contact_id(response)
{
//alert (response);
    if (response!="")
    {
       //The value exists, do what you want to do here
       alert ("Ez az azonosító már létezik !  Ha rögzíti akkor az ehhez az azonosítóhoz tartozó értékek felülíródnak!!!");
       
    }

    
}







//order_jspar="";


function clear_logo (firm_id)
{

//alert ("clear_logo");
var url ='clear_logo.php?firm_id='+firm_id;
$.get (url,{},check_clear_result);
}

function check_clear_result (response)
{
//alert (response);
    if (response!='0')
    {
       //The value exists, do what you want to do here
       //alert (response);
       //document.forms[\'editform\'].form_locality.value = response;
       alert ('A törlés nem sikerült.');
       
    }

    else
    {
     adatlapedit (firm_id);
     
     
    }
}



function clear_logo2 (firm_id)
{
   // alert (firm_id);
    
  if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
    
    
    
   xmlhttp.open('GET', 'clear_logo.php?firm_id='+firm_id);
  xmlhttp.send();   

adatlapedit (firm_id);
   
   
   
    
    
}






function menuvalasz(selected_menu)



{
    var confirmation=true;
if (there_was_changes)  {confirmation = confirm ('Változások voltak az űrlapon amelyek nem voltak mentve. Folytatja? '); there_was_changes=false;}

if (confirmation)
{


//alert (selected_menu);
//document.write (selected_menu);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }



if (selected_menu=='adatlap')
{

xmlhttp.open ('GET','adatlap_lista.php?page=1&order=firm_id',true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();





}

if (selected_menu=='profiles')
{

xmlhttp.open ('GET','profile_lista.php?page=1&order=contact_id',true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}
 
if (selected_menu=='services')
{

xmlhttp.open ('GET','service_lista.php?page=1&order=service_name',true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}


if (selected_menu=='pictures')
    {
        
    
    
     var fd = new FormData(); 
  //fd.append ("form_firm_id",document.getelementbyid ("form_firm_id"));
 
    var firm_id_element = document.getElementById('firm_id');
      if (firm_id_element!=null ) {
          //alert (firm_id_element.value);
          fd.append ('firm_id',firm_id_element.value);}

    
    
    
    
    xmlhttp.open ('POST','pictures.php',true);
        //xmlhttp.open("GET","testlista.txt",true);
        xmlhttp.send(fd);
    }


if (selected_menu=='ads')
    {
        
    
    
  //   var fd = new FormData(); 
  //fd.append ("form_firm_id",document.getelementbyid ("form_firm_id"));
 
  //  var firm_id_element = document.getElementById('firm_id');
  //    if (firm_id_element!=null ) {
  //        //alert (firm_id_element.value);
   //       fd.append ('firm_id',firm_id_element.value);}

    
    
    
    
    xmlhttp.open ('POST','ads.php',true);
        //xmlhttp.open("GET","testlista.txt",true);
        xmlhttp.send(fd);
    }

if (selected_menu=='synonyms')

    {
        xmlhttp.open ('POST','synonyms.php?page=1&order=synonyms_word',true);
        xmlhttp.send(fd);
    }


if (selected_menu=='statistics')

    {
        xmlhttp.open ('POST','statistics.php',true);
        xmlhttp.send(fd);
    }

if (selected_menu=='menus')

    {
        xmlhttp.open ('POST','menus.php?page=1&order=menupoint',true);
        xmlhttp.send(fd);
    }




if (selected_menu=='logout')
    {
        
    //alert ("logout");
    url ="logout.php";
    window.open(url,"_self");
    
    
    }
    
    
    
 if (selected_menu=='postalcodes')
     {
     xmlhttp.open ('GET','postalcode_lista.php?page=1&order=postal_id',true);
     xmlhttp.send();
     }



}
}

function adatlapedit (adatlap_id)
{
   // alert (adatlap_id);
if (adatlap_id == 0) {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;


        var element = document.getElementById ("editform").elements;
        
        for (var i=0 ; i< element.length; i++)
            {
        //document.getElementById(element[i].id).onchange = function ()
        element[i].onchange = function ()
                                    
        {
                    there_was_changes=true;
                    //alert (this.id);
                    if (this.id=='record_datetime') {update_valid_datetime ( this.value );}
                    
                    //if (this.id=='form_firm_postal_code') {checkvalue ('postal_codes', 'postal_id', this.value ,'postal_locality_name');}
                    if (this.id =='form_firm_postal_code')  {
                        var postal_code_array = new Array ();
                        postal_code_array.push(this.value);
                        
                        SelectTag_builder ('form_locality', 'postal_codes', 'postal_locality_name' ,['postal_id','postal_id_key_tag'],  ['postal_id'],postal_code_array);
                        
                        
                    };
                    
                    
                    
                    
                    if (this.id=='valid_datetime') {checkdate ( this.value,true );}

            }
            }


    }
  }
  
  
  
xmlhttp.open ('GET','edit_adatlap.php?firm_id='+adatlap_id+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();





}


function contact_adatlapedit (contact_id)
{
    
 //alert (contact_id);
   
if (contact_id == 0) {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    var element = document.getElementById ("editform").elements;
    
    
    for (var i=0 ; i< element.length; i++)
            {
        //document.getElementById(element[i].id).onchange = function ()
        element[i].onchange = function ()
                                    
        {
        if (this.id =='form_contact_postal_code')
                    {
                        
                        var postal_code_array = new Array ();
                        postal_code_array.push(this.value);
                        SelectTag_builder ('form_locality', 'postal_codes', 'postal_locality_name' ,['postal_id','postal_id_key_tag'],  ['postal_id'],postal_code_array);
                        
                    }    
        
            
        }
    
    
    
    
    }
  }}
  
  
  
xmlhttp.open ('GET','edit_profil_adatlap.php?contact_id='+contact_id+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
    
}


function edit_telepules_adatlap (postal_code,postal_id_key_tag)
{
    
 //alert (contact_id);
   
if (postal_code == 0) {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }
  
  
  
xmlhttp.open ('GET','edit_telepules_adatlap.php?postal_code='+postal_code+'&postal_id_key_tag='+postal_id_key_tag+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
    
}























function service_adatlapedit (service_id)
{
    
 //alert (contact_id);
   
if (service_id == 0) {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }
  
  
  
xmlhttp.open ('GET','edit_service_adatlap.php?service_id='+service_id+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
    
}


function synonym_adatlapedit (synonym_word)
{
    
 //alert (contact_id);
   
if (synonym_word == 0) {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }
  
  
  
xmlhttp.open ('GET','edit_synonym_adatlap.php?synonym_word='+synonym_word+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
    
}



function menu_adatlapedit (menupoint)
{
    
// alert (menupoint);
   
if (menupoint == "") {method = "I"} else {method = "M"} 

var randomnumber=Math.floor(Math.random()*1001);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }
  
  
  
xmlhttp.open ('GET','edit_menu_adatlap.php?menupoint='+menupoint+'&rnd_number='+randomnumber+'&mod_in=' +method,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
    
}









function upload_picture () 
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
    
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    response=xmlhttp.responseText;
    if ( response != "OK" )   // ha a visszejövé érték egy szám akkor rendben van  , ha nem akkor hiba
    {   
        menuvalasz ("pictures");
    }
else 
{
  alert ("Rögzítés nem sikerült. Hiba:" +response);
}    

    }
  }

var fd = new FormData(); 

var firm_id_element = document.getElementById('firm_id');
fd.append ('firm_id',firm_id_element.value);
//alert (firm_id_element.value);

var picture_element = document.getElementById('picture').files[0];
if (picture_element != null )
{

fd.append  ('picture',picture_element);
//alert (picture_element);


xmlhttp.open("POST", "record_picture.php");
xmlhttp.send (fd);

} else {alert ("Nincs kép kiválasztva!");}




}


function upload_adv () 
{
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
    
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    response=xmlhttp.responseText;
    if ( response != "OK" )   // ha a visszejövé érték egy szám akkor rendben van  , ha nem akkor hiba
    {   
        //alert ("OK");
        menuvalasz ("ads");
    }
else 
{
  alert ("Rögzítés nem sikerült. Hiba:" +response);
}    

    }
  }

var fd = new FormData(); 

var url = document.getElementById('url');
fd.append ('url',url.value);
//alert (url.value);

var show_order =document.getElementById('order');
fd.append ('wished_order_number',show_order.value);

//alert (show_order.value);



var picture_element = document.getElementById('picture').files[0];

var errormess="";
iserror=false;

if (isNaN(show_order.value) ) { iserror=true ; errormess=errormess+" Nem megfelelő adat a sorszámnál! \n";}
if (picture_element == null )  { iserror =true; errormess=errormess+" Nincs kép kiválasztva! \n";}


if (iserror==false)

//if (picture_element != null )
{
//alert ("bejön");
fd.append  ('picture',picture_element);
//alert (picture_element);


xmlhttp.open("POST", "record_adv.php");
xmlhttp.send (fd);

} else {alert (errormess);}





}







































function clear_picture (auto_increment_id)

{
    if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
    
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    response=xmlhttp.responseText;
    //alert (response);
    
    if (  response == "OK" )   
    {   
        menuvalasz ("pictures");
    }
else 
{
  alert ("Törlés nem sikerült. Hiba:" +response);
  menuvalasz ("pictures");
}    

    }
  }
    

var fd = new FormData(); 



//alert (auto_increment_id);


fd.append  ('picture_to_delete',auto_increment_id);
//alert (picture_element);


xmlhttp.open("POST", "delete_picture.php");
xmlhttp.send (fd);

}









function form_record ()
{

//document.getElementById('myDiv').innerHTML='Upload started!';

var errormess='';
var iserror=false;



if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  
  
  
  
var firm_id='';  
  
  // visszajön a firm_id 
  
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    firm_id=xmlhttp.responseText;
   // alert (firm_id);
    if (! isNaN(firm_id) )   // ha a visszejövé érték egy szám akkor rendben van  , ha nem akkor hiba
    {   alert ('Adatlap sikeresen rögzült!');
        
        adatlapedit (firm_id);}
else 
{
  alert ("Rögzítés nem sikerült. Hiba:" +firm_id);
}    

    }
  }
  



 var fd = new FormData(); 
 //fd.append ("form_firm_id",document.getelementbyid ("form_firm_id"));
 
var form_firm_id_element = document.getElementById('form_firm_id');
fd.append ('form_firm_id',form_firm_id_element.value);

//alert (form_firm_id_element.value)

var form_firm_name_element = document.getElementById('form_firm_name');
fd.append  ('form_firm_name',form_firm_name_element.value);


var form_firm_type_element = document.getElementById('form_firm_type');
fd.append  ('form_firm_type',form_firm_type_element.value);

var form_firm_postal_code_element = document.getElementById('form_firm_postal_code');
fd.append  ('form_firm_postal_code',form_firm_postal_code_element.value);

var form_firm_postal_code_id_key_tag_element  = document.getElementById('form_locality');
var post_id_and_key_tag = ('postal_id_and_key_tag',form_firm_postal_code_id_key_tag_element.options[form_firm_postal_code_id_key_tag_element.selectedIndex].value);
post_id = post_id_and_key_tag.split("-")[0];    //ennek egyenlőnek kell lennie a "form_firm_postal_code_element.value"-vel
post_id_key_tag = post_id_and_key_tag.split("-")[1];
fd.append('form_firm_postal_code_key_tag',post_id_key_tag);
//alert (post_id_key_tag);





var form_locality_element = document.getElementById('form_locality');
fd.append  ('form_locality',form_locality_element.value);

var form_firm_address_street_element = document.getElementById('form_firm_address_street');
fd.append  ('form_firm_address_street',form_firm_address_street_element.value);

var form_firm_address_number_element = document.getElementById('form_firm_address_number');
fd.append  ('form_firm_address_number',form_firm_address_number_element.value);

var form_firm_address_floor_element = document.getElementById('form_firm_address_floor');
fd.append  ('form_firm_address_floor',form_firm_address_floor_element.value);

var form_firm_address_door_element = document.getElementById('form_firm_address_door');
fd.append  ('form_firm_address_door',form_firm_address_door_element.value);

var form_firm_webaddress_element = document.getElementById('form_firm_webaddress');
fd.append  ('form_firm_webaddress',form_firm_webaddress_element.value);

var form_firm_email_element = document.getElementById('form_firm_email');
fd.append  ('form_firm_email',form_firm_email_element.value);

var form_firm_open_element = document.getElementById('form_firm_open');
fd.append  ('form_firm_open',form_firm_open_element.value);

var form_firm_notes_element = document.getElementById('form_firm_notes');
fd.append  ('form_firm_notes',form_firm_notes_element.value);





var form_firm_logo_element = document.getElementById('form_firm_logo').files[0];
fd.append  ('form_firm_logo',form_firm_logo_element);


var form_firm_phonen1_cc_element = document.getElementById ('form_firm_phonen1_cc');
fd.append ('form_firm_phonen1_cc',form_firm_phonen1_cc_element.value);


var form_firm_phonen1_areac_element = document.getElementById ('form_firm_phonen1_areac');
fd.append ('form_firm_phonen1_areac',form_firm_phonen1_areac_element.value);

var form_firm_phonen1_conc_element = document.getElementById ('form_firm_phonen1_conc');
fd.append ('form_firm_phonen1_conc',form_firm_phonen1_conc_element.value);

var form_firm_phonen1_extn_element = document.getElementById ('form_firm_phonen1_extn');
fd.append ('form_firm_phonen1_extn',form_firm_phonen1_extn_element.value);


//alert (form_firm_phonen1_cc_element.value+","+form_firm_phonen1_areac_element.value+"," +form_firm_phonen1_conc_element.value+","+form_firm_phonen1_extn_element.value);



var form_firm_phonen2_cc_element = document.getElementById ('form_firm_phonen2_cc');
fd.append ('form_firm_phonen2_cc',form_firm_phonen2_cc_element.value);

var form_firm_phonen2_areac_element = document.getElementById ('form_firm_phonen2_areac');
fd.append ('form_firm_phonen2_areac',form_firm_phonen2_areac_element.value);

var form_firm_phonen2_conc_element = document.getElementById ('form_firm_phonen2_conc');
fd.append ('form_firm_phonen2_conc',form_firm_phonen2_conc_element.value);

var form_firm_phonen2_extn_element = document.getElementById ('form_firm_phonen2_extn');
fd.append ('form_firm_phonen2_extn',form_firm_phonen2_extn_element.value);


var form_firm_phonen3_cc_element = document.getElementById ('form_firm_phonen3_cc');
fd.append ('form_firm_phonen3_cc',form_firm_phonen3_cc_element.value);

var form_firm_phonen3_areac_element = document.getElementById ('form_firm_phonen3_areac');
fd.append ('form_firm_phonen3_areac',form_firm_phonen3_areac_element.value);

var form_firm_phonen3_conc_element = document.getElementById ('form_firm_phonen3_conc');
fd.append ('form_firm_phonen3_conc',form_firm_phonen3_conc_element.value);

var form_firm_phonen3_extn_element = document.getElementById ('form_firm_phonen3_extn');
fd.append ('form_firm_phonen3_extn',form_firm_phonen3_extn_element.value);


var form_firm_phonen4_cc_element = document.getElementById ('form_firm_phonen4_cc');
fd.append ('form_firm_phonen4_cc',form_firm_phonen4_cc_element.value);

var form_firm_phonen4_areac_element = document.getElementById ('form_firm_phonen4_areac');
fd.append ('form_firm_phonen4_areac',form_firm_phonen4_areac_element.value);

var form_firm_phonen4_conc_element = document.getElementById ('form_firm_phonen4_conc');
fd.append ('form_firm_phonen4_conc',form_firm_phonen4_conc_element.value);

var form_firm_phonen4_extn_element = document.getElementById ('form_firm_phonen4_extn');
fd.append ('form_firm_phonen4_extn',form_firm_phonen4_extn_element.value);

var form_firm_gps_latitude = document.getElementById ('gps_latitude');
fd.append ('gps_latitude',form_firm_gps_latitude.value);

var form_firm_gps_longitude = document.getElementById ('gps_longitude');
fd.append ('gps_longitude',form_firm_gps_longitude.value);


var carea_value = $("#select_carea").val();
fd.append ('carea',carea_value);

var form_firm_fax_cc = document.getElementById ('firm_fax_cc');
fd.append ('firm_fax_cc',form_firm_fax_cc.value);

var form_firm_fax_areac = document.getElementById ('firm_fax_areac');
fd.append ('firm_fax_areac',form_firm_fax_areac.value);

var form_firm_fax_conc = document.getElementById ('firm_fax_conc');
fd.append ('firm_fax_conc',form_firm_fax_conc.value);

var form_firm_fax_extn = document.getElementById ('firm_fax_extn');
fd.append ('firm_fax_extn',form_firm_fax_extn.value);

var form_firm_more_datas = document.getElementById ('firm_more_datas');
fd.append ('firm_more_datas',form_firm_more_datas.value);

var form_firm_webaddress_element2 = document.getElementById('form_firm_webaddress2');
fd.append  ('form_firm_webaddress2',form_firm_webaddress_element2.value);

var form_firm_email_element2 = document.getElementById('form_firm_email2');
fd.append  ('form_firm_email2',form_firm_email_element2.value);

var form_firm_inactive = document.getElementById('form_firm_inactive').checked;
fd.append  ('form_firm_inactive',form_firm_inactive);

var form_firm_info_id_part1 = document.getElementById('form_firm_info_id_part1');
fd.append  ('form_firm_info_id_part1',form_firm_info_id_part1.value);

var form_firm_info_id_part2 = document.getElementById('form_firm_info_id_part2');
fd.append  ('form_firm_info_id_part2',form_firm_info_id_part2.value);

var form_firm_info_id_part3 = document.getElementById('form_firm_info_id_part3');
fd.append  ('form_firm_info_id_part3',form_firm_info_id_part3.value);


var form_firm_admin_notes = document.getElementById('form_firm_admin_notes');
fd.append  ('form_firm_admin_notes',form_firm_admin_notes.value);

//alert (form_firm_admin_notes.value);



if ( form_firm_info_id_part1.value.toString().length!=4 || form_firm_info_id_part2.value.toString().length!=4 || form_firm_info_id_part3.value.toString().length!=2)
{iserror=true ; errormess=errormess+" Az információs azonosítóban nem megfelelő számú karakter szerepel. (4-4-2) \n";}

if (isNaN(form_firm_info_id_part1.value) || isNaN(form_firm_info_id_part2.value) || isNaN(form_firm_info_id_part3.value) ) 
{iserror=true ; errormess=errormess+" Az információs azonosítóban nem megfelelő karakter szerepel. \n";} 


var form_firm_record_datetime = document.getElementById('record_datetime');
fd.append ('form_firm_record_datetime',form_firm_record_datetime.value);

checkdate_record=checkdate (form_firm_record_datetime.value,false);
if (checkdate_record[0]==false)
  {iserror=true;errormess=errormess+ "A megadott rögzítésdátum formátuma nem megfelelő . YYYY-MM-DD !! \n";}
  

var form_firm_valid_datetime = document.getElementById('valid_datetime');
fd.append ('form_firm_valid_datetime',form_firm_valid_datetime.value);

checkdate_valid=checkdate (form_firm_valid_datetime.value,false);
if (checkdate_valid[0]==false)
  {iserror=true;errormess=errormess+ "A megadott érvényességdátum formátuma nem megfelelő . YYYY-MM-DD !! \n";}




//alert (form_firm_address_street_element.value);
//alert (carea_value);
//alert (form_firm_phonen4_cc_element.value+","+form_firm_phonen4_areac_element.value+"," +form_firm_phonen4_conc_element.value+","+form_firm_phonen4_extn_element.value);

//var all_values = new Array; 
var count_of_elements_service =0;

$("#select_service_firm option").each(function()
 {
    //all_values.push($(this).val());
    count_of_elements_service++;
    fd.append ('select_service_'+count_of_elements_service,$(this).val());
    //alert ($(this).val());
 });


fd.append ('added_services_count',count_of_elements_service);
//alert (all_values);

//alert (form_firm_name_element.value);

//alert (fd);

var count_of_elements_contact =0;
$("#select_contact_firm option").each(function()
{ 
        count_of_elements_contact++;
        fd.append ('select_contact_'+count_of_elements_contact,$(this).val());
        
    
});
fd.append ('added_contacts_count',count_of_elements_contact);



fd.append  ('form_firm_postal_code',form_firm_postal_code_element.value);


if (!iserror) {

xmlhttp.open("POST", "update_insert_firm_form.php");
xmlhttp.send (fd);

there_was_changes=false;
} else {alert (errormess);}
    





//alert (firm_id);
//adatlapedit (form_firm_id_element.value);


//alert (fd['form_firm_id']);

//alert ('dd');

//alert (form_firm_id_element.value);
 


//document.getElementById('myDiv').innerHTML='Upload finished!';

}


function telepules_form_record ()

{
var errormess='';
var iserror=false;

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }


var iranyitoszam='';  

  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    iranyitoszam=xmlhttp.responseText;
    
    if (iranyitoszam.length<=4)
    {   //alert (iranyitoszam);
        alert ('Adatlap sikeresen rögzült!');
        edit_telepules_adatlap (iranyitoszam);
    } else
        {
        alert ('Rögzítési hiba :'+ iranyitoszam);
        }
    }
  }
var fd = new FormData(); 

var form_postalcode_pcode = document.getElementById('form_postalcode_pcode');
fd.append ('form_postalcode_pcode',form_postalcode_pcode.value);

var form_postalcode_locality = document.getElementById('form_postalcode_locality');
fd.append ('form_postalcode_locality',form_postalcode_locality.value);

var form_postalcode_county = document.getElementById('form_county');
fd.append ('form_postalcode_county',form_postalcode_county.value);

var form_postal_id_key_tag = document.getElementById('form_postalcode_id_key_tag');
fd.append ('form_postal_id_key_tag',form_postal_id_key_tag.value);


var regx_chr = /^([0-9]+)$/;

if (form_postalcode_pcode.value.length != 4 || form_postalcode_pcode.value.search(regx_chr)==-1)
  {iserror=true;
   errormess = errormess+" Az irányítószám csak számokat  tartalmazhat és maximum 4 karakter hosszú!";
  }

if (!iserror)
    {
xmlhttp.open("POST", "update_insert_postcode_form.php");
xmlhttp.send (fd);
    }
    else
        {alert (errormess);}






    
    
}


function contact_form_record ()
{

var errormess='';
var iserror=false;


//document.getElementById('myDiv').innerHTML='Upload started!';


//alert (form_contact_id);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  
var contact_id='';  
  
  // visszajön a contact_id 
  
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    contact_id=xmlhttp.responseText;
    
    if (contact_id.length<=10)
    {   
        alert ('Adatlap sikeresen rögzült!');
        contact_adatlapedit (contact_id);
    } else
        {
        alert ('Rögzítési hiba :'+ contact_id)    
        }
    }
  }
  



 var fd = new FormData(); 
 //fd.append ("form_firm_id",document.getelementbyid ("form_firm_id"));
 
var form_contact_id_element = document.getElementById('form_contact_id');
fd.append ('form_contact_id',form_contact_id_element.value);



var form_contact_password_element = document.getElementById('form_contact_password');
fd.append  ('form_contact_password',form_contact_password_element.value);



var form_contact_last_name_element = document.getElementById('form_contact_last_name');
fd.append  ('form_contact_last_name',form_contact_last_name_element.value);



var form_contact_first_name_element = document.getElementById('form_contact_first_name');
fd.append  ('form_contact_first_name',form_contact_first_name_element.value);



var form_contact_email_element = document.getElementById('form_contact_email');
fd.append  ('form_contact_email',form_contact_email_element.value);



var form_contact_postal_code_element = document.getElementById('form_contact_postal_code');
fd.append  ('form_contact_postal_code',form_contact_postal_code_element.value);



var form_contact_postal_code_id_key_tag_element  = document.getElementById('form_locality');
var post_id_and_key_tag = ('postal_id_and_key_tag',form_contact_postal_code_id_key_tag_element.options[form_contact_postal_code_id_key_tag_element.selectedIndex].value);
post_id = post_id_and_key_tag.split("-")[0];    //ennek egyenlőnek kell lennie a "form_firm_postal_code_element.value"-vel
post_id_key_tag = post_id_and_key_tag.split("-")[1];



fd.append('form_contact_postal_code_key_tag',post_id_key_tag);





var form_contact_address_street_element = document.getElementById('form_contact_address_street');
fd.append  ('form_contact_address_street',form_contact_address_street_element.value);



var form_contact_address_number_element = document.getElementById('form_contact_address_number');
fd.append  ('form_contact_address_number',form_contact_address_number_element.value);




var form_contact_address_floor_element = document.getElementById('form_contact_address_floor');
fd.append  ('form_contact_address_floor',form_contact_address_floor_element.value);



var form_contact_address_door_element = document.getElementById('form_contact_address_door');
fd.append  ('form_contact_address_door',form_contact_address_door_element.value);

//alert ("dkajkfhlk");

var form_contact_county_element = document.getElementById('form_contact_county');
fd.append  ('form_contact_county',form_contact_county_element.value);

var form_contact_nationality_element = document.getElementById('form_contact_nationality');
fd.append  ('form_contact_nationality',form_contact_nationality_element.value);

var form_contact_language_element = document.getElementById('form_contact_language');
fd.append  ('form_contact_language',form_contact_language_element.value);


var form_contact_modify_right_element = document.getElementById('form_contact_modify_right');
if  (form_contact_modify_right_element.checked==1) 
{fd.append  ('form_contact_modify_right',1)} else {fd.append  ('form_contact_modify_right',0)}

//fd.append  ('form_contact_modify_right',form_contact_modify_right_element.value);

var form_contact_view_right_element = document.getElementById('form_contact_view_right');
if  (form_contact_view_right_element.checked==1) 
{fd.append  ('form_contact_view_right',1)} else {fd.append  ('form_contact_view_right',0);}


//if  (form_contact_view_right_element.checked==1) {alert ("view right checked");}


// RegExp to allow  only numbers, letters and dashes "-", "_"
var regx_chr = /^([a-zA-Z0-9_-]+)$/;

  if (form_contact_id_element.value.length > 10||form_contact_id_element.value.search(regx_chr)==-1)
  {iserror=true;
   errormess = errormess+" Az azonosító ékezet nélküli betűket , számokat és \"-_\" karaktereket tartalmazhat és maximum 10 karakter hosszú!";
      
  }
  
  if (form_contact_password_element.value.length>45 || form_contact_password_element.value.search(regx_chr)==-1)
      {
   iserror=true;
   errormess = errormess+" A jelszó  ékezet nélküli betűket , számokat és \"-_\" karaktereket tartalmazhat és maximum 45 karakter hosszú!";
        
      }
 
//alert ("dkajkfhlk");




if (!iserror)
    {
xmlhttp.open("POST", "update_insert_contact_form.php");
xmlhttp.send (fd);
    }
    else
        {alert (errormess);}
    


//alert (fd['form_firm_id']);

//alert ('dd');

//alert (form_firm_id_element.value);
 


//document.getElementById('myDiv').innerHTML='Upload finished!';

}

function service_form_record ()
{

//document.getElementById('myDiv').innerHTML='Upload started!';


//alert (form_contact_id);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  
var service_id='';  
  
  // visszajön a contact_id 
  
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    service_id=xmlhttp.responseText;
    
    
    if (service_id !="EXISTS")
        {
    
    if (service_id.length<=10)   // Ha visszajövő érték hossza nagyobb mint 10 feltételezhető , hogy hibaüzenet jött vissza
    {   
        alert ('Adatlap sikeresen rögzült!');
        service_adatlapedit (service_id);
    } else
        {
        alert ('Rögzítési hiba :'+ service_id)    
        }
        } 
        else {alert ('Már létezik ilyen szolgáltatás!');}
        
    
    

    }
  }
  



 var fd = new FormData(); 
 
var form_service_id_element = document.getElementById('form_service_id');
fd.append ('form_service_id',form_service_id_element.value);


var form_service_name_element = document.getElementById('form_service_name');
fd.append  ('form_service_name',form_service_name_element.value);


xmlhttp.open("POST", "update_insert_service_form.php");
xmlhttp.send (fd);


}



function synonym_form_record ()
{

//document.getElementById('myDiv').innerHTML='Upload started!';


//alert (form_contact_id);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
    else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  
var synonym_word='';  
  
  // visszajön a contact_id 
  
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    synonym_word=xmlhttp.responseText;
    
    
    if (synonym_word !="EXISTS")
        {
    
        if (synonym_word.length<=10)   // Ha visszajövő érték hossza nagyobb mint 10 feltételezhető , hogy hibaüzenet jött vissza
        {   
        alert ('Adatlap sikeresen rögzült!');
        synonym_adatlapedit (synonym_word);
        } else
        {
        alert ('Rögzítési hiba :'+ synonym_word)    
        }
        } 
        else {alert ('Már létezik ilyen szolgáltatás!');}
        
    
    

    }
  }
  



 var fd = new FormData(); 
 
//var form_synonym_word_element = document.getElementById('form_synonyms_word');
//fd.append ('form_synonyms_word',form_synonym_word_element.value);


//var form_synonym_synonym_element = document.getElementById('form_synonyms_synonym');
//fd.append  ('form_synonyms_synonym',form_synonym_synonym_element.value);

var form_synonym_series = document.getElementById('form_synonym_series');
fd.append  ('form_synonym_series',form_synonym_series.value);


xmlhttp.open("POST", "update_insert_synonym_form.php");
xmlhttp.send (fd);


}



function menu_form_record ()
{

//document.getElementById('myDiv').innerHTML='Upload started!';


//alert (form_contact_id);

if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
    else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
  
var menupoint='';  
  
  // visszajön a contact_id 
  
  
  xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    menupoint=xmlhttp.responseText;
    
  //  alert (menupoint);
    if (menupoint !="EXISTS")
        {
    
        if (menupoint!="RECORDING_ERROR")   // Ha visszajövő érték hossza nagyobb mint 10 feltételezhető , hogy hibaüzenet jött vissza
        {   
        alert ('Adatlap sikeresen rögzült!');
        menu_adatlapedit (menupoint);
        } else
        {
        alert ('Rögzítési hiba :'+ menupont)    
        }
        } 
        else {alert ('Már létezik ilyen menüpont!');}
        
    
    

    }
  }
  



 var fd = new FormData(); 
 
var form_menus_menupoint_element = document.getElementById('form_menus_menupoint');
fd.append ('form_menus_menupoint',form_menus_menupoint_element.value);

//alert (form_menus_menupoint_element.value);


var form_menus_text_element = document.getElementById('form_menus_text');
fd.append  ('form_menus_text',form_menus_text_element.value);

//alert (form_menus_text_element.value);

xmlhttp.open("POST", "update_insert_menu_form.php");
xmlhttp.send (fd);


}

































function paging (page_number,order_jspar,view_name)
{
    
    
var search_field = document.getElementById('search_field_admin');    
    
    
//alert (search_field.value);
//alert (view_name);
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
  
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    document.getElementById('myDiv').innerHTML=xmlhttp.responseText;
    }
  }
  
if (view_name=='firms')  
  {
      //alert (search_field.value);
  
 xmlhttp.open ('GET','adatlap_lista.php?page='+page_number+'&order='+order_jspar+'&search='+search_field.value,true);
//xmlhttp.open ('GET','adatlap_lista.php?page='+page_number+'&order='+order_jspar,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}

if (view_name=='contacts')  
  {
xmlhttp.open ('GET','profile_lista.php?page='+page_number+'&order='+order_jspar,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}


if (view_name=='service')  
  {
xmlhttp.open ('GET','service_lista.php?page='+page_number+'&order='+order_jspar+'&search='+search_field.value,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}


if (view_name=='synonym')  
  {
xmlhttp.open ('GET','synonyms.php?page='+page_number+'&order='+order_jspar+'&search='+search_field.value,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}

if (view_name=='postal_code')  
  {
      
xmlhttp.open ('GET','postalcode_lista.php?page='+page_number+'&order='+order_jspar+'&search='+search_field.value,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}



if (view_name=='menu')  
  {
      
  //
//  var search_field = document.getElementById('search_field_admin');    
//alert (search_field.value+","+page_number+","+order_jspar)   ;
      
  
xmlhttp.open ('GET','menus.php?page='+page_number+'&order='+order_jspar+'&search='+search_field.value,true);
//xmlhttp.open("GET","testlista.txt",true);
xmlhttp.send();
}




        
}

$(document).ready(function() {
        
        $('editform').submit(function() 
        {           // catch the forms submit event
        alert ('blabla');
                
                $.ajax({ // create an AJAX call...
                    data: $(this).serialize(), // get the form data
                    type: $(this).attr('method'), // GET or POST
                    url: $(this).attr('action'), // the file to call
                    success: function(response) 
                        { // on success..
                        $('myDiv').html(response); // update the DIV
                        }
                      });
            return false; // cancel original event to prevent form submitting
        });
        
//$('#mainmenu a[href="#helysegek"]').click();
      
$('#mainmenu a').click(function (e)
{
    e.preventDefault();
    $(this).tab ('show');
    
    var adm_menuvalasz = $(this).attr('href');
    
    //alert ($(this).attr('href'));
    
    switch  (adm_menuvalasz) 
    {
        case '#helysegek': 
            menuvalasz ('postalcodes');
            break;
        case '#profilok':
            menuvalasz ('profiles');
            break;
        case '#szolgaltatasok':
            menuvalasz ('services');
            break;
        case '#kepek':
            menuvalasz ('pictures');
            break;
        case '#cegek':
            menuvalasz ('adatlap');
            break;
        case '#hirdetesek':
            menuvalasz ('ads');
            break;            
        case '#szinonimak':
            menuvalasz ('synonyms');
            break;            
        case '#statisztikak':
            menuvalasz ('statistics');
            break;
        case '#menupontok':
            menuvalasz ('menus');
            break;                
    }
    
    
    
    
    
    
    
}) ;

/*

$('#mainmenu a[href="#profilok"]').click(function (e)
{
    e.preventDefault();
    $(this).tab ('show');
    
    menuvalasz ('profiles');
    
}) ;

*/



});       

function service_add_to_firm ()
{
    //alert ("");
    
    
    selected_service_id = $("#select_service").val();
    
    if (selected_service_id != null)
    {
    //selected_service_index=$("#select_service option:selected").prevAll().size();    
    selected_service_index=$("#select_service option").index($("#select_service option:selected"));
    
    
    selected_service_name = $("#select_service option:selected").text(); 
    //alert (selected_service_id + " "+ selected_service_name + " " + selected_service_index);
    
    $("#select_service_firm").append("<option value='"+selected_service_id+"'>" +selected_service_name+"</option>")
    
    $("#select_service option:eq("+selected_service_index+")").remove() ;
}
    else
     {alert ("Nem választott ki elemet !!")}
        
    
}


function contact_add_to_firm ()
{
    selected_contact_id = $("#select_contact").val();
    if (selected_contact_id != null)
        {
            selected_contact_index=$("#select_contact option").index($("#select_contact option:selected"));
            selected_contact_name = $("#select_contact option:selected").text(); 
            
            $("#select_contact_firm").append("<option value='"+selected_contact_id+"'>" +selected_contact_name+"</option>")
            $("#select_contact option:eq("+selected_contact_index+")").remove() ;
        }
        else
            {alert ("Nem választott ki elemet !!")}
    
}





function service_remove_from_firm ()
{
   
    selected_service_id = $("#select_service_firm").val();
    if (selected_service_id != null)
    {
    //selected_service_index=$("#select_service option:selected").prevAll().size();    
    selected_service_index=$("#select_service_firm option").index($("#select_service_firm option:selected"));
    
    
    selected_service_name = $("#select_service_firm option:selected").text(); 
    //alert (selected_service_id + " "+ selected_service_name + " " + selected_service_index);
    
    $("#select_service").append("<option value='"+selected_service_id+"'>" +selected_service_name+"</option>")
   
   
   
    //$("#select_contact_firm option:eq("+selected_service_index+")").remove() ;
    $("#select_service_firm option:eq("+selected_service_index+")").remove() ;
}
    else
     {alert ("Nem választott ki elemet !!")}
}
    
function contact_remove_from_firm ()
{
    
 //   alert ();
    selected_contact_id = $("#select_contact_firm").val();
    if (selected_contact_id != null)
        {
            selected_contact_index=$("#select_contact_firm option").index($("#select_contact_firm option:selected"));
            selected_contact_name = $("#select_contact_firm option:selected").text(); 
            
            $("#select_contact").append("<option value='"+selected_contact_id+"'>" +selected_contact_name+"</option>")
            
            
            
            
            $("#select_contact_firm option:eq("+selected_contact_index+")").remove() ;
        }
        else 
            {alert ("Nem választott ki elemet !!")
                
            }
}
    
    




function delete_firm(i){
        
                item_value=i;
                var response_confirm = confirm ("Biztos törlöd a "+item_value+". számú céget?");
                
                
                if (response_confirm==true)
                {
                //
                //alert (i);
                //item_value = document.getElementById(i+'_13').childNodes.item(0).value;
                
                //alert (item_value)    ;
                
                
    		//alert (item_value);
                
                
                //alert (i);
                //alert ("post elott");
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                //alert (response);
                
                
                //document.getElementById("result").innerHTML = response;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('adatlap');
                        }
                        else
                        {//document.getElementById('dataTable').deleteRow(i);}
                     // menuvalasz ('adatlap');
                        alert ("A törlés nem sikerült!");
                        }
             
                    }
                }
                
                 
               var fd = new FormData();
               fd.append ('item',item_value.toString());
              
               xmlhttp.open("POST", "delete_firms.php");
               xmlhttp.send (fd);
                
                
                
                
	
                }
        }
        

function delete_synonym(word,synonym){
        
                var item_value=word;
                var item_value2=synonym;
                var response_confirm = confirm ("Biztos törlöd a(z) "+item_value+" szinonimát??");
                
                
                if (response_confirm==true)
                {
                //
                //alert (i);
                //item_value = document.getElementById(i+'_13').childNodes.item(0).value;
                
                //alert (item_value);
                //alert (i);
                //alert ("post elott");
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                //alert (response);
                
                
                //document.getElementById("result").innerHTML = response;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('synonyms');
                        }
                        else
                        {//document.getElementById('dataTable').deleteRow(i);}
                     // menuvalasz ('adatlap');
                        //alert (response);
                        alert ("A törlés nem sikerült!");
                        }
             
                    }
                }
                
                 
               var fd = new FormData();
               fd.append ('item',item_value);
               fd.append ('item2', item_value2)
              
               xmlhttp.open("POST", "delete_synonyms.php");
               xmlhttp.send (fd);
                
                
                
                
	
                }
        }





        
        
        


function delete_service(i){
        
                item_value=i;
                var response_confirm = confirm ("Biztos törlöd a "+item_value+". számú szolgátatást?");
                
                
                if (response_confirm==true)
                {
                //
                //alert (i);
                //item_value = document.getElementById(i+'_13').childNodes.item(0).value;
                
                //alert (item_value)    ;
                
                
    		//alert (item_value);
                
                
                //alert (i);
                //alert ("post elott");
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                //alert (response);
                
                
                //document.getElementById("result").innerHTML = response;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('services');
                        }
                        else
                        {//document.getElementById('dataTable').deleteRow(i);}
                     // menuvalasz ('adatlap');
                        alert ("A törlés nem sikerült! Egyik cégnek van ilyen szolgáltatása!");
                        }
             
                    }
                }
                
                 
               var fd = new FormData();
               fd.append ('item',item_value.toString());
              
               xmlhttp.open("POST", "delete_services.php");
               xmlhttp.send (fd);
                
                
                
                
	
                }
        }


function delete_profile(i){
        
                item_value=i;
                var response_confirm = confirm ("Biztos törlöd a "+item_value+". számú profilt?");
                
                
                if (response_confirm==true)
                {
                //
                //alert (i);
                //item_value = document.getElementById(i+'_13').childNodes.item(0).value;
                
                //alert (item_value)    ;
                
                
    		//alert (item_value);
                
                
                //alert (i);
                //alert ("post elott");
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                //alert (response);
                
                
                //document.getElementById("result").innerHTML = response;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('profiles');
                        }
                        else
                        {//document.getElementById('dataTable').deleteRow(i);}
                     // menuvalasz ('adatlap');
                        alert ("A törlés nem sikerült! A profilnak vannak cégei!");
                        }
             
                    }
                }
                
                 
               var fd = new FormData();
               fd.append ('item',item_value.toString());
              
               xmlhttp.open("POST", "delete_profiles.php");
               xmlhttp.send (fd);
                
                
                
                
	
                }
        }




function delete_postal_code (i,postal_id_key_tag){
        
                item_value=i;
                var response_confirm = confirm ("Biztos törlöd a "+item_value+". irányítószámú helységet?");
                
                
                if (response_confirm==true)
                {
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('postalcodes');
                        }
                        else
                        {
                        alert ("A törlés nem sikerült!!");
                        }
             
                    }
                }
                
              
              //alert (postal_id_key_tag);
               var fd = new FormData();
               fd.append ('item',item_value.toString());
               fd.append('postal_id_key_tag',postal_id_key_tag);
              
              
              
               xmlhttp.open("POST", "delete_postalcode.php");
               xmlhttp.send (fd);
                }
        }





























function delete_menu(i){
        
                menupoint=i;
                var response_confirm = confirm ("Biztos törlöd a(z) "+menupoint+" menüt?");
                
                
                if (response_confirm==true)
                {
                //
                //alert (i);
                //item_value = document.getElementById(i+'_13').childNodes.item(0).value;
                
                //alert (item_value)    ;
                
                
    		//alert (item_value);
                
                
                //alert (i);
                //alert ("post elott");
                if (window.XMLHttpRequest)
                {// code for IE7+, Firefox, Chrome, Opera, Safari
                xmlhttp=new XMLHttpRequest();
                //alert ("xmlhttpreq");
                }
                else
                {// code for IE6, IE5
                 xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
                }
    
    
                xmlhttp.onreadystatechange=function()
                {
                if (xmlhttp.readyState==4 && xmlhttp.status==200)
                {
                response=xmlhttp.responseText;
                //alert (response);
                
                
                //document.getElementById("result").innerHTML = response;
                
                if (response == "OK") {alert ("Sikeres törlés!");
                    menuvalasz ('menus');
                        }
                        else
                        {//document.getElementById('dataTable').deleteRow(i);}
                     // menuvalasz ('adatlap');
                        alert ("A törlés nem sikerült! ");
                        }
             
                    }
                }
                
                 
               var fd = new FormData();
               fd.append ('item',menupoint);
              
               xmlhttp.open("POST", "delete_menu.php");
               xmlhttp.send (fd);
                
                
                
                
	
                }
        }




























function clear_adv (auto_increment_id)

{
    if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xmlhttp=new XMLHttpRequest();
  }
  else
  {// code for IE6, IE5
  xmlhttp=new ActiveXObject('Microsoft.XMLHTTP');
  }
    
xmlhttp.onreadystatechange=function()
  {
  if (xmlhttp.readyState==4 && xmlhttp.status==200)
    {
    response=xmlhttp.responseText;
    //alert (response);
    
    if (  response == "OK" )   
    {   
        menuvalasz ("ads");
    }
else 
{
  alert ("Törlés nem sikerült. Hiba:" +response);
  menuvalasz ("ads");
}    

    }
  }
    

var fd = new FormData(); 



//alert (auto_increment_id);


fd.append  ('picture_to_delete',auto_increment_id);
//alert (picture_element);


xmlhttp.open("POST", "delete_adv.php");
xmlhttp.send (fd);

}



window.onbeforeunload = function(e) {
  //  return 'Elhagyni készül a szaktudor.hu-t. Minden adatot elmentettél?';
};


function changed_on_form ()
{
    
}



