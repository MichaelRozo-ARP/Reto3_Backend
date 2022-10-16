$(document).ready(function (){
    getCategoryList();
    getPartyroom();
});
function getFrontPartyroomData(){
    let k={
        id:$("#idPartyroom").val(),
        name:$("#namePartyroom").val(),
        capacity:$("#capacityPartyroom").val(),
        owner:$("#owner").val(),
        description:$("#descriptionPartyroom").val(),
        category:{
            id:$("#categorySelect").val()
        }
    }
    return k;
}
function cleanFields(){
    $("#idPartyroom").val("");
    $("#namePartyroom").val("");
    $("#capacityPartyroom").val("");
    $("#owner").val("");
    $("#descriptionPartyroom").val("");
    $("#categorySelect").val("").change();
}
function getCategoryList(){
    $.ajax({
        url : "api/Category/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#categorySelect").empty();
            for(let i=0;i<p.length;i++){
                let s=`
                    <option value="${p[i].id}">${p[i].name}</option>                
                `;
                $("#categorySelect").append(s);
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
function savePartyroom(){
    let data=getFrontPartyroomData();
    data.id=null;
    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Partyroom/save",
        type : 'POST',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getPartyroom();
            },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function getPartyroom(){
    $.ajax({
        url : "api/Partyroom/all",
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#results").empty();
            let l="";
            for (let i=0;i<p.length;i++){
                l+=`<div class="col">
                        <div class="card"><div class="card-header">
                                    <h5 class="card-title">${p[i].name}</h5>
                                </div>
                                <div class="card-body">
                                    <p class="card-text">${p[i].description}</p>
                                    <p class="card-text">Capacidad: ${p[i].capacity}</p>
                                    <p class="card-text">Propietario: ${p[i].owner}</p>
                                    <p class="card-text">Categoria: ${p[i].category.name}</p>
                                </div>
                                <div class="card-footer">
                                      <div class="btn-group" role="group">
                                        <button type="button" class="btn btn-outline-primary" onclick='getPartyroomById(${p[i].id})'>Actualizar</button>
                                        <button type="button" class="btn btn-outline-primary" onclick='deletePartyroomById(${p[i].id})'>Borrar!</button>
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
function getPartyroomById(idPartyroom){
    $(".saveButtonJL").hide();
    $(".updateButtonJL").show();
    $.ajax({
        url : "api/Partyroom/"+idPartyroom,
        type : 'GET',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            $("#idPartyroom").val(p.id);
            $("#namePartyroom").val(p.name);
            $("#capacityPartyroom").val(p.capacity);
            $("#owner").val(p.owner);
            $("#descriptionPartyroom").val(p.description);
            $("#categorySelect").val(p.category.id).change();
            },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });
}
function updatePartyroom(){
    let data=getFrontPartyroomData();

    let dataToSend=JSON.stringify(data);
    $.ajax({
        url : "api/Partyroom/update",
        type : 'PUT',
        dataType : 'json',
        contentType:'application/json',
        data:dataToSend,
        success : function(p) {
            console.log(p);
            cleanFields();
            getPartyroom();
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
function cancelUpdatePartyroom(){
    cleanFields();
    $(".saveButtonJL").show();
    $(".updateButtonJL").hide();
}
function deletePartyroomById(idPartyroom){
    $.ajax({
        url : "api/Partyroom/"+idPartyroom,
        type : 'DELETE',
        dataType : 'json',
        success : function(p) {
            console.log(p);
            getPartyroom();
        },
        error : function(xhr, status) {
            alert('ha sucedido un problema');
        },
        complete : function(xhr, status) {
            //  alert('Petición realizada');
        }
    });

}


