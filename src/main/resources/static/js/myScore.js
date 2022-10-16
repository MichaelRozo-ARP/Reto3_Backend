$(document).ready(function (){
    getReservationList();
    getScore();
});
function getFrontScoreData(){
    let k={
        idScore:$("#idScore").val(),
        messageText:$("#messageText").val(),
        reservation:{
            idReservation:$("#reservationSelect").val()
        },
        stars:$("#stars").val()
    }
    return k;
}
function cleanFields(){
    $("#idScore").val("");
    $("#messageText").val("");
    $("#stars").val("");
    $("#reservationSelect").val("").change();
}
function getReservationList(){
    $.ajax({
        url : "api/Reservation/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#reservationSelect").empty();
            for(let i=0;i<p.length;i++){
                let s=`
                    <option value="${p[i].idReservation}">${p[i].idReservation}</option>                
                `;
                $("#reservationSelect").append(s);
            }
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function saveScore(){
    let data=getFrontScoreData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Score/save",
        type : 'POST',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getScore();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getScore(){
    $.ajax({
        url : "api/Score/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            let l="";
            for (let i=0;i<p.length;i++){
                l+=`<div class="col">
                        <div class="card"><div class="card-header">
                                    <h5 class="card-title">${p[i].stars}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">Mensaje: ${p[i].messageText}</p>
                                    <p class="card-text">Id Reservacion: ${p[i].reservation.idReservation}</p>
                                </div>
                                <div class="card-footer">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getScoreById(${p[i].idScore})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deleteScoreById(${p[i].idScore})'>Borrar!</button>
                                    </div>
                                
                                </div>
                        </div>
                    </div>
                    `;
            }
            $("#results").append(l);
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getScoreById(idScore){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Score/"+idScore,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idScore").val(p.idScore);
            $("#stars").val(p.stars);
            $("#messageText").val(p.messageText);
            $("#reservationSelect").val(p.reservation.idReservation).change();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function updateScore(){
    let data=getFrontScoreData();

    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Score/update",
        type : 'PUT',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getScore();
            $(".saveButtonJL").show();
            $(".updateButtonJL").hide();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function cancelUpdateScore(){
    cleanFields();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function deleteScoreById(idScore){
    $.ajax({
        url : "api/Score/"+idScore,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            getScore();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}