var autodiv7 = document.createElement("div");
autodiv7.id = "auto-results_repository_mobile";
autodiv7.className = "content-7";
var phil = document.getElementById(appenddivrepository_mobile);
document.getElementById(appenddivrepository_mobile).appendChild(autodiv7);
$("#auto-results_repository_mobile").css("display", "none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_repository_mobile(event) {
    var key = event.keyCode;
    var $listItems = $('#auto-results_repository_mobile li');
    $selected = $('#auto-results_repository_mobile li.result.selectedtermrepository_mobile');
    $current = "";
    if (key != 40 && key != 38) {
        box = document.getElementById(searchboxidrepository_mobile);
        query = box.value;
        query = query.replace(/ /gi, "+");
        $('#auto-results_repository_mobile').css("display", "none");
        if (query != '') {
            getResults_repository_mobile(encodeURIComponent(query));
        }
    }
    else {
        $listItems.removeClass('selectedtermrepository_mobile');
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
        $current.addClass('selectedtermrepository_mobile');
        document.getElementById(searchboxidrepository_mobile).value = $current.html();
    }
}
function getResults_repository_mobile(term) {
    console.log("Trying to get results catalog colapse 7 mobile only");
    $.ajax({
        type: "GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s6962168/autocomp/autocomp_repository_mobile.php",
        data: { q: term },
        dataType: 'json'
    }).done(function (data) {
        console.log(data);
        results = $.parseJSON(data);
        if (results.hasOwnProperty('terms')) {
            newTerm = document.getElementById(searchboxidrepository_mobile).value;
            newTerm = newTerm.replace(/ /gi, "+");
            newTerm = encodeURIComponent(newTerm);
            /*
            console.log("Query is: "+term);
            console.log("New Term is: "+newTerm);
            */
            if (term == newTerm) {
                $("#auto-results_repository_mobile").css("display", "none");
                $("#auto-results_repository_mobile").find("li").each(function () {
                    $(this).remove();
                });
                $.each(results.terms, function () {
                    $('#auto-results_repository_mobile').append('<li class="result" onclick="updateSearch_repository(&quot;' + this['term'] + '&quot;)">' + this['term'] + '</li>');
                });
                $("#auto-results_repository_mobile").css("display", "block");
                $("#auto-results_repository_mobile").css("margin-top", "33px");
                $("#auto-results_repository_mobile").css("z-index", "10");
                $(".slide").css("overflow", "visible");
            }
        }
        else {
            var div = document.getElementById('auto-results_repository_mobile');
            if (div != null) {
                $("#auto-results_repository_mobile").css("display", "none");
            }
        }
    });
}
function updateSearch_repository(term) {
    term = term.trim();
    document.getElementById(searchboxidrepository_mobile).value = term;

    if (searchOnClickRepository_mobile === true) {
        $('#' + searchformidrepository_mobile).submit();
    }
    if (searchOnClickRepository_mobile === false) { autocomp_repository_mobile(event); }
}


$('body').click(function (e) {
    if (e.target.id == 'auto-results_repository_mobile') { return true; }
    else { $('#auto-results_repository_mobile').hide(); }
});
