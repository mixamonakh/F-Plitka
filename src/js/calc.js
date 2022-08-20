$(document).ready(function(){
    var square=1; 
    serv=0, check=0, kyp = '7778', skidka = 0;

    $('input.square').on('keyup keypress', function(e) {
        var letters=' 1234567890';
        return (letters.indexOf(String.fromCharCode(e.which))!=-1);
    });

    $('input.square').on('input keyup', function(e) {
        square = 1;
        $('input.square').each(function(){
            num = Number($(this).val());
            if(num == 0){
                num = 1;
            }
            square = Number(square) * num;
        });
        summ();
    });

    $("#serv").change(function(){
        serv = $('#serv').val();
        summ();
    });

    $('input.kypon').on('input keyup', function(e) {   
        key = $('input.kypon').val();
            if(key == kyp){
                skidka = 10;
            }else{
                skidka = 0;
            }
        summ();
    });

    function summ(){
        square = Number(square);
        serv = Number(serv);
        skidka = Number(skidka);
        $("#summ").text(serv*square - (skidka / 100 * (serv*square))+ ' руб.' );
    };
});