#GeorgeGks Blog

This is an experiment project. The goal behind it is to create a blog that will serve me in the upcoming years. However, the main goal is to familiarize myself with a brand new technologies and software design patterns like:

- ServerSide Javascript (NodeJs)
- Express.js and Pug Template Language
- Work-flow Automation with Gulp.js
- Better understanding of SCSS, the css preprocessor and it's design patterns
- Npm usage
- DRY, CRUD principles
- SoC *(Separation of concerns)*
- UI/UX design
- Understand testing procedure. *(node-jasmine testing suit is used)*
- Learning some basic database designing in Mysql. 
- Understanding SEO (RDFa/ microdata)
- Design Principles
- Wireframing (Adobe InDesign is used)
- Understanding Bootstrap framework


**Caution:** This project has not designed for publication. Although, you can run the project locally from npm. If you find any issues you can make a **PR** *(pull request)* or write a new issue. The Database schema is under `etc/mockups/db_schema/` path. To run the app you have to create a `config` folder under `app` directory with three files. 

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
    ADMIN: 'admin@email.com'
}
```

The `ADMIN` variable is used to indicate which author profile to use as the main admin of the blog. The email needs to be registered in the database. Feel free to update the `app.js` file as you like. 

Run the project with:

`export NODE_ENV=(mode) node app.js`

where ***mode*** either *production* or *development*.

Also check `etc/README.md` folder for more details.