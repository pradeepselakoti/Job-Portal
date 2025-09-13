const Job = require("../models/Job");
const User = require("../models/User");
const Application = require("../models/Application");
const SavedJob = require("../models/SavedJob");

exports.createJob = async (req, res) => {
  try {
    if (req.user.role !== "employer") {
      return res.status(403).json({ message: "Only employers can post jobs" });
    }
    const job = await Job.create({ ...req.body, company: req.user._id });
    res.status(201).json(job);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobs = async (req, res) => {
  const { keyword, location, category, type, minSalary, maxSalary, userId } =
    req.query;

  const query = {
    isClosed: false,
    ...(keyword && { title: { $regex: keyword, $options: "i" } }),
    ...(location && { location: { $regex: location, $options: "i" } }),
    ...(category && { category }),
    ...(type && {type }),
  };

    if(minSalary || maxSalary){
        query.$and =[];

        if(minSalary){
            query.$and.push({salaryMax :{$gte: Number(minSalary) } });

        }

        if(maxSalary){
            query.$and.push({ salaryMin: {$lte: Number(maxSalary)}});
        }

        if( query.$and.length === 0){
            delete query.$and;
        }

    }
  
  try {
    const jobs = await Job.find(query).populate(
        "company",
        "name companyName companyLogo"
    );

    let savedJobIds = [];
    let appliedJobStatusMap = {};

    if(userId){
        const savedJobs = await SavedJob.find({ jobseeker: userId }).select("job");
        savedJobIds = savedJobs.map((s)=> String(s.job));

        const applications = await Application.find({ applicant: userId}).select("job status");
        applications.forEach((app)=>{
            appliedJobStatusMap[String(app.job)] = app.status;
        });
    }
    const jobWithExtras = jobs.map((job)=>{
        const jobIdStr = String(job._id);
        return {
            ...job.toObject(),
            isSaved: savedJobIds.includes(jobIdStr),
            applicationStatus: appliedJobStatusMap[jobIdStr] || null,
        };
    });
    res.json(jobWithExtras);
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobsEmployer = async (req, res) => {
  try {
    const userId = req.user._id;
    const {role} = req.user;

    if(role!== "employer"){
      return res.status(403).json({message: "Access denied"});
    }

    const jobs = await Job.find({ company: userId })
    .populate("company", "name companyName companyLogo")
    .lean();

    const jobsWithApplicationCounts = await Promise.all(
      jobs.map(async (job) =>{
        const applicationCount = await Application.countDocuments({
          job: job._id,
        });
        return {
          ...job,
          applicationCount,
        };
      })
    );

    res.json(jobsWithApplicationCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getJobById = async (req, res) => {
  try {
    const {userId} = req.query;

    const job = await Job.findById(req.params.id).populate(
      "company",
      "name companyName companyLogo"
    );

    if(!job){
      return res.status(404).json({ message: "Job not found" });
    }

    let applicationStatus = null;

    if(userId){
      const application = await Application.findOne({
        job:job._id,
        applicant:userId,
      }).select("status");

      if(application){
        applicationStatus = application.status;
      }
    }
    res.json({
      ...job.toObject(),
      applicationStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return  res.status(404).json({ message: "Job not found "});

    if(job.company.toString() !== req.user._id.toString()){
      return res
        .status(403)
        .json({ message: "Not authorized to update this job "});
    }

    Object.assign(job, req.body);
    const updated = await job.save();
    res.json(updated);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({ message: "Job not found"});

    if(job.company.toString() !== req.user._id.toString()){
      return res
        .status(403)
        .json({ message: "Not authorized to delete this job"});
    }
    await job.deleteOne();
    res.json({ message: "Job deleted Successfully"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.toggleCloseJob = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id);
    if(!job) return res.status(404).json({ message: "Job not found "});

    if(job.company.toString()!== req.user._id.toString()){
      return res.status(403)
         .json({message: "Not authorized to close the job"});
    }

    job.isClosed = !job.isClosed;
    await job.save();

    res.json( {message: "job marked as closed"});
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};