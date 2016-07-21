<?php


include 'databasedatas.php';
header('Content-Type: text/html; charset=UTF-8');
session_start ();

//$_SESSION ['database_host'] ="localhost";
//$_SESSION ['database_user'] ="root";
//$_SESSION ['database_password'] ="CucuMalac";



//$con = mysql_connect("localhost","root","CucuMalac");
//$con = mysql_connect($_SESSION ['database_host'],$_SESSION ['database_user'],$_SESSION ['database_password']);

$con = mysql_connect($database_host,$database_user,$database_password);

mysql_query("set names 'utf8'");


if (!$con)
  {
  die('Could not connect: ' . mysql_error());
  }
 // echo $con;
$_SESSION ['sql_connection'] = $con;
$database_selected = mysql_select_db($database, $con);

//$_SESSION ['database'] = "szakmai_tudakozo";

//$query = "ksdksl";


//echo "eddig jo <p>";
$loginid=  mysql_real_escape_string($_POST['id']);
//$loginid=$id;


$loginpassword=  mysql_real_escape_string($_POST ['password']);
//$loginpassword=$password;


//echo $loginid."<br>";
//echo $loginpassword."<br>";

$query = "SELECT * FROM contacts WHERE BINARY contact_id= ? AND  BINARY contact_password= ?";
    
$command = $database_selected->prepare ($query);
    
$command->bind_param ($loginid,$loginpassword);



//$query = "SELECT * FROM contacts WHERE BINARY contact_id=\"".$loginid."\" AND  BINARY contact_password=\"".$loginpassword."\"";

//echo $query;

$result = $command->execute ();


//$result = mysql_query($query,$con);


//$onerow = mysql_fetch_object($result);

$onerow = $stmt->fetch ();


$loginfirstname = $onerow->contact_first_name;
$loginlastname =  $onerow->contact_last_name;
//$loginviewright = $onerow->contact_view_right;
//$loginmodifyright = $onerow -> contact_modify_right;




//$result= mysql_query (" SELECT *  FROM  `contacts` WHERE `contact_id`='".mysql_real_escape_string($_POST ['id'] )." 'AND `contact_password`=' ".mysql_real_escape_string  ($POST['password'])."'", $con);
//$q = mysql_query("SELECT `id` FROM `users` WHERE `username`= ' " .mysql_real_escape_string( $_GET['username'] ). " ' AND `password`= ' " .mysql_real_escape_string( $_GET['password'] ). " ' ", $database);  
//echo "megvolt a lekerdezes<br>";

$rows_number=mysql_num_rows ($result);
//echo $rows_number."<b>";


if ($rows_number==0) { print  "Nem megfelelő adatok.<br>"; print "<a href=\"javascript:window.history.back() \"> Vissza</a>    ";} 

if ($rows_number>0) {
  


//echo session_id();

$_SESSION ['loggedin_userid'] = $loginid;
$_SESSION ['loggedin_firstname'] =$loginfirstname;
$_SESSION ['loggedin_lastname'] =$loginlastname;

$_SESSION ['modifyright']=$loginmodifyright;
$_SESSION ['viewright']=$loginviewright;

?>


<HTML>
<HEAD>
<link rel="stylesheet" type="text/css" href="mainmenu.css" />
<link rel="stylesheet" type="text/css" href="table.css" />
<link rel="stylesheet" type="text/css" href="./css/stylesheet.css" />


<link rel="stylesheet" type="text/css" href="./css/bootstrap.min.css" />  <!-- This is for the boostrap -->


<!-- <script type="text/javascript" src="jquery-1.7.2.min.js"></script> -->
<script type="text/javascript" src="jquery-2.1.3.min.js"></script>

<script type="text/javascript" src="bootstrap.min.js"> </script>
<script type="text/javascript" src="js_functions.js"></script>






</HEAD>

<BODY class="body-grey-gradient">

    
<div class="row">    
 
    <div class="col-md-12">
        <div class="jumbotron">
            <H2>
                Szaktudor adminisztrátor felület
            </H2>
            
            <p>
            <?php
                print  "Felhasználó:".$_SESSION ['loggedin_userid']." ".$_SESSION ['loggedin_firstname']." ".$_SESSION ['loggedin_lastname'] ; //=$loginlastname;
            ?>
            </p>
            <input class="btn btn-danger btn-lg" type="button"  value="Kijelentkezés" onclick="javascript:menuvalasz('logout')">
        </div>
        
        
    </div>
    
</DIV>    
<DIV    class="row">

    <div class="col-md-12">
        
        <DIV id='mainmenu'>
        
        <ul class="nav nav-pills">
        <li >
            <a href="#helysegek">Helységek</a>
            <!-- <a href="javascript:menuvalasz ('postalcodes');">Helységek</a>  -->
        </li>
        <li  > 
            <a href="#profilok">Profilok</a>
            <!-- <a href="javascript:   menuvalasz ('profiles');  ">Profilok</a> -->
        </LI>
      
        <li  > 
             <a href="#szolgaltatasok">Szolgáltatások</a>
            <!-- <a href="javascript:menuvalasz  ('services')">Szolgáltatások</a> -->
        </LI>
         <li > 
             <a href="#kepek">Képek</a>
            <!-- <a href="javascript:menuvalasz  ('pictures')">Képek</a> -->
        </LI>
        <li  > 
            <a href="#cegek">Cégek</a>
            <!-- <a href="javascript:menuvalasz('adatlap');"> Cégek </a> -->
        </LI>
        <li > 
            <a href="#hirdetesek">Hirdetések</a>
            <!-- <a href="javascript:menuvalasz('ads');"> Hirdetések </a> -->
        </LI>
        <li  > 
           <a href="#szinonimak">Szinonimák</a>
            <!-- <a href="javascript:menuvalasz('synonyms');"> Szinonimák </a> -->
        </LI>
        <li  > 
            <a href="#statisztikak">Statisztikák</a>
            <!-- <a href="javascript:menuvalasz('statistics');"> Statisztikák </a> -->
        </LI>
        <li  > 
                <a href="#menupontok">Menüpontok</a>
            <!-- <a href="javascript:menuvalasz('menus');"> Menüpontok  </a> -->
        </LI>
        
        
        
        </ul>
        
        </DIV>
        
    </div>
    
</DIV>
    
    

    <div class="row" >
        <div id="myDiv" class="col-md-12">
            
        </div>
        
        
        
    </div>
    
    
    
<?php


$adatlap="'adatlap'";



//echo  ' <div id="paging" style ="width:1400px" >';

}


?>



    
    
</BODY>












  






<?php
mysql_close($con);
?> 
</HTML>