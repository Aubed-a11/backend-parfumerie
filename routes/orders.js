const authAdmin = require("../middleware/authAdmin");

router.put("/:id/status", authAdmin, async (req, res) => {
  await Order.findByIdAndUpdate(req.params.id, {
    status: req.body.status
  });

  req.app.get("io").emit("updateOrders");
  res.sendStatus(200);
});
