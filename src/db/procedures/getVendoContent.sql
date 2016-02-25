DROP PROCEDURE IF EXISTS getVendoContent;

DELIMITER $$

CREATE PROCEDURE getVendoContent(
    IN _language VARCHAR(2))
BEGIN
    SELECT keyName, keyValue FROM vendomatic
        WHERE language = _language
        ORDER BY keyName;
END $$

DELIMITER ;
