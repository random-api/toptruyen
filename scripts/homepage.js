const axios = require("axios");
const cheerio = require("cheerio");
exports.name = '/';
exports.index = async (req, res, next) => {
        try{
        const _res = await axios.get("https://toptruyen.net/",{
            headers:{
                "authority": "toptruyen.net",
                "accept": `text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9`,
                "cookie": "_ga=GA1.1.2023847998.1655456326; __gads=ID=5e60cb854594bd53-2220a42a83d400ed:T=1655456349:RT=1655456349:S=ALNI_MbMaegZ2qy44Blqk8qjfAFjSV94_g; __gpi=UID=000006b698d358fe:T=1655456349:RT=1655701133:S=ALNI_Ma4bMSxF5a2zbwKHduZOcfMD9aGhQ; _ga_LXBHLRYQM0=GS1.1.1655709068.4.0.1655709068.0; XSRF-TOKEN=eyJpdiI6IlE2b1lhcmFPMWNQbHBmXC9ZVzlWVUtBPT0iLCJ2YWx1ZSI6IllhZVV3TGFuaE1WQjJRd2JsTnY0RGl4UzR4c3RKSTFtV0c4NEx4TmFmdnZXS3pTMWtuK3grK09scURPczBVbUMiLCJtYWMiOiI3NThhNjg1NTRmNzkwNjFiMjY1NDA1MWQ4MzM0MzFiZjMzOWFlYWZlNzY4NTdhYjJlYzE5MGE3NTcxOWVkYmMxIn0=; laravel_session=eyJpdiI6Ikl0M2VlYmtqQzNSRXFTZjZ0eU9QYkE9PSIsInZhbHVlIjoieWREclNsTW9jWmFRdFlvek1ZZm91OVRPYzgxMTRuZTNnM0pyeGtEc09hMnFXR0pOY2VENHBwajNLMVVSSWFlSyIsIm1hYyI6ImNjNmE4ODJkZmNkMTgwNzdhYzI0YmY0NjdjZmVkNjI1NzA4NzQ2NzI4NjMwNmYxOWEyYzgyODM4ZGMzNjI1NWEifQ==; __cf_bm=DVGmp44IXF8JN3L1AD2hzq_WbVcBF6.3i.etzMCDJL4-1655709065-0-AR+/Z/xnbAN/mdlrWLKuT4ib5Tb6jwa5wgxijjjNfrsH5mB9+gSnDqowMnxQVAmAnGfrYuI+Q4uxB5lh0s4/XegNe+HOjhVLGrYbyi+4pwHEs/rcij3Wv1v/7lpmOsz3Dg==",
                "user-agent": "Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Mobile Safari/537.36"
            }
        });
        const $ = cheerio.load(_res.data);
        const hot = $('div[class="slide-show"]')
        .find('div[class="slide slide-content open"]')
        .find('div[class="owl-carousel owl-theme"]')
        .find('div[class="slide-item"]')
        var arr = []
        for(let i = 0; i < hot.length; i++){
            var url = $(hot[i]).find("a").attr("href"),
            images = $(hot[i]).find("img").attr("data-src"),
            name = $(hot[i]).find("img").attr("alt")
            arr.push({name : name, url : url, images : images})
        }
        res.json(arr)
    } catch(e){
        console.log(e)
        res.json("Đã xảy ra lỗi")
    }
}