const sequelize = require("../config/connection");
const {User,ServicePost} = require("../models");

const userData = require('./userData.json');
const servicePostData = require('./servicePostData.json');

const seed = async ()=>{
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

for (const post of servicePostData) {
    await ServicePost.create({
    ...post,
    user_id: users[Math.floor(Math.random() * users.length)].id,
    });
}
process.exit(0);
};

seed();