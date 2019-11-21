const fs = require('fs');
const properties = require('../config/properties');
const mysql = require('sync-mysql');
const mybatisMapper = require('mybatis-mapper');


const mysqlDbc = {
    init: function() {
        this.conn = new mysql(properties.dbConfig);

        const dir = 'mysql/sql/';
        const sqlList = fs.readdirSync(dir);
        for (var i = 0, xml; xml = sqlList[i]; i++) {
            sqlList[i] = dir + xml;
        }
        mybatisMapper.createMapper(sqlList);
    },
    query: function(namespace, queryId, param) {
        var format = { language: 'sql', indent: '  ' };
        var query = mybatisMapper.getStatement(namespace, queryId, param, format);
        return this.conn.query(query);
    }
};

module.exports = mysqlDbc;