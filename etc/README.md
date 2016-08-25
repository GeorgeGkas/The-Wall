##Folder contents:

- `mockups`: Contains the database schema.


##TODO

`TODO.txt` contains basic functionalities that needs to be added in the blog.

##Generating documents

The MYSQL module (under `app/models/database`) uses JSDoc syntax to generate documents on the methods used in the module, as well as, to illustrate simple examples. 

To generate the docs you have to use JSDoc v3.4.0 or greater. Inside the database folder type in terminal:

`jsdoc database -d (path_to_export_doc_folder) -r`