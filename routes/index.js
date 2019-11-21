/* GET home page. */
module.exports = function(app) {
    const dateUtils = require('date-utils');
    const mysqlDbc = require('../mysql/mysqlConnector');

    function getTime() {
        return new Date().toFormat('YYYYMMDDHH24MISS');
    }
    app.get('/', function(req, res, next) {
        var recentDiary = mysqlDbc.query('diary', 'recentDiary');
        res.render('index', {
            title: 'MyDiary',
            recentDiary: recentDiary
        });
    });
    app.post('/diary_view', function(req, res) {
        var date = req.body.date;
        var selectDiary = mysqlDbc.query('diary', 'selectDiary', {
            date: date
        });
        if (!selectDiary || selectDiary.length != 1) {
            res.json({
                title: '',
                content: '',
                created_at: '',
                updated_at: ''
            })
        } else {
            res.json({
                title: selectDiary[0].title,
                content: selectDiary[0].content,
                created_at: selectDiary[0].created_at,
                updated_at: selectDiary[0].updated_at,
            })
        }
    });
    app.post('/diary', function(req, res) {

        var date = req.body.date;
        var title = req.body.title;
        var content = req.body.content;
        var recentDiary = mysqlDbc.query('diary', 'recentDiary');
        var selectDiary = mysqlDbc.query('diary', 'selectDiary', {
            date: date
        });
        getDate = getTime();
        if (!selectDiary || selectDiary.length != 1) {
            // 처음쓰는 경우 insert -> created_at updated_at같음
            mysqlDbc.query('diary', 'insertDiary', {
                date: date,
                title: title,
                content: content,
                created_at: getDate,
                updated_at: getDate
            });
            var selectDiary2 = mysqlDbc.query('diary', 'selectDiary', {
                date: date
            });
            res.json({
                result: 'success',
                created_at: selectDiary2[0].created_at,
                updated_at: selectDiary2[0].updated_at,
                recentDiary: recentDiary
            })

        } else {
            // 기존에 쓴 경우 update -> updated_at만 수정
            mysqlDbc.query('diary', 'updateDiary', {
                date: date,
                title: title,
                content: content,
                updated_at: getDate
            })
            var selectDiary2 = mysqlDbc.query('diary', 'selectDiary', {
                date: date
            });
            res.json({
                result: 'success',
                created_at: selectDiary2[0].created_at,
                updated_at: selectDiary2[0].updated_at,
                recentDiary: recentDiary
            })
        }
    });
}