<?php
header('location: index.html#kontakt');

  $imie = $_POST['Imie'];
  $nazwisko = $_POST['Nazwisko'];
  $email = $_POST['email'];
  $telefon = $_POST['telefon'];
  $tresc = $_POST['tresc'];
  $temat = "Wiadomość ze strony internetowej";
  $mailheader = "Od:".$imie." ".$nazwisko."<".$email.">\r\n";


  $to = 'bkbart7@gmail.com'; // Zastąp adresem e-mail docelowym



  mail($to, $temat, $tresc, $mailheader) or die("Błąd przy wysyłaniu maila");
  
  echo "Wiadomość wysłana";
 
?>