sitebuild
=====


db init:
1: mongodb
> show dbs
> use sitebuild
> db.addUser('root','123789');


2, mysql, account db init:
create database sitebuild;

CREATE TABLE `account` (
  `uuid` varchar(64) NOT NULL,
  `name` varchar(64) NOT NULL,
  `email` varchar(32) NOT NULL,
  `password` varchar(64) NOT NULL,
  `salt` varchar(32) NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

first project