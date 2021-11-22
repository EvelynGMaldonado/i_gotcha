const User = require('./User');
const ServicePost = require('./ServicePost');

ServicePost.belongsTo(User, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
module.exports = { User, ServicePost };
