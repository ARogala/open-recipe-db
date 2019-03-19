const assert = require('assert');
const request = require('supertest');
const mongoose = require('mongoose');
const app = require('../../app');
const Recipe = require('../../models/recipe');
//supertest lets us make fake http requests to our app
//(simulates requests to express app for testing)
describe('recipe controller', () => {
	it('POST to /api/recipe creates a new recipe', done => {
		Recipe.estimatedDocumentCount().then(count => {
			request(app)
				.post('/api/recipe')
				.send({
					name: 'Slow Cooker Chilly',
					category: 'Slow Cooker',
					subCategory: 'Chilly',
					starRating: 4,
					contributor: 'Andrew',
					date: '3/18/19',
					difficulty: 'easy',
					prepTime: '20min',
					cookTime: '7hrs',
					totalTime: '7hrs 20min',
					ingredients: ['1lb beef', '1 can kidney beans', '1 tsp chilly powder'],
					instructions: 'Dump all cook low 7hrs',
					notes: 'yumm its good get some beer too!'
				})
				.end(() => {
					Recipe.estimatedDocumentCount().then(newCount => {
						assert(count + 1 === newCount);
						done();
					});
				});
		});
	});

	it('PUT to /api/recipe/id edits an existing recipe', done => {
		const recipe = new Recipe({
			name: 'Slow Cooker Chilly',
			category: 'Slow Cooker',
			subCategory: 'Chilly',
			starRating: 4,
			contributor: 'Andrew',
			date: '3/18/19',
			difficulty: 'easy',
			prepTime: '20min',
			cookTime: '7hrs',
			totalTime: '7hrs 20min',
			ingredients: ['1lb beef', '1 can kidney beans', '1 tsp chilly powder'],
			instructions: 'Dump all cook low 7hrs',
			notes: 'yumm its good get some beer too!'
		});

		recipe.save().then(() => {
			request(app)
				.put(`/api/recipe/${recipe._id}`)
				.send({ name: 'Big Belly Slow Cooker Chilly' })
				.end(() => {
					Recipe.findById({ _id: recipe._id }).then(recipe => {
						assert(recipe.name === 'Big Belly Slow Cooker Chilly');
						done();
					});
				});
		});
	});

	it('DELETE to /api/recipe/id deletes a recipe', done => {
		const recipe = new Recipe({
			name: 'Slow Cooker Chilly',
			category: 'Slow Cooker',
			subCategory: 'Chilly',
			starRating: 4,
			contributor: 'Andrew',
			date: '3/18/19',
			difficulty: 'easy',
			prepTime: '20min',
			cookTime: '7hrs',
			totalTime: '7hrs 20min',
			ingredients: ['1lb beef', '1 can kidney beans', '1 tsp chilly powder'],
			instructions: 'Dump all cook low 7hrs',
			notes: 'yumm its good get some beer too!'
		});

		recipe.save().then(() => {
			request(app)
				.delete(`/api/recipe/${recipe._id}`)
				.end(() => {
					Recipe.findById({ _id: recipe._id }).then(recipe => {
						assert(recipe === null);
						done();
					});
				});
		});
	});
});
