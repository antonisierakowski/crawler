#### Simple web crawler.  
To start crawling run the following commands in the project root:  
`cp .env.dist .env`  
`yarn`  
`yarn prod`  
If the crawler gets stuck, try changing initial url key in `.env` file and rerun.
#
In order to save your results in a database, you will need to create a PostgreSQL database and initialize a table:
```$xslt
CREATE TABLE websites.websites (
    id serial PRIMARY KEY,
    title TEXT NOT NULL,
    url TEXT unique NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT now()
);
```
Once that is done, just edit adequate keys in `.env` file and run the crawler with `yarn prod`.
