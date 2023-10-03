function loadXMLDoc(theURL) {
  if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari, SeaMonkey
    xmlhttp = new XMLHttpRequest()
  } else {
    // code for IE6, IE5
    xmlhttp = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      alert(xmlhttp.responseText)
    }
  }
  xmlhttp.open('GET', theURL, false)
  xmlhttp.send()
}

loadXMLDoc(
  'https://squad-sebrae.github.io/scripts-repository/consent/consent-verify/modal.html'
)
