function ajax(ajaxOptions) {
    var options = {
        type: ajaxOptions.type || 'POST', //jak nie podamy typu, to dostaniemy POST
        url: ajaxOptions.url || '', //jak nie bedzie url, to zwroci pusty string
        onError: ajaxOptions.onError || function () {},
        onSuccess: ajaxOptions.onSuccess || function () {},
        dataType: ajaxOptions.dataType || 'text'
    };

    function httpSuccess(httpRequest) {
        try {
            return (httpRequest.status >= 200 && httpRequest.status < 300 || httpRequest.status == 304 || navigator.userAgent.indexOf('Safari') >= 0 && typeof httpRequest.status == "undefined");
            //zwraca jesli warunek 1, 2 lub 3 sa prawda
        } catch (e) {
            return false;
        }
    }

    //urucomienie ajax:
    var httpReq = new XMLHttpRequest();

    //otwarcie połaczenia
    httpReq.open(options.type, options.url, true);

    // onreadystatechange odpalane za kazdym raziem, kiedy zostanie zmieniony stan dokumentu (httpReq.readystate), czyli odpala sie 5 razy (zobacz opis v w pdf). Musi byc sprawdzone podobnie readyState
    httpReq.onreadystatechange = function () {
        if (httpReq.readyState == 4) {
            //jesli dane sa w formacie xml, to zwraca xml, w przeciwnym razie tekst. Funkcja ponizej weryfikuje czy polaczenia nadal jest OK i zy sie nic nie wykrzaczylo po drodze. 
            if (httpSuccess(httpReq)) {
                // jesli 4: dane zwrocone i gotowe do uzycia, to potrzebuje funkcji httpSuccess
                var returnData = (options.dataType == 'xml') ? httpReq.responseXML : httpReq.responseText;

                options.onSuccess(returnData);
                //zeruj obiek aby nie utrzymywac niepotrzebnego polaczenia z serwerem
                httpReq = null;
            } else {
                // jezeli jest blad
                options.onError(httpReq.statusText);
            }
        }
    }


    httpReq.send();
}


$(document).ready(function () {
    $('button').click(function () {
        $.getJSON('https://akademia108.pl/kurs-front-end/ajax/1-pobierz-dane-programisty.php', function (data) {
            console.log(data);
        
        });
    });
});
