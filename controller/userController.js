import User from "../model/userModel.js";

// create
export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    const { email } = userData;
    const userExist = await User.findOne({ email });
    if (userExist) {
      return res.status(400).json({ message: "already exist" });
    }
    const saveUser = await userData.save();
    res.status(200).json(saveUser);
  } catch (error) {
    res.status(500).json({ error: "연결 안됨" });
  }
};
// get
export const read = async (req, res) => {
  try {
    const users = await User.find();
    if (users.length === 0) {
      return res.status(404).json({ message: "Not Found" });
    }
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: "서버 에러" });
  }
};

export const update = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Not found" });
    }
    const updateUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.status(200).json(updateUser);
  } catch (error) {
    res.status(500).json({ error: "서버 에러" });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userExist = await User.findOne({ _id: id });
    if (!userExist) {
      return res.status(404).json({ message: "Not Found" });
    }
    await User.findByIdAndDelete(id);
    res.status(200).json({ message: "삭제" });
  } catch (error) {
    res.status(500).json({ error: "서버 에러" });
  }
};
