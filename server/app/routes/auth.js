const controller = require('../controllers/auth')
const validate = require('../controllers/auth.validate')
const AuthController = require('../controllers/auth')
const express = require('express')
const router = express.Router()
require('../../config/passport')
const passport = require('passport')
const requireAuth = passport.authenticate('jwt', {
	session: false
})
const trimRequest = require('trim-request')
/**
* @swagger
{
	"/signIn": {
		"post":{
			"tags":[
				"Auth user"
			],
			"summary":"User Sign In",
			"description":"Normal user login",
			"operationId":"Login",			
			"requestBody":{
				"content":{
					"application/json":{
						"schema":{
							"$ref":"#/components/schemas/UserLogin",
						}
					}
				},
				"description":"Created user login params"
			},
			"responses": {
				"200": {
					"description": "Sign up successfully."
				},
				"400": {
					"description": "Invalid Parameters"
				},
				"401": {
					"description": "Unauthorize user, Wrong token, token mismatch."
				}
			},
		}
	},
	"components": {
		"schemas": {
			"UserLogin": {
			"properties": {
				"userEmail": {
					"value": "akp@test.com",
					"type": "string"
				},
				"userPassword": {
					"type": "string",
					"format": "password",
					"value": 123456
				}
			},
		},
		"required": [
			"userEmail",
			"userPassword"
		]
	}
}

}
	
*/

/**
* @swagger
{
	"/signUp": {
		"post": {
			"tags": ["User"],
			"name": "User Login",
			"summary": "User Login",
			"consumes": [
				"application/json"
			],
			"produces": [
				"application/json"
			],
			"parameters": [
				{
					"in": "body",
					"name": "body",
					"schema": {
						"$ref": "#/",
						"type": "object",
						"properties": {
							"name": {
								"value": "User name",
								"type": "string"
							},
							"email": {
								"value": "akp@dummy.com",
								"type": "string"
							},
							"password": {
								"type": "string",
								"format": "password",
								"value": 123456
							},
							"userDescription": {
								"value": "Description",
								"type": "string"
							},
							"userTitle": {
								"value": "Title",
								"type": "string"
							},							
							"userId": {
								"value": "user id",
								"type": "string"
							},
						}
					},
					"required": [
						"name",
						"email",
						"password",
						"userDescription",
						"userTitle",
						"userId"
					]
				}
			],
			"responses": {
				"200": {
					"description": "Sign up successfully."
				},
				"400": {
					"description": "Invalid Parameters"
				},
				"401": {
					"description": "Unauthorize user, Wrong token, token mismatch."
				}
			}
		}
	}
}
*/

/*
 * Register route
 */
router.post(
	'/signUp',
	trimRequest.all,
	validate.signUp,
	controller.signUp
)

/*
 * Login route
 */
router.post('/signIn', trimRequest.all, validate.userSignIn, controller.userSignin)
/*
 * Get new refresh token
 */
router.get(
	'/token',
	requireAuth,
	AuthController.roleAuthorization(['user', 'admin']),
	trimRequest.all,
	controller.getRefreshToken
)
/*
 * check test mail
 */
router.post(
	'/email',
	controller.sendMail
)
module.exports = router
