var FbApi = (()=>{
	let todo = [];

	return {
		todoGetter : () => {
			return todos;
		},
		setTodos : (newArray) =>{
			todos = newArray;
		},
		setSingleTodo: (newObject) => {
			todos.push(newObject);
		}
	};
})();