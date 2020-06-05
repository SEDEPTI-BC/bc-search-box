var autodiv = document.createElement("div");
autodiv.id = "auto-results";
autodiv.className = "content-2";
document.getElementById(appenddiv).appendChild(autodiv);
$('#auto-results').css("display","none");
//$('#auto-results').append('<h4 class="result-title">Popular Terms</h4>');
function autocomp(event){
    var key = event.keyCode;
    var $listItems = $('#auto-results li');
     $selected = $('#auto-results li.result.selectedterm');
     $current="";
     if ( key != 40 && key != 38 )
     {
        box = document.getElementById(searchboxid);
        query = box.value;
        query = query.replace(/ /gi,"+");
        $('#auto-results').css("display","none");
        if (query != ''){
            getResults(encodeURIComponent(query));
            }
     }
     else
     {
         $listItems.removeClass('selectedterm');
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
        $current.addClass('selectedterm');
        document.getElementById(searchboxid).value = $current.html();
     }
} 
function getResults(term){
    console.log("Trying to get results from autocomp publications tab 4");
    $.ajax({
        type:"GET",
        //url: "autocomp.php",
        url: "https://widgets.ebscohost.com/prod/customerspecific/s6962168/autocomp/autocomp_publications.php",
        data: { q: term},
        dataType: 'json'
        }).done(function( data ) {
            console.log(data);
            results = $.parseJSON(data);
            if (results.hasOwnProperty('terms')) {
                newTerm = document.getElementById(searchboxid).value;
                newTerm = newTerm.replace(/ /gi,"+");
                newTerm = encodeURIComponent(newTerm);
                /*
                console.log("Query is: "+term);
                console.log("New Term is: "+newTerm);
                */
                if (term == newTerm){
                    $("#auto-results").css("display","none");
                    $("#auto-results").find("li").each(function(){
                        $(this).remove();
                    });
                    $.each(results.terms, function(){
                        $('#auto-results').append('<li class="result" onclick="updateSearch(&quot;'+this['term']+'&quot;)">'+this['term']+'</li>');
                    });
                    $("#auto-results").css("display","block");
					$("#auto-results").css("margin-top","33px");
					$("#auto-results").css("z-index","10");
					$(".slide").css("overflow","visible"); 
                }    
            }
            else {
                var div = document.getElementById('auto-results');
                if (div != null) {
                    $("#auto-results").css("display","none");
                }
            }
        });
}
function updateSearch(term){
    term = term.trim();
    document.getElementById(searchboxid).value = term;
    if (searchOnClick == true) {
        $('#'+searchformid).submit();
    }
    if (searchOnClick == false) {autocomp(event);}
}
$('body').click(function(e){
       if( e.target.id == 'auto-results' )
          { return true; }
       else
          { $('#auto-results').hide(); }
 });