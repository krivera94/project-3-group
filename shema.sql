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

-- Create a new table from the query result
CREATE TABLE CombinedNames AS 
SELECT
    NAMES2020.NameRank,
    NAMES2020.MaleName AS MaleName2020,
    NAMES2020.MalePer AS MalePer2020,
    NAMES2020.MaleCount AS MaleCount2020,
    NAMES2020.FemaleName AS FemaleName2020,
    NAMES2020.FemaleCount AS FemaleCount2020,
    NAMES2020.FemalePer AS FemalePer2020,
    
    NAMES2010.MaleName AS MaleName2010,
    NAMES2010.MalePer AS MalePer2010,
    NAMES2010.MaleCount AS MaleCount2010,
    NAMES2010.FemaleName AS FemaleName2010,
    NAMES2010.FemaleCount AS FemaleCount2010,
    NAMES2010.FemalePer AS FemalePer2010,
    
    NAMES2000.MaleName AS MaleName2000,
    NAMES2000.MalePer AS MalePer2000,
    NAMES2000.MaleCount AS MaleCount2000,
    NAMES2000.FemaleName AS FemaleName2000,
    NAMES2000.FemaleCount AS FemaleCount2000,
    NAMES2000.FemalePer AS FemalePer2000,
    
    NAMES1990.MaleName AS MaleName1990,
    NAMES1990.MalePer AS MalePer1990,
    NAMES1990.MaleCount AS MaleCount1990,
    NAMES1990.FemaleName AS FemaleName1990,
    NAMES1990.FemaleCount AS FemaleCount1990,
    NAMES1990.FemalePer AS FemalePer1990,
    
    NAMES1980.MaleName AS MaleName1980,
    NAMES1980.MalePer AS MalePer1980,
    NAMES1980.MaleCount AS MaleCount1980,
    NAMES1980.FemaleName AS FemaleName1980,
    NAMES1980.FemaleCount AS FemaleCount1980,
    NAMES1980.FemalePer AS FemalePer1980
FROM
    NAMES2020
JOIN NAMES2010 ON NAMES2020.NameRank = NAMES2010.NameRank
JOIN NAMES2000 ON NAMES2010.NameRank = NAMES2000.NameRank
JOIN NAMES1990 ON NAMES2000.NameRank = NAMES1990.NameRank
JOIN NAMES1980 ON NAMES1990.NameRank = NAMES1980.NameRank;

