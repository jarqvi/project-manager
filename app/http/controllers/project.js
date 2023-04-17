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
            myProjects[0].image = req.protocol + '://' + req.get('host') + (myProjects[0].image).replace(/\\/g, '/').replace('public', '');
            return res.status(200).json({
                status: 200,
                success: true,
                myProjects
            });
        } catch (error) {
            next(error);
        }
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