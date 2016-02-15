DROP PROCEDURE IF EXISTS getPrivilege;

DELIMITER $$

CREATE PROCEDURE getPrivilege(
    IN _network VARCHAR(25),
    IN _networkId VARCHAR(25),
    IN _username VARCHAR(20),
    IN _password VARCHAR(40))
BEGIN
    IF _network = 'website' THEN
        SELECT privilege FROM users
        WHERE username = _username
            AND password = _password
            AND estatus = 'active';
    ELSE
        SELECT privilege FROM users
        WHERE username = _username
            AND networkId = _networkId
            AND network = _network
            AND estatus = 'active';
    END IF;
END $$

DELIMITER ;
