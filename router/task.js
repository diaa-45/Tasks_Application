const express=require("express");
const router=express.Router();
const {VerifyTokenAndAuthorization,VerifyTokenAndDelete,VerifyTokenView}=require("../midellewares/verifyTokens")
const {
  create,
  deleteAll,
  deleteOne,
  getAll,
  getOne,
  update
}=require("../controller/Task")


router.post("/add", VerifyTokenView ,create );

router.put("/edit/:id", VerifyTokenAndDelete, update);

router.get("/getAll/:id",VerifyTokenAndAuthorization, getAll);

router.get("/getOne/:id",VerifyTokenAndDelete, getOne);

router.delete("/deleteOne/:id", VerifyTokenAndDelete, deleteOne);

router.delete("/deleteAll", VerifyTokenView, deleteAll);

module.exports=router;