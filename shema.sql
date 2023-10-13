drop table if exists NAMES1980;
drop table if exists NAMES1990;
drop table if exists NAMES2000;
drop table if exists NAMES2010;

CREATE TABLE NAMES1980 (
    NameRank INT,
    MaleName VARCHAR(255),
	MalePer DECIMAL,
    MaleCount DECIMAL,
    FemaleName VARCHAR(255),
    FemaleCount DECIMAL,
	FemalePer DECIMAL
);

CREATE TABLE NAMES1990 (
    NameRank INT,
    MaleName VARCHAR(255),
	MalePer DECIMAL,
    MaleCount DECIMAL,
    FemaleName VARCHAR(255),
    FemaleCount DECIMAL,
	FemalePer DECIMAL
);

CREATE TABLE NAMES2000 (
    NameRank INT,
    MaleName VARCHAR(255),
	MalePer DECIMAL,
    MaleCount DECIMAL,
    FemaleName VARCHAR(255),
    FemaleCount DECIMAL,
	FemalePer DECIMAL
);

CREATE TABLE NAMES2010 (
    NameRank INT,
    MaleName VARCHAR(255),
	MalePer DECIMAL,
    MaleCount DECIMAL,
    FemaleName VARCHAR(255),
    FemaleCount DECIMAL,
	FemalePer DECIMAL
);

CREATE TABLE NAMES2020 (
    NameRank INT,
    MaleName VARCHAR(255),
	MalePer DECIMAL,
    MaleCount DECIMAL,
    FemaleName VARCHAR(255),
    FemaleCount DECIMAL,
	FemalePer DECIMAL
);

Select * from NAMES1980;