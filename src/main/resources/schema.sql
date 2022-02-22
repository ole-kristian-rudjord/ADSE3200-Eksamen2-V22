CREATE TABLE mice (
    id INT(4) AUTO_INCREMENT NOT NULL,
    brand VARCHAR(255) NOT NULL,
    name VARCHAR(255) NOT NULL,
    length DECIMAL(5,2),
    width DECIMAL(5,2),
    height DECIMAL(5,2),
    weight DECIMAL(5,2),
    wireless BIT,
    shape BIT,
    sensor VARCHAR(255),
    pollingRate INT(8),
    maxDPI INT(8),
    svgTop VARCHAR(max),
    svgSide VARCHAR(max),
    svgBack VARCHAR(max),
    PRIMARY KEY(id)
);