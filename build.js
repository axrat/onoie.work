const fs = require('fs');

function put(name,contents){
  fs.writeFile(name,contents , function (err) {
    if (err) {
      console.log(name+"FileWriteError");
      throw err;
    }
  });
}
const first='<html><head>',middle='</head><body>',last='</body></html>';
function script_tag(url){
  return '<script src="'+url+'"></script>'
}
function meta_tag(http_equiv,content){
  return '<meta http-equiv="'+http_equiv+'" content="'+content+'"/>'
}
function sns_tag(site_name,title,description,url,image){
  return '<meta name="twitter:card" content="summary_large_image">'
    +'<meta property="og:title" content="'+title+'">'
    +'<meta property="og:type" content="website">'
    +'<meta property="og:url" content="'+url+'">'
    +'<meta property="og:image" content="'+image+'">'
    +'<meta property="og:site_name" content="'+site_name+'">'
    +'<meta property="og:description" content="'+description+'">';
}
function version_script(url){
  return '<div style="font-size: 70%;">VERSION:<span id="version"></span></div>'
    +'<script type="text/javascript">'
    +'fetch("'+url+'", { method: "get" })'
    +'.then(res => res.text()).then(text => {document.getElementById("version").innerHTML = text;});'
    +'</script>';
}

put("VERSION",new Date());


const before = `<div style="text-align: center;"><h1>onoie.work</h1><hr/>`;
const after = '<hr/>'+version_script("http://rawgit.com/onoie/onoie.work/gh-pages/VERSION")+'</div>';

var head = meta_tag("Content-Type","text/html; charset=utf-8")
  +meta_tag("X-UA-Compatible","IE=edge,chrome=1")
  +sns_tag("ONOIE.WORK","しごとがほしい","おかねがほしい","http://onoie.work/","http://onoie.work/sns.jpg")
  +'<title>ONOIE.WORK</title>'
  +script_tag("//ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js");

var tmp='<h2>依頼を、何卒</h2>';
var json = fs.readFileSync("param.json", "utf-8");
var obj = JSON.parse(json);
var params = obj.params;
var i;
tmp+='<ul style="display:inline-block;text-align: left;">';
for (i in params) {
  var param = params[i];
  tmp+='<li>'+param.KEY+':'+param.VALUE+'</li>';
  //console.log(param.KEY,param.VALUE);
}
tmp+='</ul>';
var body = before+tmp+after;

put("index.html",first+head+middle+body+last);


console.log("complete");