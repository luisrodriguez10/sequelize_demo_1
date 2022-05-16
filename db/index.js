const Sequelize = require("sequelize");
const { STRING, TEXT } = Sequelize;
const db = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_users_db"
);

const User = db.define("User", {
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  bio: {
    type: TEXT,
  },
});

User.beforeSave((user) => {
  if (!user.bio) {
    user.bio = `${user.email} BIO is went to travel around the world!!!`;
  }
});

const syncAndSeed = async () => {
  await db.sync({ force: true });
  await User.create({ email: "moe@gmail.com", bio: "This is the bio for Moe" });
  await User.create({
    email: "lucy@yahoo.com"
  });
  await User.create({
    email: "ethyl@aol.com"
  });
};


module.exports = {
    db,
    syncAndSeed,
    models:{
        User
    }
}