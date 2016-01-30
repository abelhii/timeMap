<?php
$your_google_calendar="https://calendar.google.com/calendar/embed?src=p52pqevg7jmba3d8lla6l9afhs%40group.calendar.google.com&ctz=Europe/Dublin";
$url= parse_url($your_google_calendar);
$google_domain = $url['scheme'].'://'.$url['host'].dirname($url['path']).'/';
// Load and parse Google's raw calendar
$dom = new DOMDocument;
$dom->loadHTMLfile($your_google_calendar);
// Change Google's CSS file to use absolute URLs (assumes there's only one element)
$css = $dom->getElementsByTagName('link')->item(0);
$css_href = $css->getAttribute('href');
$css->setAttribute('href', $google_domain . $css_href);
// Change Google's JS file to use absolute URLs
$scripts = $dom->getElementsByTagName('script')->item(0);
foreach ($scripts as $script) {
$js_src = $script->getAttribute('src');
if ($js_src) $script->setAttribute('src', $google_domain . $js_src);
}
// Create a link to a new CSS file called custom_calendar.css
$element = $dom->createElement('link');
$element->setAttribute('type', 'text/css');
$element->setAttribute('rel', 'stylesheet');
$element->setAttribute('href', 'custom_calendar.css');
// Append this link at the end of the element
$head = $dom->getElementsByTagName('head')->item(0);
$head->appendChild($element);
// Export the HTML
//echo $dom->saveHTML();
?>