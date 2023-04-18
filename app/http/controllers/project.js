const { ProjectModel } = require("../../models/project");

class ProjectController{
    async createProject(req, res, next) {
        try {
            const { title, text, image, tags } = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({title, text, owner, image, tags });
            if (!result) throw {status: 400, message: 'Project not created.'};
            return res.status(201).json({
                status: 201,
                success: true,
                message: 'Project created successfully.',

            });
        } catch (error) {
            next(error);
        }
    }
    async getAllProject(req, res, next) {
        try {
            const owner = req.user._id;
            const myProjects = await ProjectModel.find({owner});
            if (!myProjects) throw {status: 404, message: 'Projects not found.'}; 
            myProjects.forEach(key => {
                key.image = req.protocol + '://' + req.get('host') + (key.image).replace(/\\/g, '/').replace('public', '');
            });
            return res.status(200).json({
                status: 200,
                success: true,
                myProjects
            });
        } catch (error) {
            next(error);
        }
    }
    async getAllProjectById(req, res, next) {
        try {
            const owner = req.user._id;
            const myProject = await ProjectModel.findById({owner, _id: req.params.id});
            if (!myProject) throw {status: 404, message: 'Project not found.'};
            myProject.image = req.protocol + '://' + req.get('host') + (myProject.image).replace(/\\/g, '/').replace('public', '');
            return res.status(200).json({
                status: 200,
                success: true,
                myProject
            });

        } catch (error) {
            next(error);
        }
    }
    async removeProject(req, res, next) {
        try {
            const owner = req.user._id;
            const result = await ProjectModel.deleteOne({owner, _id: req.params.id});
            if (!result) throw {status: 400, message: 'Project not deleted.'};
            return res.status(200).json({
                status: 200,
                success: true,
                message: 'Project deleted successfully.'
            });
        } catch (error) {
            next(error);
        }
    }
    async updateProject(req, res, next) {
        try {
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await ProjectModel.findOne({owner, _id : projectID});
            if(!project) throw {status : 404, message : "Project not found"}
            const data = {...req.body};
            Object.entries(data).forEach(([key, value]) => {
            if(!["title", "text", "tags"].includes(key)) delete data[key];
            if([""," ", 0, null, undefined, NaN].includes(value)) delete data[key]
            if(key == "tags" && (data['tags'].constructor === Array)){
                data["tags"] = data["tags"].filter(val => {
                    if(![""," ", 0, null, undefined, NaN].includes(val)) return val
                })
                if(data['tags'].length == 0) delete data['tags']
                }
            })
            const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : data})
            if(updateResult.modifiedCount == 0) throw {status : 400, message : "Update failed"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "Update successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    async updateProjectImage(req, res, next) {
        try {
            const {image} = req.body;
            const owner = req.user._id;
            const projectID = req.params.id;
            const project = await ProjectModel.findOne({owner, _id : projectID});
            if(!project) throw {status : 404, message : "Project not found"}
            const updateResult = await ProjectModel.updateOne({_id : projectID}, {$set : {image}})
            if(updateResult.modifiedCount == 0) throw {status : 400, message : "Update failed"}
            return res.status(200).json({
                status : 200,
                success : true,
                message : "Update successfully"
            })
        } catch (error) {
            next(error)
        }
    }
    getAllProjectOfTeam() {
        
    }
    getProjectOfUser() {
        
    }
}

module.exports = {
    ProjectController: new ProjectController()
};