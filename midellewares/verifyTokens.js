const jwt=require("jsonwebtoken");

// verify Token
function VerfiyToken(req,res,next){
    const token = req.headers.token;
    if(token){
        try {
            const decode= jwt.verify(token , process.env.JWT_SECRET_KEY);
            req.user=decode;
            next();

        } catch (error) {
            res.status(401).json({message:"invalied token"})
        }
    }else{
        res.status(401).json({message: "no Token provided"})
    }
};
// verify token & Authorize user

function VerifyTokenAndAuthorization(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user.id === req.params.id){
            next();
        }else{
            res.status(403).json({message:"you are not allwoed"});
          }
    });
}


// Verify to veiw products

function VerifyTokenView(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user.id){
            next();
        }else{
            res.status(403).json({message:"you are not allwoed , only admin can accses this"});
        }
    });
}

// verify token & Authorize user to delete order

function VerifyTokenAndDelete(req,res,next){
    VerfiyToken(req,res,()=>{
        if(req.user._id == req.params.id.user){
            next();
        }else{
            res.status(403).json({message:"you are not allwoed"});
          }
    });
}

module.exports={
    VerifyTokenAndAuthorization,
    VerifyTokenAndDelete,
    VerifyTokenView
};