DROP PROCEDURE IF EXISTS savePost;

DELIMITER $$

CREATE PROCEDURE savePost(
    IN _title VARCHAR(255),
    IN _slug VARCHAR(255),
    IN _excerpt TEXT,
    IN _content TEXT,
    IN _codes TEXT,
    IN _tags VARCHAR(255),
    IN _author VARCHAR(50),
    IN _createdAt DATETIME,
    IN _day VARCHAR(2),
    IN _month VARCHAR(2),
    IN _year VARCHAR(2),
    IN _language VARCHAR(2),
    IN _activeComments INT,
    IN _estatus VARCHAR(25))
BEGIN
    DECLARE error VARCHAR(255);
    DECLARE success VARCHAR(255);

    IF (_title <> 'undefined' AND _title <> '') THEN
        IF (_slug <> 'undefined' AND _slug <> '') THEN
            IF (_excerpt <> 'undefined' AND _excerpt <> '') THEN
                IF (_content <> 'undefined' AND _content <> '') THEN
                    IF (SELECT EXISTS (SELECT 1 FROM blog WHERE slug = _slug AND day = _day AND month = _month AND year = _year)) THEN
                        SET error = 'exists:post';
                        SELECT error;
                    ELSE
                        INSERT INTO blog (
                            title,
                            slug,
                            excerpt,
                            content,
                            codes,
                            tags,
                            author,
                            createdAt,
                            day,
                            month,
                            year,
                            language,
                            activeComments,
                            estatus
                        ) VALUES (
                            _title,
                            _slug,
                            _excerpt,
                            _content,
                            _codes,
                            _tags,
                            _author,
                            _createdAt,
                            _day,
                            _month,
                            _year,
                            _language,
                            _activeComments,
                            _estatus
                        );

                        SET success = 'inserted:post';
                        SELECT success;
                    END IF;
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
