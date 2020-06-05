var autodiv4 = document.createElement("div");
autodiv4.id = "auto-results_repository";
autodiv4.className = "content-4";
var phil = document.getElementById(appenddivrepository);
document.getElementById(appenddivrepository).appendChild(autodiv4);
$("#auto-results_repository").css("display", "none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_repository(event) {
    var key = event.keyCode;
    var $listItems = $('#auto-results_repository li');
    $selected = $('#auto-results_repository li.result.selectedtermrepository');
    $current = "";
    if (key != 40 && key != 38) {
        box = document.getElementById(searchboxidrepository);
        query = box.value;
        query = query.replace(/ /gi, "+");
        $('#auto-results_repository').css("display", "none");
        if (query != '') {
            getResults_repository(encodeURIComponent(query));
        }
    }
    else {
        $listItems.removeClass('selectedtermrepository');
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
        $current.addClass('selectedtermrepository');
        document.getElementById(searchboxidrepository).value = $current.html();
    }
}
function getResults_repository(term) {
    console.log("Trying to get results from autocomp repository tab 3");
    $.ajax({
        type: "GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s6962168/autocomp/autocomp_repository.php",
        data: { q: term },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        results = $.parseJSON(data);
        if (results.hasOwnProperty('terms')) {
            newTerm = document.getElementById(searchboxidrepository).value;
            newTerm = newTerm.replace(/ /gi, "+");
            newTerm = encodeURIComponent(newTerm);
            /*
            console.log("Query is: "+term);
            console.log("New Term is: "+newTerm);
            */
            if (term == newTerm) {
                $("#auto-results_repository").css("display", "none");
                $("#auto-results_repository").find("li").each(function () {
                    $(this).remove();
                });
                $.each(results.terms, function () {
                    $('#auto-results_repository').append('<li class="result" onclick="updateSearch_repository(&quot;' + this['term'] + '&quot;)">' + this['term'] + '</li>');
                });
                $("#auto-results_repository").css("display", "block");
                $("#auto-results_repository").css("margin-top", "33px");
                $("#auto-results_repository").css("z-index", "10");
                $(".slide").css("overflow", "visible");
            }
        }
        else {
            var div = document.getElementById('auto-results_repository');
            if (div != null) {
                $("#auto-results_repository").css("display", "none");
            }
        }
    });
}
function updateSearch_repository(term) {
    term = term.trim();
    document.getElementById(searchboxidrepository).value = term;

    if (searchOnClickRepository === true) {
        $('#' + searchformidrepository).submit();
    }
    if (searchOnClickRepository === false) { autocomp_repository(event); }
}


$('body').click(function (e) {
    if (e.target.id == 'auto-results_repository') { return true; }
    else { $('#auto-results_repository').hide(); }
});
