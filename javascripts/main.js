$(document).ready(function(){
	$('#new-item').click(()=>{
		$('.list-container').addClass('hide');
		$('.new-container').removeClass('hide');
		$('input').focus().val("");
	});
	$('#list-items').click(()=>{
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
	});

	FbApi.getTodos().then(()=>{
		FbApi.writeDom();
	})
	.catch((error)=>{
		console.log("getTodos Error", error);
	});

//add todo
$('#add-todo-button').click(()=>{
	let newTodo = {
		isCompleted: false,
		task: $('#add-todo-text').val()
	};
	// console.log(newTodo);
	FbApi.addTodo(newTodo).then(()=>{
		$('.new-container').addClass('hide');
		$('.list-container').removeClass('hide');
		FbApi.writeDom();
	}).catch((error)=>{
		console.log("addTodo error", error);
	});
});

//delete todo

//edit todo

//complete todos

});
