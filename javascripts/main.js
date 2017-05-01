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
		countTask();
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
		countTask();
	}).catch((error)=>{
		console.log("addTodo error", error);
	});
});

//delete todo

$(".main-container").on("click", ".delete", (event) => {
	FbApi.deleteTodo(event.target.id).then(() => {
		FbApi.writeDom();
		countTask();
	}).catch((error) => {
		console.log("error in deleteTodo", error);
	});
});

//edit todo

//complete todos
$('.main-container').on('click', 'input[type="checkbox"]', (e)=>{
	console.log("id", e.target.id);
	FbApi.checker(e.target.id).then(()=>{
		FbApi.writeDom();
		countTask();
	}).catch((error)=>{
		console.log("checker error", error);
	});
});



let countTask = () => {
	let remainingTasks = $('#incomplete-tasks li').length;
	$('#counter').hide().fadeIn(300).html(remainingTasks);
};

});
