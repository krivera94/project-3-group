SELECT
    n2020.NameRank,
    n2020.MaleName AS MaleName2020,
    n2020.MalePer AS MalePer2020,
    n2020.MaleCount AS MaleCount2020,
    n2020.FemaleName AS FemaleName2020,
    n2020.FemaleCount AS FemaleCount2020,
    n2020.FemalePer AS FemalePer2020,
    
    n2010.MaleName AS MaleName2010,
    n2010.MalePer AS MalePer2010,
    n2010.MaleCount AS MaleCount2010,
    n2010.FemaleName AS FemaleName2010,
    n2010.FemaleCount AS FemaleCount2010,
    n2010.FemalePer AS FemalePer2010,
    
    n2000.MaleName AS MaleName2000,
    n2000.MalePer AS MalePer2000,
    n2000.MaleCount AS MaleCount2000,
    n2000.FemaleName AS FemaleName2000,
    n2000.FemaleCount AS FemaleCount2000,
    n2000.FemalePer AS FemalePer2000,
    
    n1990.MaleName AS MaleName1990,
    n1990.MalePer AS MalePer1990,
    n1990.MaleCount AS MaleCount1990,
    n1990.FemaleName AS FemaleName1990,
    n1990.FemaleCount AS FemaleCount1990,
    n1990.FemalePer AS FemalePer1990,
    
    n1980.MaleName AS MaleName1980,
    n1980.MalePer AS MalePer1980,
    n1980.MaleCount AS MaleCount1980,
    n1980.FemaleName AS FemaleName1980,
    n1980.FemaleCount AS FemaleCount1980,
    n1980.FemalePer AS FemalePer1980

FROM
    NAMES2020 n2020
JOIN NAMES2010 n2010 ON n2020.NameRank = n2010.NameRank
JOIN NAMES2000 n2000 ON n2010.NameRank = n2000.NameRank
JOIN NAMES1990 n1990 ON n2000.NameRank = n1990.NameRank
JOIN NAMES1980 n1980 ON n1990.NameRank = n1980.NameRank;