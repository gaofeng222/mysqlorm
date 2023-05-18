const { Sequelize, DataTypes, json } = require('sequelize');

const sequelize = new Sequelize('test', 'root', '123456', {
    host: 'localhost',
    dialect: 'mysql'
});
connect()
async function connect() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

const User = sequelize.define('User', {
    name: DataTypes.TEXT,
    favoriteColor: {
        type: DataTypes.TEXT,
        defaultValue: 'green'
    },
    age: DataTypes.INTEGER,
    cash: DataTypes.INTEGER
}, {
    sequelize,
    modelName: 'User' // 我们需要选择模型名称
})
console.log(User === sequelize.models.User); // true

(async () => {
    await User.sync({ force: true })
    console.log("用户模型表刚刚(重新)创建！");
    // const jane = User.build({ firstName: "Jane" });
    // await jane.save()

    const jane = await User.create({ name: 'jack' })
    jane.favoriteColor = "blue"
    // jane.set({
    //     name: "Ada",
    //     favoriteColor: "blue"
    // });
    // await User.drop()
    await jane.update({ name: "Ada" })
    console.log(jane);
    // await jane.save()
})()

