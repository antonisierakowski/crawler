#### Simple web crawler.  
To start crawling run the following commands in the project root:  
`cp .env.dist .env`  
`yarn`  
`yarn prod`  
If the crawler gets stuck, try changing initial url key in `.env` file and rerun.
#
In order to save your results in a database, you will need to edit adequate keys in `.env` file. The project is using MongoDB.
