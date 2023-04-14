const { ProjectModel } = require("../../models/project");

class ProjectController{
    async createProject(req, res, next) {
        try {
            const { title, text } = req.body;
            const owner = req.user._id;
            const result = await ProjectModel.create({title, text, owner});
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
    getAllProject() {

    }
    getAllProjectById() {
        
    }
    getAllProjectOfTeam() {
        
    }
    getProjectOfUser() {
        
    }
    updateProject() {
        
    }
    removeProject() {
        
    }
}

module.exports = {
    ProjectController: new ProjectController()
};