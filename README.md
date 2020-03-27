# HCIS - Health Care Information System

## Build and run development project

Follow these instructions for building and launching the project.
First, import project into IDE from Git. Then you have to create database:

* Start a MySQL server (I suggest using third party software, e.g. [XAMPP](https://www.apachefriends.org/de/index.html))
* Create MySQL database **HCIS**. 
Default URL is set to:

    >jdbc:mysql://localhost:3306/HCIS

    with:
    > Username= root                                                           
    Password=

You can change these settings according to your database in
    
   > ./application.properties

### Building and running backend: 
1. If project is not configured manually --> right click on pom.xml and choose
      
    >Import from maven
2. Run the main application

    >HCISApplication

Now the backend should be running and we can continue with running the frontend.

### Running frontend:

1. Move into frontend folder in the terminal by typing:

    >cd frontend

2. Run the frontend by typing:

    >npm start

Now the frontend should start. If browser does not open automatically, open your browser and visit

>http://localhost:3000/

You can now login as admin (needed for registering physicians) with following credentials:

>username: admin 
>
>password: admin

## Run deployment project
