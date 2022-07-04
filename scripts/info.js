const axios = require("axios");
const cheerio = require("cheerio");
exports.name = '/info';
exports.index = async (req, res, next) => {
        try {
            var { url } = req.query;
            if(!url) return res.json({error : "Thiếu link truyện!"})
            const _res = await axios.get(url);
            const $ = cheerio.load(_res.data);
            const title = $('#comic-detail').find(".title-manga").text();
            var arr = [], category = [];
            const $category = $('.info-detail-comic').find('li[class="category row"]').find('.col-sm-8').find("a");
            for(let i = 0; i < $category.length; i++){
                var theloai = $($category[i]).text();
                category.push(theloai)
            }
            var descriptions = $('.detail-summary').text().replace("\n", "").trim();
            var chapter = $('div[class="list-chapter"] > nav > ul > li');
            for(let i = 0; i < chapter.length; i++){
                var list = $(chapter[i]).find('div[class="col-sm-6 col-5 chapters"]').find("a").attr("href");
                arr.push(list)
            }
            res.json({name : title, category : category, descriptions : descriptions, chapter : arr.reverse()})
            }catch(e){
                console.log(e)
            }
}