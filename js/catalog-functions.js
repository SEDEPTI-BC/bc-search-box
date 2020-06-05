function ebscoPreProcess(myForm) {
    myForm.bquery.value = myForm.search_prefix.value + myForm.uquery.value;
}

function limittoFullText(myForm) {
    if (myForm.fulltext_checkbox.checked)
        myForm.clv0.value = "Y";
    else
        myForm.clv0.value = "N";
}

function limittoPeerReview(myForm) {
    if (myForm.peerReview.checked)
        myForm.clv1.value = "Y";
    else
        myForm.clv1.value = "N";
}

function limittoBasesPeriodicos(myForm) {
    if (myForm.peerReview.checked)
        myForm.clv3.value = "Y";
    else
        myForm.clv3.value = "N";
}

function limittoRepository(myForm) {
    if (myForm.peerReview.checked)
        myForm.clv5.value = "Y";
    else
        myForm.clv5.value = "N";
}


function limittoRepoUNB(myForm) {
    myForm.bquery.value += ' AND LN ir01406a';
}

function limittoElectronic(myForm) {
    myForm.bquery.value += ' NOT LN cat07149a';
}

function limittoCollectionUnicamp(myForm) {
    if (myForm.peerReview.checked)
      myForm.clv4.value = "Y";
    else
      myForm.clv4.value = "N";
  }

function limittoCatalog(myForm) {
    myForm.bquery.value = '(' +myForm.bquery.value+ ') AND (LN cat07568a)';
}

function limittoRepoJournals(myForm) {
    myForm.bquery.value = '(' +myForm.bquery.value+ ') AND (LN ir01522a)';
}

function limittoRepoUnicesumar(myForm) {
    myForm.bquery.value = '(' +myForm.bquery.value+ ') AND (LN ir01542a)';
}

function limittoPrinted(myForm) {
    myForm.bquery.value = '(' + myForm.bquery.value + ') (AND PT Book NOT PT eBOOK AND LN cat07149a)';
}

function limittoArticles(myForm) {
    myForm.bquery.value += ' ZT Articles';
}

function limittoBooks(myForm) {
    myForm.bquery.value += ' AND PT eBook';
}

function limittoPubType(myForm, name) {
    var val;
    var radios = myForm.elements[name];

    for (var i = 0, len = radios.length; i < len; i++) {
        if (radios[i].checked) {
            val = radios[i].value;
            break;
        }
    }
    myForm.bquery.value += val;
}