var autodiv6 = document.createElement("div");
autodiv6.id = "auto-results_catalog_mobile";
autodiv6.className = "content-6";
var phil = document.getElementById(appenddivcatalog_mobile);
document.getElementById(appenddivcatalog_mobile).appendChild(autodiv6);
$("#auto-results_catalog_mobile").css("display", "none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_catalog_mobile(event) {
    var key = event.keyCode;
    var $listItems = $('#auto-results_catalog_mobile li');
    $selected = $('#auto-results_catalog_mobile li.result.selectedtermcatalog_mobile');
    $current = "";
    if (key != 40 && key != 38) {
        box = document.getElementById(searchboxidcatalog_mobile);
        query = box.value;
        query = query.replace(/ /gi, "+");
        $('#auto-results_catalog_mobile').css("display", "none");
        if (query != '') {
            getResults_catalog_mobile(encodeURIComponent(query));
        }
    }
    else {
        $listItems.removeClass('selectedtermcatalog_mobile');
        if (key == 40) // Down key
        {

            if (!$selected.length || $selected.is(':last-child')) {
                $current = $listItems.eq(0);
            }
            else {

                $current = $selected.next();
            }
        }
        else if (key == 38) // Up key
        {
            if (!$selected.length || $selected.is(':first-child')) {
                $current = $listItems.last();
            }
            else {
                $current = $selected.prev();
            }
        }
        $current.addClass('selectedtermcatalog_mobile');
        document.getElementById(searchboxidcatalog_mobile).value = $current.html();
    }
}
function getResults_catalog_mobile(term) {
    console.log("Trying to get results catalog colapse 2 mobile only");
    $.ajax({
        type: "GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s3067642/autocomplete-api-rest/autocomp_catalog_mobile.php",
        data: { q: term },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        results = $.parseJSON(data);
        if (results.hasOwnProperty('terms')) {
            newTerm = document.getElementById(searchboxidcatalog_mobile).value;
            newTerm = newTerm.replace(/ /gi, "+");
            newTerm = encodeURIComponent(newTerm);
            /*
            console.log("Query is: "+term);
            console.log("New Term is: "+newTerm);
            */
            if (term == newTerm) {
                $("#auto-results_catalog_mobile").css("display", "none");
                $("#auto-results_catalog_mobile").find("li").each(function () {
                    $(this).remove();
                });
                $.each(results.terms, function () {
                    $('#auto-results_catalog_mobile').append('<li class="result" onclick="updateSearch_catalog(&quot;' + this['term'] + '&quot;)">' + this['term'] + '</li>');
                });
                $("#auto-results_catalog_mobile").css("display", "block");
                $("#auto-results_catalog_mobile").css("margin-top", "33px");
                $("#auto-results_catalog_mobile").css("z-index", "10");
                $(".slide").css("overflow", "visible");
            }
        }
        else {
            var div = document.getElementById('auto-results_catalog_mobile');
            if (div != null) {
                $("#auto-results_catalog_mobile").css("display", "none");
            }
        }
    });
}
function updateSearch_catalog(term) {
    term = term.trim();
    document.getElementById(searchboxidcatalog_mobile).value = term;

    if (searchOnClickCatalog_mobile === true) {
        $('#' + searchformidcatalog_mobile).submit();
    }
    if (searchOnClickCatalog_mobile === false) { autocomp_catalog_mobile(event); }
}


$('body').click(function (e) {
    if (e.target.id == 'auto-results_catalog_mobile') { return true; }
    else { $('#auto-results_catalog_mobile').hide(); }
});
