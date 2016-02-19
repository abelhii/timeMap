<?php
	ob_start();
	require('/results.json');
	$template = ob_get_contents();
	ob_get_clean();
	echo $template;
	exit;	
?>