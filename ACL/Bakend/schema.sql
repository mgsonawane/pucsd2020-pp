DROP TABLE IF EXISTS user ;
DROP TABLE IF EXISTS groupp ;
DROP TABLE IF EXISTS group_members ;
DROP TABLE IF EXISTS user_auth ;
DROP TABLE IF EXISTS group_auth ;
DROP TABLE IF EXISTS admin ;

create table user(user_id int AUTO_INCREMENT primary key,
                  user_name text , 
                  user_pass text );

create table groupp(group_id int AUTO_INCREMENT primary key,
                    group_name text,
                    group_password text);

create table group_members(group_id int,
                           user_id int ,
                           primary key(group_id,user_id));

create table files(fid int AUTO_INCREMENT primary key,
                   fname text,fparent int ,
                   foreign key(fparent) references files(fid));

create table user_auth(user_id int , 
                       fid  int ,
                       fauth_r int ,
                       fauth_w int,
                       fauth_x int,
                       primary key(user_id,fid));
                       foreign key (user_id) references user(user_id),
                       foreignn key (files) references files(fid) 
                       );

create table group_auth(group_id int ,
                        fid int ,
                        fauth_r int ,
                        fauth_w int,
                        fauth_x int,
                        primary key(group_id,fid)
                       foreign key (group_id) references user(group_id),
                       foreignn key (files) references files(fid) 
                       );

create table admin(admin_id int AUTO_INCREMENT primary key,
                   admin_name text,
                   admin_pass text
                  );
