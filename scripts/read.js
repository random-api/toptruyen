const axios = require("axios");
const cheerio = require("cheerio");
exports.name = '/read';
exports.index = async (req, res, next) => {
            var { url } = req.query;
            if(!url) return res.json({error : "Thiếu link truyện!"})
            try{
                const _res = await axios.get(url);
                const $ = cheerio.load(_res.data);
                const list = $('.list-image-detail').find('div[class="page-chapter"]')
                var arr = [];
                for(let i = 0; i < list.length; i++){
                    var results = $(list[i]).find("img").attr("src");
                    arr.push(results)
                }
                res.json(arr)
            }catch(e){
                res.json(e)
        }
    }