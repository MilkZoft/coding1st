DROP PROCEDURE IF EXISTS getUserPrivilege;

DELIMITER $$

CREATE PROCEDURE getUserPrivilege(
    IN _network VARCHAR(25),   # twitter, facebook or website
    IN _networkId VARCHAR(25), # networkId just for facebook or twitter
    IN _username VARCHAR(20),  # username
    IN _password VARCHAR(40))  # password is optional
BEGIN
    # If the user has logged in through the website
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
