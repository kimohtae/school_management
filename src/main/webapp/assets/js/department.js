// department.js
$(function(){
    let modify_data_seq;
    $(".main_menu a:nth-child(2)").addClass("active")
    $("#add_department").click(function(){
        $(".popup_wrap").addClass("open");
        $("#add_dep").css("display","inline-block");
        $("#modify_dep").css("display","none");
        $(".popup .top_area > h2").html("학과 추가");
        $(".popup .top_area > p").html("학과 정보를 입력해주세요");
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
    $(".modify_btn").click(function(){
        
        $(".popup_wrap").addClass("open");
        $("#add_dep").css("display","none");
        $("#modify_dep").css("display","inline-block");
        $(".popup .top_area > h2").html("학과 수정");
        $(".popup .top_area > p").html("학과 정보를 수정해주세요");
        modify_data_seq=$(this).attr("data-seq")
        $.ajax({
            url:"/department/get?seq="+$(this).attr("data-seq"),
            type:"get",
            success:function(r){
                $("#dep_name").val(r.data.di_name);
                $("#dep_score").val(r.data.di_gratuate_score);
                $("#dep_status").val(r.data.di_status).prop("selected",true);
            }
        })
    })

    $("#modify_dep").click(function(){
        if(confirm("학과를 수정하시겠습니까?")==false) return;
        let dep_name = $("#dep_name").val();
        let dep_score = $("#dep_score").val();
        let dep_status = $("#dep_status").val();
        
        let data = {
            "di_seq": modify_data_seq,
            "di_name": dep_name,
            "di_gratuate_score": dep_score,
            "di_status": dep_status
        }
        
        $.ajax({
            type:"patch",
            url:"/department/update",
            data:JSON.stringify(data),
            contentType:"application/json",
            success:function(r){
                alert(r.message);
                if(r.status)
                    location.reload();
            }
        })
    })

    $("#search_btn").click(function(){
        location.href="/department?keyword="+$("#keyword").val();
    })
    $("#keyword").keydown(function(e){
        if(e.keyCode == 13){
            $("#search_btn").trigger("click");
        }
    })
})