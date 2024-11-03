import user from '../model/Studentschema.js';  // Added .js extension

export const create = async (req, res) => {
    try {
        const userData = new user(req.body);
        const {email} = userData;

        const userExit = await user.findOne({email})
        if (userExit) {
            return res.status(400).json({message: 'User already exists.'});
        }
        const savedUser = await userData.save();
        res.status(200).json(savedUser);
    } catch (error) {
        res.status(500).json({error: 'Internal Server error'})
    }
}

export const fetch = async (req, res) => {
    try {
        const users = await UserActivation.find();
        if(users.length ===0 ) {
            return res.status(404).json({message: 'User Not Found.'})
        }
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({error: 'Internal Server error'})
    }
}

export const update = async(req, res) => {
    try {
        const id = req.params.id;
        const userExit = await user.findOne({_id:id})
        if(!userExit) {
            return res.status(404).json({message: "User Not Find"})
        }
        const updateUser = await user.findByIdAndUpdate(id, req.body, {new:true})
        res.status(201).json(updateUser);
    }
    catch(error) {
        res.status(500).json({error: 'Internal Server error'})
    }
}

export const deleteUser = async(req, res) => {
    try {
        const id = req.params.id;
        const userExit = await user.findById({_id:id})
        if(!userExit) {
            return res.status(404).json({message: "User Not Find"})
        }
        await user.findByIdAndDelete(id);
        res.status(201).json({message: 'User deleted successfully.'});
    }
    catch(error) {
        res.status(500).json({error: 'Internal Server error'})
    }
}