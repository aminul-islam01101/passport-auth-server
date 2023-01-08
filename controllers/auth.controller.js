const register = async (req, res) => {
    res.send('register route');
};
const login = async () => {
    console.log('login');
};
module.exports = {
    register,
    login,
};
