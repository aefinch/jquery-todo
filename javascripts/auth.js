var FbApi = ((cats) => {
	cats.registerUser = (credentials) => {
		return new Promise((resolve, reject) => {
			firebase.auth().createUserWithEmailAndPassword(credentials.email, credentials.password)
			.then((authData) => {
				resolve(authData);
			}).catch((error) => {
				console.log("error in submitting user data", error);
			});
		});
	};

	return cats;
})(FbApi || {});