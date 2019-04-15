<?php
	//echo "Hola mundo";
?>

<!DOCTYPE html>
<html lang="es">
<head>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>Document</title>
</head>
<body>
	<form action="http://localhost/api/files/upload" method="POST" enctype='multipart/form-data'>
		<div>
			<input type="file" 
					name="file_uploads[]" 
					id="file" 
					accept="image/png, image/jpeg"
					multiple="multiple">
			<label for="file">Cargar archivos</label>
		</div>
		<input type="submit" value="Cargar">
	</form>
</body>
</html>