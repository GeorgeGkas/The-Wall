# The Wall
### Personal Bloggin platform.

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

**Caution: This project was not designed for use outside my own enviroment.**

 However, you are able to run the project locally from npm. The Database schema is under `etc/mockups/db_schema/` path. To run the app you have to create a `config.js` file under `app/config` folder. The structure of the file is given bellow:

 ```js
export default {
  development: {
    app: {
      admin_email: '',
    },
    db: {
      host: '',
      user: '',
      password: '',
      database: '',
    },
    server: {
      port: '',
    }
  },
  testing: {
    app: {
      admin_email: '',
    },
    db: {
      host: '',
      user: '',
      password: '',
      database: '',
    },
    server: {
      port: '',
    }
  }
}
```

The `admin_email` property is used to indicate which author profile to use as the main admin of the blog. The email needs to be registered in the database. Feel free to update the `app.js` file as you like. 

Run the app with:

```
npm run serve
```
