# The Wall
####My personal Bloggin platform.
---

This is my personal blogging platform created **completely** from scratch. This happened, both because I didn't like any of the current available platforms on the market and because I wanted to create a unique blog to serve me in the upcoming years. 

Some of the technologies I used are listed bellow:

- Nginx web server (used as reversed proxy)
- Node.js (for server-side javascript)
- Express.js
- Pug Template Language (main template view system)
- Gulp.js (work-flow automation)
- Node-jasmine (js suit for testing)
- Mysql (main databse system)
- SEO optimizations
- Wireframing (Adobe InDesign was used)
- SCSS
- Bootstrap framework 

## Documentation

Documentation support was provided for the database models located under (`app/models/database`). Please refer to `etc/README.md` for more details.

---

**Caution: This project was not designed for publication.**

 However, you are able to run the project locally from npm. If you find any issues you can make a **PR** *(pull request)* or write a new issue. The Database schema is under `etc/mockups/db_schema/` path. To run the app you have to create a `config` folder under `app` directory with three files. 

- `dev.js` for developer mode
- `production.js` for production mode (basically the same as above but with different connection details and server path)
- `global.js` for global variables

The first two files has the bellow structure:

```javascript
module.exports = {
    MYSQL: {
        host: 'some_host',
        user: 'a_user',
        password: 'pass',
        database: 'db_name'
    },
    URL_PREFIX_PATH: '' // leave it blank if you don't integrate in a specific sub folder on a server
}
```

For `global.js` file:

```javascript
module.exports = {
    ADMIN: 'admin@email.com',
    PORT: /* some port eg. 8080 */
}
```

The `ADMIN` variable is used to indicate which author profile to use as the main admin of the blog. The email needs to be registered in the database. Feel free to update the `app.js` file as you like. 

Run the project with:

`export NODE_ENV=(mode) node app.js`

where ***mode*** either *production* or *development*.
