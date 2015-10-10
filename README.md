# Waterlock Certificate Auth

thanks David Rivera for [waterlock-local-auth](https://github.com/waterlock/waterlock-local-auth)

waterlock-ceriticate-auth is a module for [waterlock](http://waterlock.ninja/)
providing a local authentication method for users either based on username or email.

## Usage

```bash
npm install waterlock-ceriticate-auth --save
```

set the following option in your `waterlock.js` config file

```js
authMethod:[
	{
		name: "waterlock-certificate-auth"
	}
]
```

## Auth Model
Local auth adds the following attributes onto the Auth model

```js
  fingerprint: {
    type: 'email',
    unique: false,
	required: false
  }
```
