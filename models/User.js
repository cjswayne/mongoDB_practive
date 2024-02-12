const { model, Schema } = require('mongoose');
const { hash, bcrypt } = require('bcrypt');


const userSchema = new Schema(
    {
        email:{
            type: String,
            // 
            required:[true, 'You must enter a password, you entered {VALUE}'],
            unique: true, // CAVEAT must be either new or unique if unique is true
            validate:{
                validator(val){
                    return /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/ig.test(val)
                }
            }
        },
        password:{
            type: String,
            required: [true,'You must enter a password'],
            minLength:[6, 'Your Password must be at least 6 characters in length'],
            select:false
        }
    }, 

);


userSchema.pre('save', async function(next){ // if u don't call next it doesn't save
    if(this.isNew){
        this.password = await hash(this.password, 10);
    }

    next();
})

userSchema.methods.validatePass = async function(formPassword) {
    const is_valid = await compare(formPassword, this.password);

    return is_valid
}

userSchema.set('toJSON', {
    transform: (_, user) => {
      delete user.password;
      delete user.__v;
      return user;
    },
  });

const User = model('User', userSchema);

module.exports = User;