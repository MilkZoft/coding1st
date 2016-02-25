DROP PROCEDURE IF EXISTS savePost;

DELIMITER $$

CREATE PROCEDURE savePost(
    IN _title VARCHAR(255),
    IN _slug VARCHAR(255),
    IN _excerpt TEXT,
    IN _content TEXT,
    IN _codes TEXT,
    IN _tags VARCHAR(255),
    IN _createdAt DATETIME,
    IN _language VARCHAR(2),
    IN _estatus VARCHAR(25))
BEGIN
    DECLARE error VARCHAR(255);
    DECLARE success VARCHAR(255);

    IF (_title <> 'undefined' AND _title <> '') THEN
        IF (_slug <> 'undefined' AND _slug <> '') THEN
            IF (_excerpt <> 'undefined' AND _excerpt <> '') THEN
                IF (_content <> 'undefined' AND _content <> '') THEN
                    INSERT INTO blog (
                        title,
                        slug,
                        excerpt,
                        content,
                        codes,
                        tags,
                        createdAt,
                        language,
                        estatus
                    ) VALUES (
                        _title,
                        _slug,
                        _excerpt,
                        _content,
                        _codes,
                        _tags,
                        _createdAt,
                        _language,
                        _estatus
                    );

                    SET success = 'inserted:social:username';
                    SELECT success;
                ELSE
                    SET error = 'undefined:content';
                    SELECT error;
                END IF;
            ELSE
                SET error = 'undefined:excerpt';
                SELECT error;
            END IF;
        ELSE
            SET error = 'undefined:slug';
            SELECT error;
        END IF;
    ELSE
        SET error = 'undefined:title';
        SELECT error;
    END IF;
END $$

DELIMITER ;
