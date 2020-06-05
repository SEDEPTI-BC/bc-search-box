// Be wary of editing existing functions in this file!
//<![CDATA[
function limittoFullText(myForm) {
     if (myForm.fulltext_checkbox.checked) myForm.clv0.value = "Y";
     else myForm.clv0.value = "N";
}
function limittoScholarly(myForm) {
     if(myForm.scholarly_checkbox.checked) myForm.clv1.value = "Y";
     else myForm.clv1.value = "N";
}
function limittoCatalog(myForm) {
     if(myForm.catalog_only_checkbox.checked) myForm.clv2.value = "Y";
     else myForm.clv2.value = "N";
}
function limittoIR(myForm) {
     if(myForm.IR_only_checkbox.checked) myForm.clv3.value = "Y";
     else myForm.clv3.value = "N";
}
function limittoAiLC(myForm) {
     if(myForm.ailc_checkbox.checked) myForm.clv4.value = "Y";
     else myForm.clv4.value = "N";
}
function ebscoPreProcess(myForm) {
	if(myForm.search_prefix.value=="SO "){
		myForm.bquery.value = myForm.search_prefix.value + "\"" + myForm.uquery.value+ "\"";
	}else{
     myForm.bquery.value = myForm.search_prefix.value + myForm.uquery.value;
 }
}

function ebscoSpecialPreProcess(myForm) { //for this function, peer reviewed should be cli0 and clv0!!
    myForm.bquery.value = myForm.search_prefix.value + myForm.uquery.value;
      myForm.clv0.value = 'N';
      if (myForm.searchall.checked){
           myForm.bquery.value += '';
      }
   if (myForm.booksOnly.checked){
                myForm.bquery.value += ' AND PT (Book OR Ebook)';
     }
if (myForm.peer.checked){
                myForm.clv0.value = 'Y';
     }
}
function limittoArticles(myForm) {
     myForm.bquery.value += ' AND (ZT *Article* OR PT *article* OR ZT Serial)';
}
function limittoBooksAndEbooks(myForm) {
     myForm.bquery.value += ' AND (PT Book OR PT Ebook)';
}
function limittoMultimedia(myForm) {
     myForm.bquery.value += ' AND (PT video OR PT audio)';
}
function limittoBooks(myForm) {
     myForm.bquery.value += ' AND (PT Book)';
}
function limittoEBooks(myForm) {
     myForm.bquery.value += ' AND (PT EBook)';
}
function limittoPrintBooks(myForm) {
     myForm.bquery.value += ' AND (PT Book NOT PT EBook)';
}
function limittoTheses(myForm) {
    myForm.bquery.value += ' AND (PT Dissertations/Theses)';
}
//]]>