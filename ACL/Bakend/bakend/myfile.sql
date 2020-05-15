DROP TABLE IF EXISTS user ;
DROP TABLE IF EXISTS groupp	 ;
DROP TABLE IF EXISTS group_members ;
DROP TABLE IF EXISTS user_auth ;
DROP TABLE IF EXISTS group_auth ;
DROP TABLE IF EXISTS admin ;
DROP TABLE IF EXISTS files ;
DROP TABLE IF EXISTS logged_user ;
create table user(user_id int AUTO_INCREMENT primary key,user_name text , user_pass text );

create table admin(admin_id int AUTO_INCREMENT primary key,admin_name text,admin_pass text);

create table logged_user(user_id int primary key,user_type text);

create table groupp(group_id int AUTO_INCREMENT primary key,group_name text,group_password text);

create table files(fid int AUTO_INCREMENT primary key,isfolder int,fname text,fparent int ,foreign key(fparent) references files(fid));

create table group_members(group_id int,user_id int ,primary key(group_id,user_id) ,foreign key (user_id) references user(user_id),foreign key (group_id) references groupp(group_id) );

create table user_auth(user_id int , fid int ,fauth_r int ,fauth_w int,fauth_x int,primary key(user_id,fid),foreign key (user_id) references user(user_id),foreign key (fid) references files(fid));

create table group_auth(group_id int , fid int ,fauth_r int ,fauth_w int,fauth_x int,primary key(group_id,fid),foreign key (fid) references files(fid),foreign key (group_id) references groupp(group_id) );

