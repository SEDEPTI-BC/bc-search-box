var autodiv3 = document.createElement("div");
autodiv3.id = "auto-results_catalog";
autodiv3.className = "content-3";
var phil = document.getElementById(appenddivcatalog);
document.getElementById(appenddivcatalog).appendChild(autodiv3);
$("#auto-results_catalog").css("display", "none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_catalog(event) {
    var key = event.keyCode;
    var $listItems = $('#auto-results_catalog li');
    $selected = $('#auto-results_catalog li.result.selectedtermcatalog');
    $current = "";
    if (key != 40 && key != 38) {
        box = document.getElementById(searchboxidcatalog);
        query = box.value;
        query = query.replace(/ /gi, "+");
        $('#auto-results_catalog').css("display", "none");
        if (query != '') {
            getResults_catalog(encodeURIComponent(query));
        }
    }
    else {
        $listItems.removeClass('selectedtermcatalog');
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
        $current.addClass('selectedtermcatalog');
        document.getElementById(searchboxidcatalog).value = $current.html();
    }
}
function getResults_catalog(term) {
    console.log("Trying to get results from autocomp catalog tab 2");
    $.ajax({
        type: "GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s6962168/autocomp/autocomp_catalog.php",
        data: { q: term },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        results = $.parseJSON(data);
        if (results.hasOwnProperty('terms')) {
            newTerm = document.getElementById(searchboxidcatalog).value;
            newTerm = newTerm.replace(/ /gi, "+");
            newTerm = encodeURIComponent(newTerm);
            /*
            console.log("Query is: "+term);
            console.log("New Term is: "+newTerm);
            */
            if (term == newTerm) {
                $("#auto-results_catalog").css("display", "none");
                $("#auto-results_catalog").find("li").each(function () {
                    $(this).remove();
                });
                $.each(results.terms, function () {
                    $('#auto-results_catalog').append('<li class="result" onclick="updateSearch_catalog(&quot;' + this['term'] + '&quot;)">' + this['term'] + '</li>');
                });
                $("#auto-results_catalog").css("display", "block");
                $("#auto-results_catalog").css("margin-top", "33px");
                $("#auto-results_catalog").css("z-index", "10");
                $(".slide").css("overflow", "visible");
            }
        }
        else {
            var div = document.getElementById('auto-results_catalog');
            if (div != null) {
                $("#auto-results_catalog").css("display", "none");
            }
        }
    });
}
function updateSearch_catalog(term) {
    term = term.trim();
    document.getElementById(searchboxidcatalog).value = term;

    if (searchOnClickCatalog === true) {
        $('#' + searchformidcatalog).submit();
    }
    if (searchOnClickCatalog === false) { autocomp_catalog(event); }
}


$('body').click(function (e) {
    if (e.target.id == 'auto-results_catalog') { return true; }
    else { $('#auto-results_catalog').hide(); }
});
