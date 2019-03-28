import React from 'react';

const About = () => {
	return (
		<div>
			<h1>About</h1>
			<p>
				Thanks for checking out Open Recipe Database. This is a completely open application, meaning that anyone
				can add, edit, or delete recipes. I know it is a recipe for disaster; pun intended! However, I built
				this application to easily showcase my skills. Check out the app on{' '}
				<a href="https://github.com/ARogala/open-recipe-db">GitHub</a> for technical details.
			</p><br/>
			<p>
				Anyway, I encourage you to add some of your favorite recipes and explore the application. For now this
				app is based on the honesty policy, so please DO NOT EDIT OR DELETE recipes you did not upload!! I will
				make database backups so all won’t be lost should someone decide to randomly delete a ton of recipes.
				The app is easy to use so click around and add some of your favorite recipes. Enjoy!!
			</p>
		</div>
	);
};

export default About;
