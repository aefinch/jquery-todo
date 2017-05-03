$(document).ready(function(){
  let apiKeys;
  let editId = "";

	$('#new-item').click(() => {
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
	});

	$('#list-items').click(() => {
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

  $('#registerButton').click(() => {
    let email = $("#inputEmail").val();
    let password = $("#inputPassword").val();
    let username = $("#inputUsername").val();
    let user = {email, password};
    FbApi.registerUser(user).then((response) => {
      console.log("register response", response);
      let newUser = {
        uid: response.uid,
        username: username
      };
      FbApi.addUser(apiKeys, newUser).then((response) => {
        console.log("addUser", response);
      }).catch((error) => {
        console.log("error in addUser", error);
      });
    }).catch((error) => {
      console.log("error in registerUser", error);
    });
  });

  FbApi.firebaseCredentials().then((keys) => {
    apiKeys = keys;
    firebase.initializeApp(apiKeys);
    FbApi.writeDom(apiKeys);
  }).catch((error) => {
    console.log("key errors", error);
  });

  //add todo
  $('#add-todo-button').click(() => {
  	let newTodo = {
  		isCompleted: false,
  		task: $('#add-todo-text').val()
  	};
    if(editId.length > 0){
      //edit
      FbApi.editTodo(apiKeys, newTodo, editId).then(() => {
        $('#add-todo-text').val("");
        editId = "";
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });
    } else{
      FbApi.addTodo(apiKeys, newTodo).then(() => {
        $('#add-todo-text').val("");
        $('.new-container').addClass('hide');
        $('.list-container').removeClass('hide');
        FbApi.writeDom(apiKeys);
      }).catch((error) => {
        console.log("addTodo error", error);
      });      
    }
  });


  //delete todo
  $('.main-container').on('click', '.delete', (event) => {
    FbApi.deleteTodo(apiKeys, event.target.id).then(() => {
      FbApi.writeDom(apiKeys);
    }).catch((error) => {
      console.log("error in deleteTodo", error);
    });
  });


  //edit todo
  $('.main-container').on('click', '.edit', (event) => {
    let editText = $(event.target).closest('.col-xs-4').siblings('.col-xs-8').find('.task').html();
    editId = event.target.id;
    $('.list-container').addClass('hide');
    $('.new-container').removeClass('hide');
    $('#add-todo-text').val(editText);
  });




  //complete todos
  $('.main-container').on('click', 'input[type="checkbox"]', (event)=>{
  	let myTodo = {
  		isCompleted: event.target.checked,
  		task: $(event.target).siblings(".task").html()
  	};
  	FbApi.editTodo(apiKeys, myTodo, event.target.id).then(() =>{
  		FbApi.writeDom(apiKeys);
  	}).catch((error) => {
  		console.log("checker error", error);
  	});
  });











});