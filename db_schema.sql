use db_schema;
drop table if exists users;
create table users (
	id int not null auto_increment,
    email varchar(140) unique,
    firstname varchar(100),
    lastname varchar(100),
	user_password varchar(100),
    PRIMARY KEY (id)
    );
    
drop table if exists ratings;
create table ratings(
	id int not null auto_increment,
	movie_id int,
	user_id int,
	rating int,
	primary key (id),
	foreign key (user_id) references users (id)
)

