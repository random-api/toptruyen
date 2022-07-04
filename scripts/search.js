const axios = require("axios");
const cheerio = require("cheerio");
exports.name = '/toptruyen/search';
exports.index = async (req, res, next) => {
        var keyword = req.query.keyword;
        var page = req.query.page || 1
        if(!keyword) return res.json("Thiếu tên truyện cần tìm kiếm")
        var page = page || 1
        const _res = await axios.get(`https://toptruyen.net/tim-truyen?keyword=${encodeURIComponent(keyword)}&page=${page}`);
        const $ = cheerio.load(_res.data);
        var search = $('div[class="main-left search-cm-detail"]')
        .find('div[class="row"]')
        .find('.item-manga')
        var arr = [];
        for(let i = 0; i < search.length; i++){
            var name = $(search[i]).find('.item').find('.clearfix').find('.image-item').find("a").attr("title"),
            url = $(search[i]).find('.item').find('.clearfix').find('.image-item').find("a").attr("href"),
            image = $(search[i]).find('.item').find('.clearfix').find('.image-item').find("img").attr("data-original")
            arr.push({name : name, url: url, images : image})
        }
        res.json(arr)
    }