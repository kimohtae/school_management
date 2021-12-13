// department.js
$(function(){
    $(".main_menu a:nth-child(2)").addClass("active")
    $("#add_department").click(function(){
        $(".popup_wrap").addClass("open");
    })
    $("#add_dep").click(function(){
        if(confirm("학과를 등록하시겠습니까?")==false) return;
        let dep_name = $("#dep_name").val();
        let dep_score = $("#dep_score").val();
        let dep_status = $("#dep_status").val();

        let data = {
            "di_name": dep_name,
            "di_gratuate_score": dep_score,
            "di_status": dep_status
        }
        console.log(JSON.stringify(data))
        $.ajax({
            type:"post",
            url:"/department/add",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(r){
                alert(r.message);
                if(r.status)
                    location.reload();
            }
        })
        
    })
    $("#cancel_dep").click(function(){
        if(confirm("취소하시겠습니까?\n(입력된 정보는 저장되지 않습니다.)")==false)return;

        $("#dep_name").val("");
        $("#dep_score").val("");
        $("#dep_status").val("1").prop("selected",true);

        $(".popup_wrap").removeClass("open");
    })
    
    $(".delete_btn").click(function(){
        if(confirm("정말 삭제하시겠습니까?")==false)return;
        let seq = $(this).attr("data-seq");
        $.ajax({
            url:"/department/delete?seq="+seq,
            type:"delete",
            success:function(r){
                alert(r.message);
                if(r.status)
                    location.reload();
            }
        })
    })
})