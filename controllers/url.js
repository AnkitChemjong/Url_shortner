import shortid from "shortid";
import URL from '../models/url.js';
async function handleGenerateNewShortURL(req,res){

const body=req.body;
if(!body.url) return res.status(400).json({error:"url is required"})
const shortId=shortid();

URL.create({
    shortID:shortId,
    redirectURL:body.url,
    visitHistory:[],
    createdBy: req.user._id,
})
return res.render('home',{id:shortId})
}

async function handleGetAnalytics(req, res) {
    const id=req.params.shortId;
    const result=await URL.findOne({shortID:id});
    return res.json({totalClicks:result.visitHistory.length,
    analytics:result.visitHistory})


}

async function handleUpdate(req,res){
    const id=req.params.shortId
        const entry=await URL.findOneAndUpdate({shortID:id},
            {
               $push:{visitHistory:{

                   timestamp:Date.now()}
               }
            })
            if (!entry) {
                return res.status(404).json({ error: "URL not found" });
            }
            else{

                return res.redirect(entry.redirectURL);
            }
}

export {handleGenerateNewShortURL,handleUpdate,handleGetAnalytics}


