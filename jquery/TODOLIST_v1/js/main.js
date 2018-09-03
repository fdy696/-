~function(){
  
var $body = $('body'),
$form_add_task = $("form.add"),
$task_list = $(".task-list");

$delete = "",
$detail = "",
$checkbox = "",
$task_detail = $(".task-detail"),
$task_detail_mask = $(".task-detail-mask"),
$task_detail_title = $(".task-detail h2"),
$desc = $task_detail.find("[name='desc']"),
$remain_date = $task_detail.find("[name='remain-date']"),
$change_title = $(".change-title");


new_task = {},
task_list = [];
;

render()
// 绑定事件监听程序
document.body.onclick = function(e){
    $task_detail_mask.hide();
    $task_detail.hide();
}

$task_detail.on("click",function(e){
  e.stopPropagation();
  return;
})


$form_add_task.on("submit",function(e){
e.preventDefault();
add_task();
render()
})

$(".delete-all").on('click',function(e){
e.preventDefault();
store.clear();
render()
})

$task_detail.on("submit",function(e){
  e.preventDefault();
  $this = $(this);
  var desc = $desc.val();
  var remain_date = $remain_date.val();
  var index = $this.attr("detail-index");
  var value = $change_title.val();
  var item = $(".item-content")[index];

  $(item).html(value);
  // item.html(value);

  task_list[index].content = value;
  task_list[index].desc=desc;
  task_list[index].remain_date = remain_date;
  store.set('task_list',task_list);
  $change_title.hide();
  $task_detail_title.show();
  $task_detail_mask.hide();
  $task_detail.hide();
})

$task_detail_title.on("dblclick",function(e){
  e.preventDefault();
  var index = $(this).parent().attr("detail-index");
  var value = task_list[index].content;
  $(this).val(value);
  $(this).hide();
  $change_title.show();
})

function listen_checkbox_complete() {
  $checkbox = $(".task-list input[type='checkbox']");
  $checkbox.on("click",function(){
    $this = $(this);
    var index = $this.parent().attr("index");
    var isCompleted = $this.is(":checked");
    if(isCompleted){
      $this.parent().addClass("complete");
      $task_list.append($this.parent());
    }else{
      $this.parent().removeClass("complete");
      $task_list.append($this.parent());
    }
    task_list[index].isCompleted = isCompleted;
    task_list[task_list.length] = task_list[index];
    task_list.splice(index,1);
    store.set("task_list",task_list);
   
  })

}



     


function listen_detail(){
  $detail = $(".detail")
  $detail.on("click",function(e){
    e.preventDefault();
    e.stopPropagation();
    var index =  $(this).next().attr("data-index");
    $task_detail.attr("detail-index",index);
    $task_detail_title.html(task_list[index].content);
    $desc.val(task_list[index].desc);
    $remain_date.val(task_list[index].remain_date);
    $task_detail_mask.show()
    $task_detail.show();
  })
}

function listen_delete(){
  $delete = $("span.delete");
  $delete.on("click",function(e){
    let index = $(this).attr("data-index");
    e.preventDefault();
    my_alert("您确定要删除嘛？").then(isConfirmd=>{
      console.log("isConfirmed"+isConfirmd)
      if(isConfirmd){
        $(this).parent().remove();
        refresh_data(index);
        render();
      }
    }) 
  });
}

// 初始化:获取loaclStorage中的数据，并更新本地数据；
function init(){
task_list = store.get("task_list")||[];

}


// 增加数据，并添加到localStorage;
function add_task(){
new_task.content = $(".add input[type='text']").val();
$(".add input[type='text']").val("");
if(new_task.content.trim().length>0){
task_list.push(new_task);
store.set('task_list',task_list);
}
}

function refresh_data(index) {
  task_list.splice(index,1);
  store.set('task_list',task_list);
}
// 渲染
function render(){
// $task_list.innerHTML = "";
$task_list.html("");
init();
task_list.forEach((item,index)=>{
if(!item){
  task_list.splice(index,1);
  return 
};
var liEle = document.createElement("li");
liEle.className = "task-item";
if(item.isCompleted===true){
  liEle.className = "task-item complete";
}
liEle.setAttribute("index",index);
liEle.innerHTML = `<input type="checkbox" name="checkbox-complete" id="">
<span class="item-content">${item.content}</span><span class="detail">详情</span><span class="delete" data-index=${index}>删除</span>`;
$task_list.append(liEle)
}) 
listen_detail()
listen_delete();
listen_checkbox_complete()
}

}()
