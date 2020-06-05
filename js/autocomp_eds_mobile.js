var autodiv5 = document.createElement("div");
autodiv5.id = "auto-results_eds_mobile";
autodiv5.className = "content-5";
var phil = document.getElementById(appenddiv_eds_mobile);
document.getElementById(appenddiv_eds_mobile).appendChild(autodiv5);
$("#auto-results_eds_mobile").css("display", "none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_eds_mobile(event) {
    var key = event.keyCode;
    var $listItems = $('#auto-results_eds_mobile li');
    $selected = $('#auto-results_eds_mobile li.result.selectedterm_eds_mobile');
    $current = "";
    if (key != 40 && key != 38) {
        box = document.getElementById(searchboxid_eds_mobile);
        query = box.value;
        query = query.replace(/ /gi, "+");
        $('#auto-results_eds_mobile').css("display", "none");
        if (query != '') {
            getResults_eds_mobile(encodeURIComponent(query));
        }
    }
    else {
        $listItems.removeClass('selectedterm_eds_mobile');
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
        $current.addClass('selectedterm_eds_mobile');
        document.getElementById(searchboxid_eds_mobile).value = $current.html();
    }
}
function getResults_eds_mobile(term) {
    console.log("Trying to get results Colapse 1 EDS Mobile only");
    $.ajax({
        type: "GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s3067642/autocomplete-api-rest/autocomp_eds_mobile.php",
        data: { q: term },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        results = $.parseJSON(data);
        if (results.hasOwnProperty('terms')) {
            newTerm = document.getElementById(searchboxid_eds_mobile).value;
            newTerm = newTerm.replace(/ /gi, "+");
            newTerm = encodeURIComponent(newTerm);
            /*
            console.log("Query is: "+term);
            console.log("New Term is: "+newTerm);
            */
            if (term == newTerm) {
                $("#auto-results_eds_mobile").css("display", "none");
                $("#auto-results_eds_mobile").find("li").each(function () {
                    $(this).remove();
                });
                $.each(results.terms, function () {
                    $('#auto-results_eds_mobile').append('<li class="result" onclick="updateSearch_eds_mobile(&quot;' + this['term'] + '&quot;)">' + this['term'] + '</li>');
                });
                $("#auto-results_eds_mobile").css("display", "block");
                $("#auto-results_eds_mobile").css("margin-top", "33px");
                $("#auto-results_eds_mobile").css("z-index", "10");
                $(".slide").css("overflow", "visible");
            }
        }
        else {
            var div = document.getElementById('auto-results_eds_mobile');
            if (div != null) {
                $("#auto-results_eds_mobile").css("display", "none");
            }
        }
    });
}
function updateSearch_eds_mobile(term) {
    term = term.trim();
    document.getElementById(searchboxid_eds_mobile).value = term;

    if (searchOnClick_eds_mobile === true) {
        $('#' + searchformid_eds_mobile).submit();
    }
    if (searchOnClick_eds_mobile === false) { autocomp_eds_mobile(event); }
}


$('body').click(function (e) {
    if (e.target.id == 'auto-results_eds_mobile') { return true; }
    else { $('#auto-results_eds_mobile').hide(); }
});

