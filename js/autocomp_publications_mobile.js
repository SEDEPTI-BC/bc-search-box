var autodiv8 = document.createElement("div");
autodiv8.id = "auto-results_publications_mobile";
autodiv8.className = "content-8";
document.getElementById(appenddivpublications_mobile).appendChild(autodiv8);
$('#auto-results_publications_mobile').css("display","none");
//$('#auto-results_publications_mobile').append('<h4 class="result-title">Popular Terms</h4>');
function autocomp_publications_mobile(event){
    var key = event.keyCode;
    var $listItems = $('#auto-results_publications_mobile li');
     $selected = $('#auto-results_publications_mobile li.result.selectedterm_publications_mobile');
     $current="";
     if ( key != 40 && key != 38 )
     {
        box = document.getElementById(searchboxid_publications_mobile);
        query = box.value;
        query = query.replace(/ /gi,"+");
        $('#auto-results_publications_mobile').css("display","none");
        if (query != ''){
            getResults_publications_mobile(encodeURIComponent(query));
            }
     }
     else
     {
         $listItems.removeClass('selectedterm_publications_mobile');
        if ( key == 40 ) // Down key
        {
            
            if ( !$selected.length || $selected.is(':last-child') ) {
                $current = $listItems.eq(0);
            }
            else {
                
                $current = $selected.next();
            }
        }
        else if ( key == 38 ) // Up key
        {
            if ( !$selected.length || $selected.is(':first-child') ) {
                $current = $listItems.last();
            }
            else {
                $current = $selected.prev();
            }
        }
        $current.addClass('selectedterm_publications_mobile');
        document.getElementById(searchboxid_publications_mobile).value = $current.html();
     }
} 
function getResults_publications_mobile(term){
    console.log("Trying to get results to collapse 4 publications, mobile only");
    $.ajax({
        type:"GET",
        //url: "autocomp_publications_mobile.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s3067642/autocomplete-api-rest/autocomp_publications_mobile.php",
        data: { q: term},
        dataType: 'json'
        }).done(function( data ) {
            console.log(data);
            results = $.parseJSON(data);
            if (results.hasOwnProperty('terms')) {
                newTerm = document.getElementById(searchboxid_publications_mobile).value;
                newTerm = newTerm.replace(/ /gi,"+");
                newTerm = encodeURIComponent(newTerm);
                /*
                console.log("Query is: "+term);
                console.log("New Term is: "+newTerm);
                */
                if (term == newTerm){
                    $("#auto-results_publications_mobile").css("display","none");
                    $("#auto-results_publications_mobile").find("li").each(function(){
                        $(this).remove();
                    });
                    $.each(results.terms, function(){
                        $('#auto-results_publications_mobile').append('<li class="result" onclick="updateSearch(&quot;'+this['term']+'&quot;)">'+this['term']+'</li>');
                    });
                    $("#auto-results_publications_mobile").css("display","block");
					$("#auto-results_publications_mobile").css("margin-top","33px");
					$("#auto-results_publications_mobile").css("z-index","10");
					$(".slide").css("overflow","visible"); 
                }    
            }
            else {
                var div = document.getElementById('auto-results_publications_mobile');
                if (div != null) {
                    $("#auto-results_publications_mobile").css("display","none");
                }
            }
        });
}
function updateSearch(term){
    term = term.trim();
    document.getElementById(searchboxid_publications_mobile).value = term;
    if (searchOnClick_publications_mobile == true) {
        $('#'+searchformid_publications_mobile).submit();
    }
    if (searchOnClick_publications_mobile == false) {autocomp_publications_mobile(event);}
}
$('body').click(function(e){
       if( e.target.id == 'auto-results_publications_mobile' )
          { return true; }
       else
          { $('#auto-results_publications_mobile').hide(); }
 });