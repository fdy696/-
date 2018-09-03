    // 弹出层
    function pop(arg){
      if(!arg){
        console.error('pop title is required');
      }
      var conf = {},
          $box,
          $mask,
          $title,
          $content,
          $confirm,
          $cancel,
          dfd,
          timer,
          confirmed;

      dfd = $.Deferred();

      if(typeof arg == 'string'){
        conf.title = arg;
      }else{
        conf = $.extend(conf,arg);
      }

      $box = $('<div>'+
              '<div class="pop-title">'+ conf.title +'</div>'+
              '<div class="pop-content">'+
                '<div>'+
                  '<button style="margin-right:5px;" class="primary confirm">确定</button>'+
                  '<button class="cancel">取消</button>'+
                '</div>'+
              '</div>'+
              '</div>')
             .css({
               color:'#444',
               width:300,
               height:'auto',
               padding:'15px 10px',
               background: '#fff',
               position:'fixed',
               'border-radius':3,
               'box-shadow':'0 1px 2px rgba(0,0,0,.5)'
             });
      
      $title = $box.find('.pop-title').css({
        padding: '5px 10px',
        'font-weight':900,
        'font-size':20,
        'text-align':'center'
      }); 
      $content = $box.find('.pop-content').css({
        padding: '5px 10px',
        'text-align':'center'
      }); 
      $confirm =   $content.find('button.confirm');
      $cancel =   $content.find('button.cancel');

      $mask = $('<div></div>')
              .css({
                position:'fixed',
                background:'rgba(0,0,0,.5)',
                top:0,
                bottom:0,
                left:0,
                right:0
              });

      timer = setInterval(function(){
        if(confirmed !== undefined){
          dfd.resolve(confirmed);
          clearInterval(timer);
          dismiss_pop();
        }
      },50);

      $confirm.on('click',on_confirmed);

      $cancel.on('click',on_cancel);

      $mask.on('click',on_cancel);
      
      function on_cancel(){
        confirmed = false;
      }

      function on_confirmed(){
        confirmed = true;
      }

      function dismiss_pop(){
        $mask.remove();
        $box.remove();
      }
      
      function adjust_box_position() {
        var window_width = $window.width(),
            window_height = $window.height(),
            box_width = $box.width(),
            box_height = $box.height(),
            move_x,
            move_y;
        
        move_x = (window_width - box_width) / 2;
        move_y = (window_height - box_height) / 2 - 20;
        $box.css({
          left:move_x,
          top:move_y
        });
      }
      adjust_box_position();

      $window.on('resize',function(){
        adjust_box_position();
      });

      
      $body.append($mask);
      $body.append($box);
      $window.resize();
      return dfd.promise();
    }






    

    function listen_msg_event(){
      $msg_confirm.on('click',function(){
        hide_msg();
      });
    }
