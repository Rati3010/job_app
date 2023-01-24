const express = require("express");
const { JobModel } = require("../model/job.model");
const jobRouter = express.Router();
jobRouter.get("/", async (req, res) => {
  const jobs = await JobModel.find();
  res.send(jobs);
});
jobRouter.post("/create", async (req, res) => {
  const payload = req.body;
  try {
    const job = new JobModel(payload);
    await job.save();
    res.send({ msg: "added successfully" });
  } catch (error) {
    console.log(error);
    res.send({ msg: "can't able to add" });
  }
});
jobRouter.patch("/edit/:jobid", async (req, res) => {
  const payload = req.body;
  const jobID = req.params.jobid;
  try {
    await JobModel.findByIdAndUpdate({ _id: jobID }, payload);
    res.send({ msg: "Job updated successfully" });
  } catch (error) {
    console.log(error);
    res.send("something went wrong");
  }
});
jobRouter.delete("/delete/:jobId", async (req, res) => {
  const jobID = req.params.jobId;
  try {
    await JobModel.findByIdAndDelete({ _id: jobID });
    res.send({ msg: "Job deleted successfully" });
  } catch (error) {
    res.send({ err: "Unable to delete" });
  }
});

module.exports = { jobRouter };
