var autodiv2 = document.createElement("div");
autodiv2.id = "auto-results_eds";
autodiv2.className = "content-1";
var phil=document.getElementById(appenddiveds);
document.getElementById(appenddiveds).appendChild(autodiv2);
$("#auto-results_eds").css("display","none");
//$('#auto-results').append('<h3 class="result-title">Popular Terms</h3>');
function autocomp_eds(event){
    var key = event.keyCode;
    var $listItems = $('#auto-results_eds li');
     $selected = $('#auto-results_eds li.result.selectedtermeds');
     $current="";
    if ( key != 40 && key != 38 )
    {
        box = document.getElementById(searchboxideds);
        query = box.value;
        query = query.replace(/ /gi,"+");
        $('#auto-results_eds').css("display","none");
        if (query != ''){
            getResults_eds(encodeURIComponent(query));
            }
    }
    else
    {
        $listItems.removeClass('selectedtermeds');
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
        $current.addClass('selectedtermeds');
        document.getElementById(searchboxideds).value = $current.html();
    }
}
function getResults_eds(term){
    console.log("Trying to get results from autocomp_eds tab 1");
    $.ajax({
        type:"GET",
        //url: "autocomp_eds.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s6962168/autocomp/autocomp_eds.php",
        data: { q: term},
        dataType: 'json'
        }).done(function( data ) {
            console.log(data);
            results = $.parseJSON(data);
            if (results.hasOwnProperty('terms')) {
                newTerm = document.getElementById(searchboxideds).value;
                newTerm = newTerm.replace(/ /gi,"+");
                newTerm = encodeURIComponent(newTerm);
                /*
                console.log("Query is: "+term);
                console.log("New Term is: "+newTerm);
                */
                if (term == newTerm){
                    $("#auto-results_eds").css("display","none");
                    $("#auto-results_eds").find("li").each(function(){
                        $(this).remove();
                    });
                    $.each(results.terms, function(){
                        $('#auto-results_eds').append('<li class="result" onclick="updateSearch_eds(&quot;'+this['term']+'&quot;)">'+this['term']+'</li>');
                    });
                    $("#auto-results_eds").css("display","block");
                    $("#auto-results_eds").css("margin-top","33px");
                    $("#auto-results_eds").css("z-index","10");
                    $(".slide").css("overflow","visible"); 
                }   
            }
            else {
                var div = document.getElementById('auto-results_eds');
                if (div != null) {
                    $("#auto-results_eds").css("display","none");
                }
            }
        });
}
function updateSearch_eds(term){
    term = term.trim();
    document.getElementById(searchboxideds).value = term;
    
    if (searchOnClickeds === true) {
        $('#'+searchformideds).submit();
    }
    if (searchOnClickeds === false) {autocomp_eds(event);}
}


$('body').click(function(e){
       if( e.target.id == 'auto-results_eds' )
          { return true; }
       else
          { $('#auto-results_eds').hide(); }
 });
